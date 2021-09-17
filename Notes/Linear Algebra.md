# Linear Algebra

## Singular Value Decomposition

- Linear transform view: decomposite any linear transform into three operations:
  - a rotation/reflection
  - followed by a coordinate scaling (with the singular values as ratios)
  - then another rotation/reflection
- Matrix view: decomposite any m * n matrix M into $$M = U\Sigma V^*$$ (\* for conjugate transpose), where:
  - U and V are orthogonal matrices of size m * m and n * n
  - $$\Sigma$$ is a m * n *rectangle diagonal matrix* with the *singular values* of M on the diagonal ((1,1), (2,2), ..., (min(m, n),min(m, n)))
- There is also a kind of compact SVD where $$\Sigma$$ is a r * r matrix only containing positive singular values (r is the rank of M), and $$U^*U = V^*V = I_{r * r}$$
- Singular values: square roots of the (non-negative) eigenvalues of $$M^*M$$

## Principal Component Analysis

- Dimensionality reduction view:

  - Fitting a k-dimensional ellipsoid to the data
    - i.e. finding out the very best k-dimensional subspace that minimizes MSE
    - Equivalent to finding out k directions that contain most variance of the data
  - Each principal component represents one axis of the ellipsoid

- Factor analysis view:

  - Figuring out *k* factors that explain most of the variance in dataset X
  - Each factor is a configuration representing a linear combination of *p* variables
  - Each obsevation can be quantified by the scores it gets on these factors, i.e. its "similarity" with each configuration

- Formulation: $$X = T_pW_p^\top$$

  - $$X \in \R^{n * p}$$ is the data matrix with *n* observations of *p* *variables* (e.g. *p* entries in a scale)
  - $$W_k \in \R^{p*k}$$ contains (in each column) the *loadings* or coefficients representing *k* *factors/components* in p-dimensional space
    - $$k \le p$$, and in most applications $$k \ll p$$
  - $$T_k \in \R^{n*k}$$ contains the *scores*, i.e., the representation of the data in factor space
    - $$T_k = XW_k$$
    - For approximation, $$X_k = T_kW_k^\top$$

- Computation:

  - By *spectral decomposition* of $$X^\top X$$:

    - the factors *W* are the (unit) eigenvectors of $$X^\top X = W\Lambda W^\top$$ (orthogonal diagonalization of the *covariance matrix* if *X* is centralized)
      - If the range of different variables (columns) in X are significantly different, the decomposition is conducted on the *correlation matrix* rather than covariance matrix, which is similar to z-scoring X before PCA

    - the variances explained are proportional to the eigenvalues

  - By *singular value decomposition* of *X*:

    - $$X^\top X = V\Sigma^\top U^\top U\Sigma V^\top = V \hat{\Sigma^2}V^\top$$, which is exactly $$W\Lambda W^\top$$
    - $$W = V, T = U\Sigma$$
    - We can also consider the k largest singular value and corresponding left and right singular vectors too, in which case $$X_k = U_k\Sigma_kV_k^\top$$ will be the optimal rank-k approximation of X using *Frobenius norm*