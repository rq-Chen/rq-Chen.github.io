# Welcome to Ruiqi Chen's Homepage



Hello, I'm Ruiqi Chen, a junior student from Peking University (PKU), China. I major in Intelligence Science and Technology at the Department of Machine Intelligence, and I am most interested in cognitive science. I plan to apply for PhD programs in cognitive science in the US or Europe, now urgently seeking for relevant information. Please contact me if you could help and I would appreciate it a lot.

**You can find me at (crq)(AT)(pku)(DOT)(edu)(DOT)(com).**

**You can download my CV [here](Ruiqi_Chen_CV.pdf).**



## Highlights

- I explored the simulation and detection of cortical traveling waves during summer 2020 with the guidance of Prof. [Sven Bestmann](http://www.bestmannlab.com/). I implemented different methods on my synthetic dataset and I am now evaluating their performance under different conditions. ([Details](/traveling-wave/))
- I conducted EEG functional connectivity microstate analysis on an open dataset. I illustrated the consistency between functional-connectivity-based and voltage-distribution-based microstates and found a microstate biomarker of the activity of the Default Mode Network. ([Details](microstate-research/index.html))
- I designed an auditory working memory experiment and demonstrated the ERP amplitude modulation of left centroparietal area over different kinds of mental manipulations of the memory contents. Working on the time-frequency and decoding analysis currently. ([Details](undergraduate-research/index.html))
- I contributed to the well-known *Fieldtrip toolbox* with a [bug fix](https://github.com/fieldtrip/fieldtrip/commit/22cbd13cd314efd831314cb5cb08dbf5011b2316). I also helped fix the [bugs](https://github.com/sccn/eeglab/issues/61) in `binica.m` of *EEGLAB toolbox* before.
- I compared the performace of different word-embedding strategies and RNN decoders on the IMDb dataset ([Details](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Programming/Sentiment Classification)).
- I trained a deep residual network (*ResNet-20*) with *Keras* on *CIFAR10* and achieved high accuracy. ([Details](deep-learning-startup/index.html))
- I finished my first data visualization project with *D3.js*. ([Details](visualization-project/index.html))
- I finished a five-week long summer research about EEG functional connectivity microstates and its implications at Prof. [Hong, Bo](http://mcgovern.med.tsinghua.edu.cn/en/infoshow-1205.html)'s lab at Tsinghua University (THU), China. ([Details](summer-research-THU/index.html))
- I participated in the *2019 Tsinghua-Peking McGovern CLS CIBR Summer Program for Neuroscience and Cognitive Science* at THU in summer. ([Details](summer-school/index.html))

**Last updated:** 08/19/2020



## Research Experience

### Institute of Neurology | University College London (Remote) | 2020.7 - Present

Advisor: Prof. [Bestmann, Sven](http://www.bestmannlab.com/team)

**Project (Independent): [Simulation & Detection of Cortical Traveling Waves](/traveling-wave/)**

-  Simulated an EEG dataset with spherical traveling wave and close-to-real voltage distribution and power spectrum; now working on the simulation of intracranial signals with planar waves

-  Demonstrated that the PCA method in [(Alexander et. al., 2019)](https://doi.org/10.1371/journal.pcbi.1007316) could not reliably estimate the spatial frequency and source of the traveling wave through experimental and theoretical analysis

- Revealed that the clustering method in [(Alexander et. al., 2016)](https://doi.org/10.1371/journal.pone.0148413) might suffer from pattern misclassification and “blurring” during averaging, and consequently imprecise estimation of the spatiotemporal structure

- Proved that directly clustering the data samples provided satisfactory results and common phase removal might increase the sensitivity of the clustering algorithm

- Now implementing more methods from the literature and evaluating their performance under noise

### IDG/McGovern Institute for Brain Research \| Tsinghua University | 2019.7 - Present

Advisor: Prof. [Hong, Bo](http://mcgovern.med.tsinghua.edu.cn/en/infoshow-1205.html) (PI)

**Project (Leader): [Functional Connectivity Microstates as Biomarkers of the Mind](microstate-research/) | 2019.9 - Present**

- Discovered the hierarchical, self-similar structure of EEG functional connectivity microstates by analyzing the results with different sliding window length and different number of clusters
- Illustrated the consistency between functional-connectivity-based and voltage-distribution-based EEG microstates by their similarity in spatial topology and temporal dynamics
- Established the link between the proportion/stability/connectivity profile of a specific microstate and activity of the Default Mode Network (DMN) under different task conditions
- Explored the interaction between alpha oscillation and microstates’ internal dynamics

**[Pilot Study about EEG Microstates](summer-research-THU/index.html) | 2019.8**

- Conducted EEG microstate analysis with *MATLAB*
  - Global-field-power-based analysis with *Microstate EEGlab Toolbox*
  - Functional-connectivity-based analysis with the *Statistics and Machine Learning Toolbox*
- Consolidated a variety of data analysis technique
  - k-means clustering, multidimensional scaling, silhouette evaluation
  - Dynamic general linear model, unsupervised learning

**[EEG Oddball Experiment](summer-research-THU/index.html) | 2019.7**

- Designed an auditory oddball experiment with *Psychtoolbox*
- Performed EEG experiment on *Neuroscan* platform
- Conducted event-related potential (ERP) analysis with *EEGLAB*
  - Filtering, artifact rejection / correction, ERP plot, etc.
  - Read part of *An Introduction to the Event-Related Potential Technique* by *Steven Luck*



### IDG/McGovern Institute for Brain Research \| Peking University | 2019.3 - Present

Advisor: Prof. [Luo, Huan](http://mgv.pku.edu.cn/english/people/lbd/sopacs/220154.htm) (PI)

**Project (Independent): [The representation of time and order in working memory](undergraduate-research/index.html) | 2019.4 - Present** 

-   Designed an EEG experiment to explore the neural mechanism underlying the manipulation of contents in auditory working memory and collected data from 16 subjects ([Codes](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory%20Working%20Memory/Experiment))
-   Pre-processed the data with *EEGLAB* and analyzed the results with *Fieldtrip*
-   Learned the rationale of cluster-level permutation test and applied it to ERP analysis, result being consistent with [(Albouy et al., Neuron, 2017)](https://www.cell.com/neuron/pdf/S0896-6273(17)30198-8.pdf); helped fix a [bug](https://github.com/fieldtrip/fieldtrip/commit/22cbd13cd314efd831314cb5cb08dbf5011b2316) in *Fieldtrip* during the process
-   Working on the time-frequency analysis currently ([Codes](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Auditory%20Working%20Memory/Analysis))
-   Wrote an intensive review about the temporal organization in working memory and another for the computational models and functions of neural oscillation in working memory ([Link](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Reading))

**[Working Memory Decoding Analysis](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/EEG_Visual_Decoding) | 2019.3**

- Implemented an inverted encoding model based on the EEG data collected in a visual working memory task
- Reconstructed the tuning curve for the orientation of two Gabor stimuli
- Practiced MATLAB programming and multivariate pattern analysis (MVPA) through self-learning



## Programming Projects

**[Word Embedding Strategies & RNN Decoders for Sentiment Classification](https://github.com/rq-Chen/Undergraduate_Research_at_PKU/tree/master/Programming/Sentiment Classification) | 2020.4**

- Compared the performance of three word embedding strategies (Skip-gram, CBOW & Task-oriented) and three decoding networks (LSTM, GRU, simple RNN) on the IMDb dataset after controlling the number of parameters

- Found that LSTM generalized best while simple RNN was highly unstable; Task-oriented encoding is optimal

**[Training a Deep Neural Network on CIFAR-10](https://rq-chen.github.io/deep-learning-startup/) | 2019.12**

- Trained a *ResNet-20* model from scratch on *CIFAR-10* dataset and achieved high accuracy
- Practiced DNN implementation with *Keras* and *TensorFlow* (self-taught within one week)

**[Visualization of NSFC Funding 2018](https://rq-chen.github.io/visualization-project/) | 2019.10**

- Visualized the *National Natural Science Foundation of China* (NSFC) funding allocation and revealed the hidden disparity among different academic institutions and regions in China
- Practiced front-end programming (HTML/CSS/JavaScript/SVG/D3.js, self-taught within one week)
- Acquired visualization skill to facilitate high-dimensional big data analysis



## Activities

- I participated in the *2019 Tsinghua-Peking McGovern CLS CIBR [Summer Program](http://mcgovern.med.tsinghua.edu.cn/en/infoshow-1824.html) for Neuroscience and Cognitive Science* at THU in July 2019. ([Details](summer-school/index.html))



## Relevant Courses

- **Cognitive Neuroscience:** Neuropsychology (96/100), The Brain and Cognitive Science (92/100), Experimental Psychology (90/100), Physiological Psychology (90/100)

- **Computational Modeling:** Computational Modeling for Psychology and Neuroscience (92/100), Computational Neuroscience (89/100), Computational Perception and Scene Analysis (86/100)

- **Mathematics:** Psychological Statistics II (90/100), Probability Theory and Statistics (90/100), Introduction to Stochastic Processes (84/100), Signals and Systems (84/100), Introduction to Pattern Recognition (83/100), Set Theory and Graph Theory (81.5/100)

## Skills

- **Programming**: (Proficient) MATLAB (EEGLAB,  Fieldtrip, Psychtoolbox), Python (TensorFlow, OpenCV);  (Intermediate) C/C++, HTML, CSS, JavaScript (d3), SVG; (Basic) R, SPSS
- **Signal Analysis**: EEG recording & preprocessing, ERP & time frequency analysis, MVPA, dynamic GLM, clustering & classification, connectivity, microstates, traveling wave
- **Modeling**: Bayesian modeling & MCMC, Inverted Encoding Model (IEM), Convolutional & Recurrent Neural Network (CNN & RNN)
- **English**: GRE Verbal 168, Quantitative 170, Analytic Writing 4; TOEFL 112 (Speaking 23); CET6 618


