<div>
    <center>
    	<span style = "float: left">
    		<a href = "https://rq-chen.github.io/microstate-research/index.html">Before: Microstate research</a>
    	</span>
        <a href = "https://rq-chen.github.io/index.html">Homepage</a>
    	<span style = "float: right">
    		<a href = "https://rq-chen.github.io/traveling-wave/index.html">Next: Traveling wave project</a>
    	</span>
    </center>
</div>

---

# Undergraduate Research in Working Memory

**Update: **I am now working with PhD candidate Ying Fan on an auditory working memory experiment. I simulated a recurrent neural network to explore how frequency and position of stimuli are represented in the network, dependent on the experiment setting. Here are some basic results (details available upon request):

**Experiment and Network Design:**

<img src = "RNN/IO.png" style = "zoom:50%" />

During each trial, participants will hear a sequence of three tones and see a cue, then compare the cued item with a target after a white noise impulse. We manipulated the difficulty of the task and explored the difference in feature representation in the network.

The artificial neural network contains only one LSTM layer and one output layer. The 24-dimensional input is encoded in a (pseudo-) continous attractor for frequency with 20 neurons and 4 extra neurons for visual cue. The input is processed by the LSTM layer and transformed into another 24-dimensional output, then sent to the only one output neuron.

**Training: **

<img src = "RNN/Training.png" style = "zoom:60%"/>

Due to RNN's extremely powerful memory, we have to make sure it "understands" the experiment rather than memorizes each trial. This figure demonstrates that our model successfully utilized cue information and achieved high accuracy.

**Encoding:**

<img src = "RNN/FreqPosCorr1.png" style = "zoom:50%"/>

We performed traditional Representational Similarity Analysis (RSA) on the "neural activity" of the network. Here we show the results from 8 neurons, data categorized by (frequency, position) pairs (6 * 3 = 18 groups).

<img src = "RNN/TuningCurve1.png" style = "zoom:50%"/>

We plotted the tuning curves of each neuron. It's clear that some neurons only encode frequency (e.g. the bottom-left one) but some encode frequency and position jointly.

<img src = "RNN/EncodingTend.png" style = "zoom:50%"/>

We explored the proportion of variance explained by frequency or position for each neuron. We can see that most neurons mainly encode frequency, but some encode both.

**Stimulation:**

<img src = "RNN/Cue1.png" style = "zoom:50%"/>

We also explored how the network reacted after cue and noise impulse. We see that after the cue, the network still represent frequency and position jointly.

<img src = "RNN/Noise1.png" style = "zoom:50%"/>

However, after the noise impulse, the information for position is no longer presevered.

**Influence of task difficulty:**

We also explored the influence of task difficulty on the way how network represented information. Generally speaking, we found that the more difficult the task, the more integrated the representation of frequency and position. (Results available upon request.)



## Introduction

