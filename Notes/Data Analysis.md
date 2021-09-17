# Data Analysis

## Analysis of large-scale neural data

- Cell assembly detection:
  - coactivation matrix clustering
    - coactivation: correlation of binned firing rate sequence
    - calculate the eigenvalues of the coactivation matrix (i.e. PCA)
    - compared with a null distribution (by random matrix), those exceeding the limit is consider a cell assembly
    - compute the activation sequence of each assemble:
      - if no overlapping: project with the eigenvector
      - if overlapped: compute ICA and extract this number of factors
    - limitation: time bin will influence the results; unable to extract more complicated coactivation pattern (e.g. constant time lag)
  - Neuronal cliques (GIC):
    - calculate the pairwise cross-correlation histogram (counting N2's spikes after a time lag to N1's spike)
    - when the histogram exceeds a limit in some range, these two neurons are considered within one group
  - Cell Assembly Detection (CAD)
    - pairwise correlation defined as dot product after a certain time lag subtracting dot product after a reversed time lag (reducing non-stationarity)
    - hierarchical clustering
  - SPADE:
    - Frequent Itemset Mining, count the occurence of all patterns (coactivation)
    - pattern spectrum filtering (counted by size and occrence), use MCMC as statistical limit, get the significant activation pattern
  - Analysis of sequences of synchronous events (ASSET)
    - correlation between timepoints (by neural activation overlapping)
    - MCMC
    - Get the time when pattern reactivates, but no neuron id
  - SPOTDisClust: t-SNE of time-variant paired cross-correlation
  - NMF of spike trains: only suitable for synchronized patterns
  - covoluted NMF: data is the convolution of two matrices, able to extract a pattern with a certain time lengths
    - still very dependent on the choice of binned length
    - non-convex optimization didn't has unique solution
    - only able to detect patterns involving a large proportion of neurons
  - PP-Seq: hierachical bayesian estimation of events in rasterogram (points on 2D plane): generating spikes by gaussian probability bumps with different variance, for different neurons, at different time
    - hard to select priors, and so many parameters
  - Brain-inspired one:
    - send the data into an RNN neuron clique and see where hebbian learning or STDP leads us to (FuKai, Nat. Communication 2020)