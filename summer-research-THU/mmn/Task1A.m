%% Task1A.m - Oddball paradigm
%
% Ruiqi Chen, 18 July, 2019
% Compatible with Neuracle. Please put the Neuracle TriggerBox.m function
% under the same folder.

% Setup
sca; close all; clear;
try  % TriggerBox setup
    trig = TriggerBox();
catch
    input('TriggerBox failed. Please press Ctrl+C.');
    return;
end
PsychDefaultSetup(2);
screens = Screen('Screens');
screenID = max(screens);

% Color
BLACK = BlackIndex(screenID);
WHITE = WhiteIndex(screenID);
GREY = (BLACK + WHITE) / 2;

% Window
[win, dect] = PsychImaging('Openwindow', screenID, GREY);
Screen('TextSize', win, 36);

% Stimuli and indicators
InitializePsychSound;
pahandle = PsychPortAudio('Open');
beepOrd = zeros(2, 2225);
beepDev = beepOrd;
LongBeep = zeros(2,22254);
ShortBeep = zeros(2, 2225); 
for i = 1:2
    beepOrd(i,:) = MakeBeep(500, 0.1);
    beepDev(i, :) = MakeBeep(900, 0.1);
    LongBeep(i, :) = MakeBeep(700, 1);
    ShortBeep(i, :) = MakeBeep(700, 0.1);
end
% Signal
ORDINARY = 1;
DEVIANT = 2;

% Welcome
prompt1 = ['A long beep indicates the beginning and end of a trial.\n', ...
    'After every four trials, twelve short beeps indicates the end of a block.\n', ...
    'Please close your eyes and press any key to begin.'];
prompt2 = ['End of a block.\n', ...
    'Press space to continue, esc to exit.'];
DrawFormattedText(win, prompt1, 'center', 'center');
Screen('Flip', win);
KbStrokeWait;

for i = 1:10  % the number of blocks
    for j = 1:4  % 4 trials (80 stimuli) in a block
        
        % Beginning
        DrawFormattedText(win, '+', 'center', 'center');
        Screen('Flip', win);
        PsychPortAudio('FillBuffer', pahandle, LongBeep);
        PsychPortAudio('Start', pahandle);
        WaitSecs(1);

        DrawFormattedText(win, 'Please listen.', 'center', 'center');
        Screen('Flip', win);

        WaitSecs(0.7);

        % Stimuli
        for j = 1 : 20
            rn = rand();
            if rn > 0.85
                PsychPortAudio('FillBuffer', pahandle, beepDev);
                try  % send trigger
                    trig.OutputEventData(DEVIANT);
                catch
                    sca;
                    input('TriggerBox failed. Please press Ctrl+C.');
                    exit;
                end
                PsychPortAudio('Start', pahandle);
            else
                PsychPortAudio('FillBuffer', pahandle, beepOrd);
                try
                    trig.OutputEventData(ORDINARY);
                catch
                    sca;
                    input('TriggerBox failed. Please press Ctrl+C.');
                    return;
                end
                PsychPortAudio('Start', pahandle);
            end
            WaitSecs(0.7);
        end

        % End of trial
        DrawFormattedText(win, '+', 'center', 'center');
        Screen('Flip', win);
        PsychPortAudio('FillBuffer', pahandle, LongBeep);
        PsychPortAudio('Start', pahandle);
        WaitSecs(3);
    end

    % End of block
    DrawFormattedText(win, prompt2, 'center', 'center');
    Screen('Flip', win);
    for j = 1:12
        PsychPortAudio('FillBuffer', pahandle, ShortBeep);
        PsychPortAudio('Start', pahandle);
        WaitSecs(0.1);
    end
    [dummy1, keyCode, dummy2] = KbStrokeWait();
    if find(keyCode) == KbName('ESCAPE')
        break;
    end
end

DrawFormattedText(win, 'the End', 'center', 'center');
Screen('Flip', win);
WaitSecs(1);
sca;