I have been researching in the neural basis of sequential working memory in the Lab of [Prof. Luo, Huan](http://psy.pku.edu.cn/english/people/faculty/professor/huanluo/index.htm) for nearly a year. I reviewed the literature, selected the research topic, designed the experiment, collected the data and analyzed the result on my own. This experience enabled me to carry out a research project independently and equipped me with many useful tools including experiment presentation, ERP and time-frequency analysis with Psychtoolbox, EEGLAB and Fieldtrip. More details about my project is available [here](https://github.com/rq-Chen/Undergraduate_Research_at_PKU).

## Background

***Selective Entrainment of Theta Oscillations in the Dorsal Stream Causally Enhances Auditory Working Memory Performance***

- *Neuron*, 2017
- DMS (delay matching to sample), melodic, manipulation (reversed order)
- mental manipulation ability, MEG/EEG with rhythmic-TMS
- **Main result: the 5Hz theta oscillation in the Auditory dorsal pathway is causually and positively correlated with the mental manipulation ability (reversing the order).**

![](.\expIllu.jpg)



## Experiment

### Intuition

Although this paper regarded backward replaying as a kind of mental manipulation, this manipulation is apparently special since it has something to do with the temporal organization of the memory contents. Besides, theta oscillation is often associated with temporal organization in the literature. Therefore, probably this result only reflects the neural mechanism for temporal organization instead of mental manipulation. So we want to design another kind of mental manipulation to examine whether this condition triggers different oscillatory pattern with the original ones.

### Target

- To explore whether this theta oscillation is specifically correlated with the organization of temporal information
- To explore the neural mechanism underlying different kinds of mental manipulation for auditory working memory

### Design

The pipeline is similar to the original one, but we incorporate two more kinds of mental manipulation in the delay period:

<img src = "newExpIllu.jpg" style = "zoom:90%"/>

- **Transposition**

  During the delay period, the participants should raise S1 (the sequence they hear) by an octave in their mind. During the reaction period, the participants should compare S2 with the sequence in their mind (the manipulated one).

  <img src = "transposition.jpg" style = "zoom:40%"/>

- **Contour**

  During the delay period, participants should categorize S1 acoording to the contour of the melody: “rise-rise” / “rise-fall” / “fall-rise” / “fall-fall”. During the reaction period, they should categorize S2 likewise and compare their categories.

  <img src = "contour.jpg" style = "zoom:40%"/>



## Preliminary Result (Ongoing)

### Behavioral

**Reaction time:**

<img src = 'RT.png' style = "zoom:40%" />

**Accuracy:**

<img src = "Accuracy.png" style = "zoom:40%" />

### Event-related potential

Cluster-level permutation-based ANOVA over four conditions for delay period ERP amplitude:

<img src = 'Bin_F_TP.png' style = "zoom:40%" />

This result was consistent with the reference paper that the left centroparietal channels' ERPs were significantly modulated by task conditions. For comparison see [Figure 2](https://els-jbs-prod-cdn.literatumonline.com/cms/attachment/880b178a-385c-4d53-9ff8-598c72ebbc45/gr2.jpg) in the aforementioned paper.

### Time-frequency analysis

**Average oscillatory power in the delay period:**

<img src = "TP_Power.png" style = "zoom:40%" />

Here the power was z-scored against the baseline between -1~0s before the onset of S1. We can see that the four condition generally follows the same activation pattern: mild decrease in global beta power, strong increase in occipital alpha power and no significant change in global theta power. (This will be tested by averaging all data and perform a cluster level t-test later.) Besides, as we predicted, only the REVERSED condition which requires the temporal reorganization of memory contents triggered an increase of theta power. Therefore, we computed the difference between every manipulated condition and the SIMPLE condition and we are currently working on it.

**Difference in oscillatory power:**

<img src = "TP_Power_Diff.png" style = "zoom:40%" />

**Time courses of the oscillatory power:**

<img src = "TF.png" style = "zoom:40%" />

The last two figures are posted just for illustration of our analysis method and we will update the result soon.

### Decoding Analysis

We try to investigate the time course of mental manipulation as well as their neural mechanism through decoding. Since there are 108 kinds of stimuli in our experiment, it's hard to decode them directly. Therefore, we categorized them using their contour and built an LSTM network to classify the binned EEG signal. We trained the network with a short clip of data and tested it over the whole retention period:

| Trained at the beginning | Trained in the middle     | Trained at the end     |
| ------------------------ | ------------------------- | ---------------------- |
| ![](accContourBegin.png) | ![](accContourMiddle.png) | ![](accContourEnd.png) |

We can see that the representation is relatively stable, so the decoder can generalize across a wide range of time. Below is the confusion matrix for the first decoder:

<img src = 'tgRDM.gif' style = 'zoom:40%' />

## Method

- EEG data was collected from 16 participants.
- The data was preprocessed in EEGLAB. ([Details](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory%20Working%20Memory/Processing))
- Preliminary behavioral, ERP, time-frequency and decoding analysis was done by Fieldtrip ([Detais](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory%20Working%20Memory/Analysis)):


