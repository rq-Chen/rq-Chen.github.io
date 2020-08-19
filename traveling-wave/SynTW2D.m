%% SynTW2D - Create a TW dataset
%
% Ruiqi Chen, 07/18/2020
%
% This script simulates an EEG dataset with 2D (spherical) cortical waves
% with different sources.
%
% The synthetic channels are organized into an n*n matrix and the waves
% radiate from one of k randomly selected channels.
%
% For each data segments (e.g. 2 seconds):
%
% First, randomly select a channel (say Cz) and a phase spectrum. Use iFFT
% to reconstruct the signal (with a "reference" EEG power spectrum).
% 
% (Note that the "reference" spectrum should be interpolated according to 
% the Fourier frequencies of the synthetic data (particularly if they have 
% different sampling rate), so that we can filter or transform the data by 
% simply manipulating the Fourier coefficients without introducing any 
% digital-sampling-related artifacts.)
%
% Then for each frequency band (delta, theta, alpha, beta):
%   - "perfectly" filter the signal of Cz (by zero-out Fourier coefficients)
%     and compute the analytic representation
%   - compute the envelope and instantaneous phase
%   - add a phase lag to all other channels, which is in proportion to the 
%     central frequency (i.e. a "constant" time lag) and the distance
%     between two channels (e.g. CPz -5 deg, Pz -10 deg)
%   - Disturb the phase by adding a small random phase lag to every channel
%     (following a Wiener process)
%   - compute the new band-passed signal for these channels
% 
% Then add up these new band-passed signals, and add pink noise to every
% channel. 
%
% Finally, smooth the intersections between segments if necessary.
%
% Reference: the time lag constant is defined as 7ms per adjacent channel
% according to (Muller et. al., 2018, nrn) that the speed of TW is about
% 5m/s (the distance between channels is calculated according to the
% Biosemi 64 channel system).
%

clear;clc;close all;


%% Parameters

% "Reference" data
REFSET = 'ref/data.mat';
REFCHN = 'ref/chanlocs.mat';
REFSAM = 128;  % Sample rate (Hz)

% Synthetic data
ASIZE = 9;  % Square size
SAMP = 100;  % Sample rate (Hz)
TLEN = 60;  % Length (second)
TSEG = 2;  % Length of each segment, note that TSEG*SAMP should be integer
PSMOOTH = 0.05;  % Smooth this proportion of data at the beginning of each segment
MAXVOL = 30;  % Maximum voltage value (uV)

% Travelling waves
KCHN = 2;  % Number of different sources
FIXCHN = 'no';  % Whether to use a single source for each band
BANDS = [1 4; 4 8; 8 12; 12 25];  % [HPFREQ LPFREQ] in each line
TWTLAG = 7e-3;  % "Time lag" between 4-neighbour channels (in seconds)
PLCVAR = 0.05;  % std of the Brownian random phase-lag / constant phase lag

% Save data & Visualization
SVFILE = 'svdat.mat';  % File to save the synthetic data
SVPATH = 'simulation/';  % Folder to save the figures
CMPFILE = 'cmpDat.png';  % Compare synthetic data with the reference one
% Illustrate data between [PAHEAD + 1, PAHEAD + PLEN] (indices);
PAHEAD = 600;
PLEN = 300; 
PLFILE = 'cmpPhaseLag.png';  % Compare TW-channels with Cz
VOLFILE = 'Voltage.gif';  % Show voltage distribution
PHFILE = 'Phase.gif';  % Show phase distribution
FPS = 15;  % Fresh rate for gif


%% Preparation

% Get the "reference" data and channel montage
load(REFSET, 'allEEG');
load(REFCHN, 'chanlocs');

% Select Cz
tmpInd = strcmp({chanlocs.labels}, 'Cz');
refDat = allEEG{randi(size(allEEG, 1)), 1}(tmpInd, :);

% Get the "reference" power spectrum
[refP, refF] = periodogram(refDat, [], [], REFSAM);
refP = exp(smoothdata(log(refP)));
% refP = downsample(refP, 10);
% refF = downsample(refF, 10);

% Compute the Fourier frequencies of the synthetic data
newF = 0:1/TSEG:(SAMP - 1/TSEG);
newF = newF(newF < SAMP / 2)';

% Sample the power spectrum
newP = exp(interp1(refF, log(refP), newF));
newA = sqrt(newP);  % The amplitude (omitting a constant)

