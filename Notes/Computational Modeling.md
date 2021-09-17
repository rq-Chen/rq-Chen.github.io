# 计算建模在心理学和神经科学中的应用

## Intro

- 两种CS共同作用的现象：
  - 如果训练A+B -> R，那么A、B都引起R但是都比单独的弱（Overshadowing）
  - 如果先训练A -> R，再训练A+B -> R，那么基本只有A -> R的效果，B无效果（Blocking）
  - 如果先训练A -> R，再训练A+B -> 非R，那么A -> R，B -> 非R（Inhibition）

- Rescorla & Wagner (1972): when there exisit multiple CS, the model is similar to a perceptron, but all the weights share the same loss (the net loss), so that in the second phase, all weights change in a similar style.
- Alternative model: each weight has its own loss, which is the same as that in the simple model.
- Dopamine release and prediction error: 
  - Dopamine release were approximately linear to the prediction error.
  - Linear regression weights of the given results in the past trials for the current dopamine release were negative and exponentially increasing, and is positive for the current trial, which can be explained by the R-W model as the past R were multiplied by the exponent of the learning rate.

## MLE

- MLE不区分连续和离散概率密度。
- MATLAB的一种优化方法（三角形）
  - 只适用于确定性目标函数、连续变量
- 退火和遗传
- No Free Lunch
- Bootstrap估计：
  - 可以用来解决置信区间问题（当找不到参数或模型分布，只是用MLE估计了一个值的时候）
  - 非参方法：在原来数据中重采样（有放回），需要按原来比例和数目抽样以免bias
  - 参数方法：直接用拟合完的模型（比如一个正态分布）抽样来计算参数置信区间

## Model Comparison

- Likelihood Ratio Test: 比较两个参数不同的模型，方法是两个likelihood函数相除，如果大于某个常数则拒绝H0接受H1
- Nested hypothesis test: 
  - 比较一个小模型和包含它的大模型，如果不能拒绝H0则认为两个模型拟合得一样好，用简单的那个
  - 卡方分布的自由度是两个模型参数个数的差
- AIC:
  - 刻画了KL-divergence between data and model
  - 有一个改进形式
  - 零点无意义，只有差距有意义，比如先转成log likelihood然后归一化
  - 不应该把AIC当成统计量做hypothesis testing
- BIC:
  - Assumes that the correct model is among the ones you test
- DIC:
  - 使用Baysian进行点估计然后获得一个类似于likelihood的函数，再加上“有效参数数”（比如用likelihood在参数的后验概率分布中的方差表示）
- WAIC:
  - 把第一项改成了期望而不是最大值（同样是likelihood对参数的后验概率分布取期望）
  - 从AIC、BIC到WAIC越来越“纯粹”贝叶斯
  - 可以用R的Loo工具包计算（提供数据、参数和log likelihood function）
- Group-level comparison:
  - Fixed effect model: multiply all the probabilities from each subject (Bayes factor)
  - Random effect model: assumes that each subject may belongs to different model, and calculate the probability that one model is better for others (**Exceeding probability**, similar to the effect size) and the probability that this model is true (similar to statistical power)
- cross validation:
  - leave-one-out is actually asymptotically equal to AIC
  - cross validation is also subjected to some limitations

## Baysian

- MLE is invariant under re-parameterization, but the prior distribution is not

- The denominator in the Baysian equation is hard to calculate. However, we can approximate it by sampling, e.g. rejection sampling (sample from a "higher" distribution and reject the sample by the ratio of the height of two distribution at a give x).

- MCMC: MCMC methods are primarily used for calculating numerical approximations of multi-dimensional integrals. These algorithms create Markov chains such that they have an equilibrium distribution which is proportional to the function given (either the probability, or mean, variance, anything). It is a kind of Monte Carlo Method since it approximates the distribution by random sampling.
  
  Test of convergence: $$\hat{R}$$ statistics.

- Metropolis algorithm: 1D random walk, in each step, flip a fair coin to choose a side, and transport to there by a probability of
    $$
    p_{proposal} = [p_{left}, p_0, p_{right}] = [\frac{1}{2} \min \{1, P_{left} / P_{0}\}, 1- p_{left} - p_{right},\frac{1}{2} \min \{1, P_{left} / P_{0}\}]
    $$
    We can prove that the equilibrium distribution *p* (roughly equal to the distribution of the samples) approximates the *P* (the posterior pdf that we want to estimate). The key advantage is that computing the ratio of two posterior probability $$P(\theta_1|x), P(\theta_2|x)$$ (given the observed x) can elinminate the denominator (which is a constant $$\int P(\theta)P(x|\theta)\,d\theta$$ that is hard to calculate).

    This method is also similar to an optimization problem, where we only know the probability in the nearby area and try to find a global minimal.
    
