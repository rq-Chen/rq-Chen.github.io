<div>
    <center>
    	<span style = "float: left">
    		<a href = "https://rq-chen.github.io/microstate-research/index.html">Before: Microstate research</a>
    	</span>
        <a href = "https://rq-chen.github.io/index.html">Homepage</a>
    	<span style = "float: right">
    		<a href = "https://rq-chen.github.io/index.html">Next: None</a>
    	</span>
    </center>
</div>

---

# Undergraduate Research in Working Memory



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



---

<div>
    <center>
    	<span style = "float: left">
    		<a href = "https://rq-chen.github.io/microstate-research/index.html">Before: Microstate research</a>
    	</span>
        <a href = "https://rq-chen.github.io/index.html">Homepage</a>
    	<span style = "float: right">
    		<a href = "https://rq-chen.github.io/index.html">Next: None</a>
    	</span>
    </center>
</div>