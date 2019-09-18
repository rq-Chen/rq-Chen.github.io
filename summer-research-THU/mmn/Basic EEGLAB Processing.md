# Basic EEGLAB Processing Pipeline



## Loading Data

File > Import Data > ...plugins > BDF...

Then load event data through matlab variable: File > Import Event Data > ...Matlab...



## Select Channels

- Only Channel Label Provided (e.g. if imported from Neuroscan of Biosemi):

  Choose ***the second option*** in the list (MNI coordinate), then click OK.

- Channel location file provided:

  (Click cancel if the dialog appear) click Read locations > OK > OK.

After this process, view the locations using Plot > Channel locations > by name.

***Caution: Make sure you choose the MNI coordinate if you want better souce localization.***



## Re-reference

It is somewhat tricky to choose the location of the reference electrode, see Chapter 5 of Luck's book, or https://sccn.ucsd.edu/wiki/I.4:_Preprocessing_Tools for further reading.

***Be clear whether you need to add or remove the original reference electrode to / from the data after re-referencing.***



## Filter

Notch out the line noise: Tools > filter the data > basic... > 49 51 > check "Notch ..." > OK > save as new file

Basic filtering:

- Low Pass: Luck's suggestion is 0.1 Hz, but EEGLAB and Neuracle's suggestion is 1Hz.
- Then high Pass: Luck suggests 30Hz and Neuracle suggests 40Hz.

***Caution: Always do this seperately to avoid breakdown brought by using low-pass and high-pass filter simultaneously.***



## Artifact Removal or Correction

- ICA:

  Generally speaking, if we downsample to 200Hz, the process will finish in a moderate time (several minutes, for a data of several minutes length). But if you want to find N components for N channel data, generally you need at least 30N^2 sample points for each channel.



## Epoching and Baseline Removal