% Some constants
nChn = ASIZE * ASIZE;
nFreq = length(newP);
nBand = size(BANDS, 1);
deltaT = 1 / SAMP;
nPSeg = SAMP * TSEG;  % Number of samples in each segment
latency = 0 : deltaT : (TSEG - deltaT);  % latency in each segment
if nPSeg ~= floor(nPSeg)
    error('SAMP * TSEG is not integer')
end

% Select sources (on different lines and columns)
tmpX = randperm(ASIZE)';
tmpY = randperm(ASIZE)';
if nChn < ASIZE
    error('Number of sources should be smaller than the size of the array!');
end
cInds = [tmpX(1:KCHN) tmpY(1:KCHN)];


%% Simulate Cz

Cz = zeros(nBand, SAMP * TLEN);
anasig = complex(Cz);  % Analytic representation for Cz (in each band)

for i = 1:floor(TLEN / TSEG)
    
    tmpInd = 1 + (i - 1) * nPSeg : i * nPSeg;  % indices of the data
    
    initPhases = 2 * pi * rand(length(newP), 1);
    allPhases = initPhases + 2 * pi * newF * latency;
    
    for j = 1:nBand
        tInd = and(newF >= BANDS(j, 1), newF < BANDS(j, 2)); % "Filtering"
        Cz(j, tmpInd) = newA(tInd)' * cos(allPhases(tInd, :));
        anasig(j, tmpInd) = hilbert(Cz(j, tmpInd));
        % Note that matlab hilbert() computes analytic representation rather than
        % hilbert transform.
    end
    
end
envl = abs(anasig);  % envelope
iPhases = angle(anasig);  % instant phases


%% Simulate other channels

synDat = zeros(ASIZE, ASIZE, nBand, TLEN * SAMP);
for i = 1:floor(TLEN / TSEG)
    
    tmpInd = 1 + (i - 1) * nPSeg : i * nPSeg;  % indices of the data
    
    for j = 1:size(BANDS, 1)  % Select frequency band
        
        % Select a source
        selInd = randi(KCHN);
        if strcmp(FIXCHN, 'yes') || i == 1 + floor(PAHEAD / nPSeg)  % just for visualization
            selInd = min(j, KCHN);
        end
        ci = cInds(selInd, 1);
        cj = cInds(selInd, 2);
        synDat(ci, cj, j, tmpInd) = Cz(j, tmpInd);
        
        % Add phase lag
        pLag = zeros(ASIZE*ASIZE, nPSeg);
        for k = 1:ASIZE*ASIZE
            ki = 1 + floor((k - 1) / ASIZE);
            kj = 1 + mod(k - 1, ASIZE);
            % Phase lag = c * distance * 2pi * center frequency
            pLag(k, :) = TWTLAG * sqrt((ci - ki)^2 + (cj - kj)^2) *...
                2 * pi * mean(BANDS(j,:)); 
        end        
        
        % Compute the random phase lag
        bmSigma = (PLCVAR * diag(pLag(:, 1))) ^ 2;
        bmobj = bm(zeros(ASIZE*ASIZE, 1), bmSigma, 'StartState', ...
            PLCVAR * pLag(:, 1) .* randn(ASIZE*ASIZE, 1));
        pLag = pLag + simulate(bmobj, nPSeg-1)';
        
        for k = 1:ASIZE*ASIZE
            ki = 1 + floor((k - 1) / ASIZE);
            kj = 1 + mod(k - 1, ASIZE);
            synDat(ki, kj, j, tmpInd) = envl(j, tmpInd) .* ...
                cos(iPhases(j, tmpInd) - pLag(k, :));
        end
        
    end
    
end


% Scale the signal
oldSynDat = synDat;  % useful for visualization
synDat = squeeze(sum(synDat, 3));
synDat = synDat - mean(synDat, 3);
synDat = synDat * (MAXVOL / max(synDat, [], 'all'));


% Smooth the intersections

for i = 2:floor(TLEN / TSEG)
    tmpInd = 1 + (i - 1) * nPSeg;
    for j = 1:ASIZE
        for k = 1:ASIZE
            synDat(j, k, round(tmpInd - PSMOOTH * nPSeg) : round(tmpInd + PSMOOTH * nPSeg)) = ...
                smoothdata(synDat(j, k, round(tmpInd - PSMOOTH * nPSeg) : round(tmpInd + PSMOOTH * nPSeg)));    
        end
    end
end

% Save data
save(SVFILE, 'synDat', 'SAMP');



%% Compare the reference and synthetic data

if isempty(dir(SVPATH))
    mkdir(SVPATH);
end

fig = figure;
fig.WindowState = 'maximized';

