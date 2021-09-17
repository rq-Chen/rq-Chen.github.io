## The Multiple Comparison Problem

There are mainly four rational decision making strategies:

- Neyman-Pearson statistics
- Permutation-based statistics
- False-discovery rate control
- Baysian statistics

And the first two are mostly used.

### The Neyman-Pearson's Approach

#### Using different statistics

1. Formulate a *null hypothesis* for the value of the population parameters, usually with some assumption, e.g. normality and homogeneity
2. Take some statistics
3. Calculate a critical value given the false alarm rate and the null distribution

In order to solve the multiple comparison problem (MCP), the pipeline is modified:

1. Formulate a null hypothesis with *all* elements (e.g. time * freq * channel) in MCP as parameters, (e.g. all of them are the same for all conditions)
2. Take some statistics which depend on *all* data (e.g. the maximum of T)
3. Calculate the critical value with this statistics, and select the significant comparisons all using this value.

The rationale:

1. If for all timepoints the null hypothesis is true (namely the H0 is falsely rejected), then there will be a chance of α that the maximum T in a single trial will exceed T0 (the critical value).
2. If for *a specific* timepoint the null hypothesis is true, then there will be a chance of α / nTime that this T will exceed T0 (since data are assumed to be independent among nTime timepoints, and all these T values are assumed to be equally likely to be the maximum).
3. Therefore, we can safely say that *any* timepoint in the significant cluster we found is reliably significant, since the chance of *at least one* time points being false alarm is only α.

Constraints:

- This null hypothesis relies on some assumptions (e.g. Gaussian Random Field for maximum T statistics).
- Low power sometimes.

#### Correction of p-value

Bonfferoni correction:

- Divide α by *n* (the number of comparisons) so that totally there is still a chance of α for a single false positive outcome in all *n* tests.
- Very low power: if 100 timepoints turn out to be significant, then there's only a chance of α that *any one* of them is false alarm, namely, you can safely say that none of them are false alarm (like the rationale described above). That's a strict restraint and ignore the correlation in data (e.g. between consecutive timepoints).

False Discovery Rate (FDR) correction:

- Higher power: if 100 timepoints turn out to be significant, then there's a expected proportion of α of them that are false alarm. Besides, if the null hypothesis is true for *all* comparisons, then the false rejection rate is the same with Bonfferoni (α), so FDR is actually equally conservative with Bonfferoni.
- However, there is a problem: FDR assumes that the data are either uncorrelated or positively correlated, which is not true if the data contain both positive and negative wave, or channel dipoles, etc. A version that is compatible with *negatively correlated data* is **Benjamini and Yekutieli (2001)** (as implemented in fieldtrip).

### Permutation-based Approach

Actually the procedure is similar to the previous approach, except that it uses a different way to determine the threshold (critical value).

1. Formulate a null hypothesis for the probability distributions of the observations (e.g. distributions under all conditions are the same) without really specifing the form of it.
2. Take some statistics.
3. Calculate the critical value.

Example of a within subject design:

<img src = "Permutation test for within subject design.png" style = "zoom:30%" />

The null hypothesis is that the distribution of the random variable D under condition A is the same as the one under condition B. And there is an important theorem if the null hypothesis is true:

> Denote all permutations of the observed data as {d} (You can only permute the data within every subject). Then {d} is a uniform distribution for random variable D.

Therefore, you can calculate some statistics *S* for each permuted observation just like sampling from a uniform distribution. You can plot the histogram of *S* and see what percentile the real data is at, say the top 5%, then you can safely reject the null hypothesis without any extra assumptions.

One more hints: $$D_{Ai}$$ or $$D_{Bi}$$ here can be multidimensional, e.g. a time * freq * channel matrix resulted in averaging over trials for subject *i* under condition *A* or *B*. You should only reassign (relabel) the condition ( for multiple subjects) or trials (for single subject) for permutation, rather than shuffling the time course within each trial.

The aforementioned method is only at the single point level and you can also perform the MCP correction by maximum T (strong restraint as Bonferroni, with moderate power between Bonfferoni and FDR), but in order to make better use of the structure of data, it's better to operate at a cluster level. You should choose a statistics that depends on every number in these $$D_{Ai}$$ or $$D_{Bi}$$ (namely a cluster-level statistics in time/frequency/space domain), e.g. the maximum area under the ERP wave within a suprathreshold period (here the threshold is defined by an uncorrect *t* statistics):

<img src = "Permutation test for ERF.png" style = "zoom:30%" />

A detailed pipeline:

<img src = "Cluster level permutation test.png" style = "zoom:30%" />

**(IMPORTANT)** how to interpret clusters:

- If the cluster is defined *a priori* (time window, channel cluster, frequency range predefined), then it's reliably significant.
- If the cluster is defined during the test (like the aforementioned example), maybe not. The only thing we can safely say is that the data is different among the conditions in somewhere at sometime for some frequency.
- One confounding factor is that the cluster-level statistics may be more sensitive to some particular aspect or porportion of data, so that the "significant" cluster will be influenced. However this also means that you can define better statistics to test for specific aspect in the data.
- See the [original paper](https://www.sciencedirect.com/science/article/pii/S0165027007001707?via%3Dihub) on this test, the [Fieldtrip suggestion](http://www.fieldtriptoolbox.org/faq/how_not_to_interpret_results_from_a_cluster-based_permutation_test/), and Steven Luck's suggestion (ERP book, [online chapter 13](https://erpinfo.org/s/Ch_13_Mass_Univariate_and_Permutations.pdf), the last section *Practical Considerations*)



## Unordered Notes

- MANOVA is **NOT** ANOVAN! The former analyzes multiple *dependent* variables and the latter analyzes  multiple *independent* variables.
- How to characterize the extent to which the data is spatially clustered: **Moran's I** statistics.
- The inverse of *covariance matrix* is called *precision matrix* and it is widely use in Bayesian statistics since it has an analytic conjugate distribution (Gamma distribution).
- How to sample from any distribution: calculate the cumulative distribution $$F(x)$$, generate a uniform random number $$x_0$$ between 0-1, and return $$y$$ where $$F(y) = x_0$$.
  - In this way, $$P\{y_0 < y \le y_1\} = F(y_1) - F(y_0) = \int_{y_0}^{y_1} f(x) dx$$
  - Practically, you may need to sample $$F(x)$$ and return an approximated solution by `find(x0 > samp, 1, 'first')`



## Discriminant Analysis

- When the data is labeled, we should use discriminant analysis (e.g. LDA, canonical discriminant analysis)) rather than PCA for dimensionality reduction