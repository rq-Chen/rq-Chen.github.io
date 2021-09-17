# Some Important Points about MATLAB, Psychtoolbox and EEGLAB

## MATLAB

- `'` is **complex conjugate transpose**! Make sure you use it correctly on complex matrices.
- `subplot()` can actually create subplots with different size, e.g. try `subplot(2, 3, [2 6])`
- Outputs of `meshgird()` and `ndgrid()` are in different order:
  - `ndgrid()` follows the indexing order of MATLAB (first dimension first), while `meshgrid()` is in Y-then-X-then-Z order (more suitable for 2D grid)

## PTB

- `WaitSecs` or `KbWait` or so will stop the script, but as for the time it wakes up:
  - `WaitSecs(Lag)` **waits for this long** before waking up
  - `WaitSecs('UntilTime', dTime)` or `KbWait([], 0, dTime)` **waits until the system time (acquired by `GetSecs`) reaches dTime** before waking up
- `KbWait` waits for a **press** (no release required) while `KbStrokeWait` waits for a **stroke** (returning after the key is released).
  - Most fundamentally, these functions consist of `KbCheck` (whose equivalent is `GetClicks` for mouse) and `WaitSecs(0.005)` in a loop.
  - Unfortunately, it seems that there is no equivalent for `KbWait` for mouse
- The return value of `PsychPortAudio('Start', pahandle)` is **zero** instead of the system time; `PsychPortAudio(‘Start’, pahandle, 1, 0, 1)` will return after the audio has really been **broadcast**, and return value will be the estimation of the audio device latency.
- `PsychPortAudio` uses the default sampling rate of your audio devices, which may be very probably **different** with the obsolete `MakeBeep` function (22254 Hz). Therefore, it is better to specify a sampling rate for both of them:
  - Use `pahandle = PsychPortAudio('Open',[],[],[], SAMPRATE)` in the beginning.
  - Use `myBeep = MakeBeep(freq, len, SAMPRATE)` everytime.
  - For this laptop, `SAMPRATE = 48000` is feasible.

- How to show the PTB window only on the displaying screen: “屏幕分辨率”-把“多显示器”栏由“复制这些显示”改成“扩展这些显示”-在上面选中本机的屏幕（一般是2）-应用



## EEGLAB

- the important function of `binica.m` is originally inperfect in these ways:
  - It **contains a bug** in line 320 that when executing system command `!ICABINARY<pwd/scriptfile`, it assumes that `ICABINARY` and `pwd` contain no space character, which is very likely wrong. Adding several double quotes will solve the problem of `ICABINARY`, but since `binica.exe` is also buggy and uses some other paths as parameters, the only way is to **change the name of your working folder so that its path contains no space!!!**
  - Other bugs in `binica.m` are relevant to system calls in windows that are different with LINUX, namely `ls` (for windows the alternative is `dir`) in line 303/349/351 and `rm` (for windows should be `del`) in line 366. However, the script contains other bugs with respect to the variables `scriptfile` `weightsfile` `spherefile` and `datafile`, where the paths are seperated by '/' (instead of '\\\\') and leads to erroneous parameter parsing on Windows. Fortunately, these commands are not so crucial and we can simply **comment the lines 303/349/351/366** (and remove binicaNUM.xx manually afterwards).
  - The original `binica.m` can be fetched from [bininca.m](https://github.com/sccn/eeglab/blob/develop/functions/sigprocfunc/binica.m).

- the other important function of `std_precomp.m` is also buggy, which will lead to computing the same data for up to dozens of times ( = number of sessions for each subject) and wasting hundreds of GBs of disk space and hours of time.
  - We need to copy line 275-277 to replace line 360 and line 413 to fix it.

- the `std_readdate.m` script seems to be buggy too and it's hard to fix. Therefore, **DO NOT USE EEGLAB STUDY STRUCTURE TO PERFORM TIME-FREQUENCY ANALYSIS** (but it can be used to compute the statistics, if `std_precomp.m` is modified as described above. Simply rename the output files (.daterp, .dattimef, etc.) to .mat and use matlab to process them.

- the `eval(str)` function is of great use! For example, if you want to refer to a series of variables:

```matlab
var1 = 1; var2 = 2; var3 = 3; var4 = 4;
% now we want to change them into an 4*1 array allvars
allvars = zeros(1, 4);
for i = 1:4
	currvarname = ['var' num2str(i)];
	eval(['allvars(i) = ' currvarname]);
end
```

- the function `[EEG, indelec] = pop_rejchan(EEG)` will **directly remove and reorder** the marked channels! So if you want to interpolate the rejected channels, save the original `EEG.chanlocs` and use the command `EEG = pop_interp(EEG, oldChanlocs, 'spherical')` to interpolate them. 