- Gibbs sampling: random walk in a coordinate descent style.

    Used when we cannot directly sample from the posterior distribution, but can do so on the conditional distribution.

- Probles of MCMC:
  - No guarantee of convergence speed: Try multiple start point.
  - Autocorrelation (between succesive samples): Try downsampling.

- Conjugate distribution:
  - If the posterior is in the same distribution family as the prior, the prior distribution is a conjugate prior to the likelihood function.
  - Conjugate priors allow for analytical solutions for the posterior.

- Latent mixture models

## Baysian Examples and JAGS

- Seven scientists: 注意gaussian的第二个参数是精度不是方差！所以上面才要算一个方差出来。

## Modeling Categories

- Examplar theory: 用一系列范例的集合表示一个类别
  - General Context Model：即用指数距离之和对各类的examplar分别计算相似度，归一化后得出每一类的概率，也就是softmax。缺点：可能会容易分到范例多的类别。
  - General Recognition Theory：表征类别的边界，在边界附近高斯地反应
  - Deterministic Examplar Model：把GCM加上了随机性，即把距离和做一个指数，指数越接近0则选择越随机
- GCM的例子：
  - i是具体刺激，j是范例（即八种刺激），d是距离，s是相似度（有两个参数c（GCM的参数）和w（两个维度的权重）），b是0.5，t（准确地说是t_i）是第i个刺激出现的次数，r_i是第i个刺激被归为某一类的概率，a_j是第j个范例的类别（1或2，但图里似乎有错是0和1）

## Modeling Working Memory

- Magic number seven: 最早是用信息论的方法估计的，发现可以完整传输的量大概是2.5bit，也就是5到9。但是，真正的单位是chunk而不是bit。
- Steven Luck和Vogel的视觉工作记忆容量理论：无论多复杂都是4左右。但很多重复不出来。
  - Slot model：能记住的部分是高斯，记不住的部分是均匀分布。但无法解释为啥中间高斯的宽度会随记忆负担改变。
  - Resource model: 加入了一种新的error即location error，此时记住了刺激但是记混了要对哪个反应，于是在另一个位置（图上的non-target）出现一个高斯峰
  - Variable-precision resource model: 认为在不同试次或者一个试次的不同刺激之间precision都可以变化，有一个prior。加起来之后会发现分布更尖峰厚尾。

- Factorial comparison of working memory models: Wei Ji Ma 2014
  - "Factorial comparison": comparing all models obtained from the mixing and matching of distinct
    concepts.

## Reinforcement Learning

- Temporal Difference Learning

## Neural Decoding

- Spike chain
  - Firing rate estimation:
    - Binned average: starting position matters
    - Sliding window average (convoluted with a rectangular window): flattening the change
    - Gaussian window: not reasonable since its not causal (peaks will be shifted leftwards)
    - Alpha window
  - Firing rate encoding:
    - Tuning curve
    - Spike-triggered average stimulus: averaging the **stimulus** before the onset of each spike.
    - Firing-rate stimulus cross correlation
    - Multi-spike-triggered average stimulus (since several consecutive spikes were not independent)
  - Stochastic process modeling
    - Possion Process simulation
    - Fano factor should be close to 1.
    - Exponential distribution of the interspike interval (but need to set a refractory period).

## Information Theory

- Another view of mutual information: $$H_{resp} - H_{noise}$$, where $$H_{noise} = E_{sti}(H_{resp|stim})$$
- Another view of KL-divergence: the expectation of log likelihood
- How to maximize mutual information?
  - Maximize the response entropy (e.g. if the maximum firing rate is fixed then uniform distribution)
  - Following a derivative equation
- Fisher information:
  - measure of encoding accuracy: the expected curvature of the log likelihood at a specific stimulus value
  - Mutual information is a global measure while Fisher information is a local measure

## Population Coding

- Place cell: spike time-locked to theta phase, phase linear to position (in the reception field)
- Optimal encoding:
  - Bayes decision theory (by likelihood ratio)
  - Likelihood ratio test:
    - Neyman-Pearson Lemma: likelihood ratio test is the most powerful one at a specific type I error level.
  - likelihood ratio is the same as the gradient of ROC curve
  - If the likelihood is monotonically increasing function of r (firing rate), the firing-rate threshold method is optimal (equivalent to likelihood ratio test)
  
- Cricket's encoding theory for wind orientation:
  - Cartesian with four orthogonal basis vector (since there's no negative firing rate)

- Trade-off between bias and variance
  - variance and the square of bias sums up to the overall error
  - Cramer-Rao bound: $$\sigma^2_{est}(s) \ge \frac{(1 + b^{'}_{est}(s))^2}{I_F(s)}$$

