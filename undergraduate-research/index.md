# Undergraduate Research in Working Memory



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

#### Target

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



## Method

- EEG data was collected from 16 participants.
- The data was preprocessed by EEGLAB. ([Details]([https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory%20Working%20Memory/Processing](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory Working Memory/Processing)))
- Preliminary behavioral, ERP and time-frequency analysis was done by MATLAB ([Detais]([https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory%20Working%20Memory/Analysis](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory Working Memory/Analysis))):

  - Accuracy

    <img src = 'accuracy.png' style = "zoom:40%" />

  - Reaction time:

    <img src = 'reaction time.png' style = "zoom:40%" />

  - ERP:

    <img src = 'CzERP.png' style = "zoom:40%" />

  - time-frequency analysis:

    <img src = 'O1.png' style = "zoom:40%" />

