%% Task2A.m - Just play a music
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
    exit();
end
PsychDefaultSetup(2);
Screen('Preference', 'SkipSyncTests', 1);
screens = Screen('Screens');
screenID = max(screens);
InitializePsychSound;

% Color
BLACK = BlackIndex(screenID);
WHITE = WhiteIndex(screenID);
GREY = (BLACK + WHITE) / 2;

% Sound
FILENAME = '1.wav';
[mySound, dummy] = audioread(FILENAME);
mySound = mySound';
pahandle = PsychPortAudio('Open');
PsychPortAudio('FillBuffer', pahandle, mySound);

% Window
[win, dect] = PsychImaging('Openwindow', screenID, GREY);
Screen('TextSize', win, 36);

% Welcome
prompt1 = 'Please close your eyes and press any key to begin.';
DrawFormattedText(win, prompt1, 'center', 'center');
Screen('Flip', win);
KbStrokeWait;

% Listen
DrawFormattedText(win, 'Please listen', 'center', 'center');
Screen('Flip', win);
PsychPortAudio('Start', pahandle);
try  % send trigger
    trig.OutputEventData(1);
catch
    sca;
    input('TriggerBox failed. Please press Ctrl+C.');
    exit;
end
WaitSecs(570);
PsychPortAudio('Close', pahandle);
sca;