# Information Theory

## Entropy & Relevant Concepts

- Entropy:
  - $$H(X) = \sum_i P(X = i)\log_2 P(X = i)$$
  - The average "surprise" given by all values of a random variable
  - The minimal (average) coding length of a random variable
- Joint entropy:
  - $$H(X_1, X_2) \le H(X_1) + H(X_2)$$
  - The equation suffices when the two variables are independent
- Conditional entropy:
  - $$H(Y|X) = \sum_{i} P(X = i) H(Y|X = i) = \sum_{i}P(X = i) \sum_{j} -P(Y = j|X = i)\log_2 P(Y = j|X = i)$$
  - $$H(Y|X) = H(Y)$$ if the two variables are independent
  - Easily we have $$H(X,Y) = H(X) + H(Y|X)$$
- Mutual information:
  - $$ I(X;Y) = H(X) + H(Y) - H(X,Y) = H(Y) - H(Y|X) = H(X) - H(X|Y)\ge 0$$
  - It represents the amount of B's information in A or A's information in B
  - When they are independent, the mutual information is 0. When A = f(B), the mutual information is H(A)
  - Unfortunately, there is still no satisfactory definition for the mutual information between more than two variables
- Relative entropy (KL Divergence):
  - $$D(p||q) = \sum p_k \log_2 \frac{p_k}{q_k} \ge 0$$, asymmetric, no upper bound
  - It is the extra bits you use if you encode a random variable with underlying distribution p with the optimal code for distribution q.



## Causality

- The *do*-operator $$do(\theta = \theta_0)$$:
  - Representing the effect of **actively** setting the value of parameter $$\theta$$ to $$\theta_0$$, i.e. the effect caused by such setting
  - For example, *y* is the air pressure and *x* is the barometer's reading, than $$p(y|x = x_0)$$ will be something like a Gaussian centered at $$x_0$$. However, $$p(y|do(x = x_0)) = p(y)$$ because manually changing the reading won't cause any change in the air pressure
- Effective information:
  - The extent of causality between intervetion *x* and effect *y* can be quantified by the **difference** between the effect resulting from **doing x** and **doing other things**
  - Effect of doing x defines a model as the map: $$\bold{x}\to p(\bold{y}|do(\bold{x}))$$
  - Effect of doing other things is an (expected) "effect distribution": $$E_D(\bold y) = \langle p(\bold y|do(\bold x))\rangle_{\bold x\in \chi}$$ (note: it is determined by the distribution of interventions)
  - The causal effect of doing *x* on *y* is defined as the KL-divergence of the former relative to the latter: $$D_{KL}[p(\bold{y}|do(\bold{x})) || E_D(\bold y)]$$
  - The effective information of a model $$\bold{x}\to p(\bold{y}|do(\bold{x}))$$ is thus the expectation of the causal effects over all considered interventions: $$EI = \langle D_{KL}[p(\bold{y}|do(\bold{x})) || E_D(\bold y)]\rangle_{x\in\chi}$$
  - EI is the same as the mutual information between $$I_D(\bold x)$$ and $$E_D(\bold y)$$, where $$I_D(\bold x) = \text{const}$$
- The information integration index $$\phi$$:
  - The bidirectional effective information between the two parts A, B of a bipartition over substrate S=A+B is simply $$EI(A\leftrightarrow B) = EI(A\to B) + EI(B\to A)$$
    - $$EI(A\leftrightarrow B) \le \min\{H^\max(A), H^\max(B)\}$$
    - $$H^{\max}(X)$$ is the entropy of uniform distribution $$I_D(x)$$
  - The *minimum information bipartition* of S, or MIB(S), is its bipartition with minimal normalized effective information $$\frac{EI(A\leftrightarrow B)}{\min\{H^{\max}(A), H^{\max}(B)\}}$$
    - This metric ranges from 0 to 1
    - When it is 1, it means A determines B or B determines A by a bijection
    - When it is smaller than 1, then the causality is not determinsitic or/and the mapping is not a bijection (i.e., not an injection, or not an surjection)
  - $$\phi = EI(A, B)\text{ where }MIB(S) = \{A;B\}$$



## Encoding

- Key point: 

  - Data transmission happens repetitively without any boundary
    - Prefix-free is a sufficient condition for correct decoding, but not necessary
  - Main question: the amount and transfer speed of information
  - Main concept: entropy (the amount of information) and mutual information (bound of the transfer speed)

- Kraft inequality: $$\sum_i 2^{-l_i} <= 1$$, where $$l_i$$ is the coding length of the i-th signal.

- **Minimal coding length**:

  Let $$q_i = 2^{-l_i}$$ and $$p_i = Pr\{\text{occurance of }i\}$$, then average coding length = cross_entropy{p, q}. Therefore the optimal coding is to let $$q_i = p_i$$, and the average coding length is exactly the **Entropy** of the random variable generating this signal.

  Practically, we let $$l_i = \lceil\log p_i\rceil$$, and it can be proved that the coding length is no longer than the optimal coding length + 1bit.

- In some sense, minimal coding length characterized the amount of information one random variable (generating this signal sequence) contains.

- Data processing inequality:  $$I(X;Z) \le I(X;Y)$$ if X -> Y -> Z is a Markov process.
- Entropy rate: It qualifies the information in a markov process (while entropy only deals with a single random variable). It is defined as $$\lim_{n \to \infin} \frac{1}{n} H(X_1, X_2, \dots , X_n)$$.



## Kolmogorov Complexity

- The K-complexity of a string *S* relative to a turing machine *U* is defined as the minimal length of a program which runs on *U* and outputs *S*.
  - $$K_U(S) \le K_{U'}(S) + C$$, where C is a function of U and U' (length of the program that runs on U' which models U). This means that the complexity is relatively independent of the programming language.
  - $$K_U(S)$$ is incomputable.