subplot(2, 2, 1);
plot(0:(1/REFSAM):5, refDat(1:5*REFSAM + 1), 'Color', [0.8500 0.3250 0.0980]);
title('Reference Data');
xlim([0 5]); ylim([-MAXVOL MAXVOL]);
ylabel('Voltage (uV)');

subplot(2, 2, 2);
plot(refF, 10*log10(refP), 'Color', [0.8500 0.3250 0.0980]);
title('Reference power spectrum');
xlim([0 40]); ylim([-30 10]);

subplot(2, 2, 3);
plot(0:deltaT:5, squeeze(synDat(1, 1, 1:5*SAMP+1)));
title('Synthetic Data');
xlim([0 5]); ylim([-MAXVOL MAXVOL]);
xlabel('Latency (s)'); ylabel('Voltage (uV)');

subplot(2, 2, 4);
[tmpP, tmpf] = periodogram(squeeze(synDat(1, 1, :)), [], [], SAMP);
plot(tmpf, 10*smoothdata(log10(tmpP)));
title('Synthetic power spectrum');
xlim([0 40]); ylim([-30 10]);

sgtitle('Comparison between Reference and Synthetic data');
saveas(gcf, [SVPATH CMPFILE]);
close(gcf);


%% Visualize the TW

nFig = min(nBand, 4);
tmpInd = PAHEAD:PAHEAD + PLEN - 1;
tmpt = deltaT * tmpInd;
fig = figure; fig.WindowState = 'maximized';
for i = 1:nFig
    subplot(2, 2, i);
    hold on;
    tmpI = min(i, KCHN);
    plot(tmpt, squeeze(oldSynDat(cInds(tmpI, 1), cInds(tmpI, 2), i, tmpInd)));
    plot(tmpt, squeeze(oldSynDat(cInds(tmpI, 1), ASIZE, i, tmpInd)));
    legend({'Cz', 'TW channel'});
    title(sprintf('Travelling wave in %.0f - %.0f Hz from %.3fs - %.3fs',...
        BANDS(i, 1), BANDS(i, 2), tmpt(1), tmpt(end)));    
end
sgtitle('Comparison between Cz and TW channels');
saveas(gcf, [SVPATH PLFILE]);
close(gcf);


%% Visualize the voltage distribution

figure;
fig = imagesc(synDat(:, :, 1), [-30 30]);
colorbar;
for i = 1:PLEN
    fig.CData = synDat(:, :, PAHEAD + i);
    title(sprintf('Voltage distribution at %.3fs', deltaT * (PAHEAD + i - 1)));
    drawnow;
    im = frame2im(getframe(gcf));
    [A,map] = rgb2ind(im,256);
    if i == 1
        imwrite(A,map,[SVPATH VOLFILE],'gif','LoopCount',Inf,'DelayTime',1/FPS);
    else
        imwrite(A,map,[SVPATH VOLFILE],'gif','WriteMode','append','DelayTime',1/FPS);
    end    
end
close(gcf);


%% Visualize the phase

visPhases = zeros(size(oldSynDat));
for i = 1:ASIZE
    for j = 1:ASIZE
        for k = 1:nBand
            visPhases(i, j, k, :) = angle(hilbert(oldSynDat(i, j, k, :)));
        end
    end
end
nFig = min(nBand, 4);

tmp = figure; tmp.WindowState = 'maximized';
colormap(hsv);  % cyclic color mapping
fig = cell(4, 1);
for i = 1:PLEN
    for j = 1:nFig
        subplot(2, 2, j);
        if i == 1
            fig{j} = imagesc(visPhases(:, :, j, PAHEAD + i), [-pi pi]);
            colorbar;
        else
            fig{j}.CData = visPhases(:, :, j, PAHEAD + i);
        end
        title(sprintf('Phase distribution for %.0f - %.0f Hz at %.3fs',...
            BANDS(j, 1), BANDS(j, 2), deltaT * (PAHEAD + i - 1)));
    end
    if i == 1
        sgtitle('Phase distribution in each band');
    end
    im = frame2im(getframe(gcf));
    [A,map] = rgb2ind(im,256);
    if i == 1
        imwrite(A,map,[SVPATH PHFILE],'gif','LoopCount',Inf,'DelayTime',1/FPS);
    else
        imwrite(A,map,[SVPATH PHFILE],'gif','WriteMode','append','DelayTime',1/FPS);
    end
    if i == 10
        saveas(gcf, [SVPATH strrep(PHFILE, '.gif', '.png')]);  % Save a snapshot
    end
end
close(tmp);

