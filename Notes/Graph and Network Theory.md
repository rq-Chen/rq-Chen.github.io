# Graph and Network Theory

## Network Discriptors

- Node degree and degree distribution
- Degree correlations (assortativity):
  - by average degree of neighbours: $$k_{nn}(k) = \sum_{k'} k'P(k'|k)$$
    - in real networks usually $$k_{nn}(k) = ak^\mu$$
    - $$\mu = 0$$: neutral networks $$k_{nn}(k) = \frac{\langle k^2\rangle}{\langle k \rangle}$$
    - $$\mu > 0$$: assortative networks, hubs tend to connect to hubs
    - $$\mu < 0$$: disassortative networks
  - by degree correlation coefficient: Pearson $$\rho$$ of the degrees of the two nodes in each link
    - however, if real networks' $$k_{nn}$$ follows power-law, linear correlation is unsuitable
- Clustering coefficient:
  - The ratio of the number of edges in the neighbourhood of a vertex *i*, and the maximal possitive value: $$\frac{|\{e_{j, k}|v_j, v_k \in N_i,\ e_{jk}\in E\}|}{|N_i|(|N_i| + 1) / 2}$$
  - Mathematically, clustering coefficient measures the density of triangles in the network
  - Random network has low average clustering
  - Complex networks have high average clustering, facilitating local information transformation
- Motif: 
  - Generalization of clustering coefficient, which measures the density/occurrence of other simple structures (e.g. 4-5 nodes) in the network
  - The distribution of different motif classes in a network provides information about the types of local interactions that the network can support
- Path length:
  - Random and complex networks: short mean path length (between all pairs of nodes), indicating efficient global parallel processing
  - Regular lattices: long mean path length
- Efficiency: inverse of path length, but more convenient for use (e.g. set as 0 for unconnected pairs)
- Cost/Connection density: $$\frac{|E|}{|V|(|V|+1)/2}$$
- Centrality:
  - The numer of the shortest paths between all other node pairs in the network passing through the node of interest
  - Nodes with high degree or high centrality are important hubs for efficient communication in the network
    - The importance can be quantified by comparing the loss of global efficiency after removing the node
- Robustness:
  - the structural integrity of the network following deletion of nodes or edges
  - the effects of perturbations on local or global network states
- Modularity:
  - Modules can be found by hierarchical clustering
  - Provincial hubs: mainly connecting with the nodes in the module
  - Connector hubs: connecting with nodes in different module



## Notes for Barabasi's Book

### Random Networks

- The degree distribution of random network (Erdos-Renyi network) is a binomial distribution:
  - Mean degree $$\langle k \rangle = p(N - 1)$$, where *p* is the connection probability between two nodes
  - Variance is small and there are very few hub nodes, contrary to many real networks
- Mean distance $$\langle d \rangle \approx \frac{\ln N}{\ln \langle k \rangle}$$, can explain "small-worldness"
- Mean clustering coefficient $$\langle C \rangle = \frac{\langle k \rangle}{N}$$, unlike real network (which depends on degree *k* but not scale *N*)
- Giant component:
  - Giant component is generated when nodes connect to at least one other node on average (from $$N_G \sim \ln N$$ to $$N_G \sim N^{\frac{2}{3}}$$)
  - There are still some smaller isolated components before $$\langle k \rangle < \ln N$$ (when $$N_G \sim (p - \frac{1}{N - 1})N$$), which is different from observation in real (and usually very sparse) network

### Scale-free Networks

- Scale-free networks are networks with a degree distribution that follows a Pareto distribution (negative power law):
  - The decrease of probability is so gradual that it lacks a characteristic scale $$\langle k \rangle$$
    - A lot more hub nodes with very high degree than in random network
      - the key to many properties of scale-free network
      - largest degree is about $$k_{\max} = k_{\min}N^{\frac{1}{\gamma - 1}}$$, where the power law holds for $$k > k_{\min}$$
    - Also a lot more nodes with very low degree
  - In most networks (e.g. biological one), the power $$\gamma$$ is about 2-3
    - In this range (smaller than 3), the variance is infinity
    - Note: there is no scale-free network with $$\gamma < 2$$, and those with $$\gamma > 3$$ can be well approximated by random network
  - In physical networks, the degree distribution may show two deviations:
    - Low-degree saturation: 
      - the distribution is flat below a threshold, i.e. fewer nodes with low degree
      - can be explained by the "baseline attraction" for low-degree nodes, in addition to preferential attachment
    - High-degree cutoff:
      - can be explained by some physical constraint, or node deletion
      - can be model by a power law distribution multiplied by an exponential distribution, strectched exponential distribution, or log normal distribution
- Small-worldness: defined as the ratio between clustering coefficient (like families and cliques) and mean path length (both normalized against those of a random network)
  - Random networks also have short mean distance ($$\ln N$$)
  - Scale-free networks have "extra small-worldness"
    - $$\ln \ln N$$ when $$2 < \gamma < 3$$
    - $$\frac{\ln N}{\ln \ln N}$$ when $$\gamma = 3$$
- Scale-free networks can be generated by "preferential attachment" (Barabasi-Albert model): new nodes tend to connect with existing nodes with high degree
  - Initially, $$m_0$$ nodes each with at least one link
  - Each time step, adding one nodes with $$m \le m_0$$ links, connecting to nodes with degree $$k_i$$ by a probability of $$\Pi(k_i) = \frac{k_i}{\sum_j k_j}$$
  - Several ways to implement the model implicitly:
    - Link selection model: at each time step, connecting a new node to one end of one randomly-picked link
    - Copying model (most popular one): connecting to a randomly-picked node by probability *p* or one of its randomly-picked neighbour by probability *1-p*
    - Optimization model: for new node *i* minimizing $$C_i = \min_j [\delta d_{ij} + d_{1j}]$$ on a square, where $$4 \le \delta \le N^{1/2}$$ generates scale-free network
    - Currently there's no model for nonlinear preferential attachment below
  - Properties of Barabasi-Albert model:
    - Power law degree distribution with $$\gamma = 3$$
    - Degree of all nodes increases by a same power law $$k_i(t) = m(\frac{t}{t_i})^\beta$$
      - The nodes was added to the network at time $$t_i$$
      - Older nodes has larger degree
    - $$\langle d \rangle \sim \frac{\ln N}{\ln\ln N}, \langle C \rangle \sim \frac{(\ln N)^2}{N}$$
- In real networks, the preference of high-degree nodes are not necessarily linear but following a power law $$\Pi(k) \sim k^\alpha$$
  - $$\alpha$$ can be measured by tracking the degree dynamics of each node
  - When $$\alpha < 1$$, there will be fewer and smaller hub nodes
  - When $$\alpha > 2$$, most nodes will be directly connected to several super hub nodes
- Fitness model (Bianconi-Barabasi model):
  - The connection probability is proportional to the product of the *fitness* of each node (randomly generated) and its degree $$\Pi_i = \frac{\eta_i k_i}{\sum_j \eta_j k_j}$$
  - This model is equivalent to Bose gas:
    - Fitness - Energy of the particle
    - Link - One particle on the energy level of the endding node
    - Adding a node and *m* links - Adding one energy level and *m* particles
    - Therefore, with some fitness distribution, the network will show Bose-Einstein condensation - most nodes are connected to one or a few hubs
  - Different distribution of $$\eta$$ will generate networks with different properties
    - it turns out that in real network the fitness distribution is often exponential, so the range is actually small but gradually enlarged with time
  - Properties:
    - degree dynamics: degree of each node increases with time by power $$\beta(\eta) = \frac{\eta}{C}$$
      - therefore, the fitness distribution can be estimated by measuring degree dynamics
    - degree distribution: weighted sum of multiple power-law distribution
      - for uniform prior, $$p_k \sim \frac{k^{-(1 + C^*)}}{\ln k}$$

- Other network dynamics:
  - Internal connections: connections between old nodes other than currently-entering nodes
    - usually following bilinear principle $$\Pi(k, k') \sim (A + Bk)(A + Bk')$$
    - will make $$\gamma$$ smaller, since hubs will be interconnected in this way and become even larger, so the network becomes more heterogeneous
    - if the internal connections are random ($$B = 0$$), then $$\gamma$$ will be larger
  - Node deletion: randomly deleting $$r$$ nodes at each time step
    - when deletion is slower than growth, the network is still scale-free but $$\gamma$$ will increase
  - Accelerating growth: number of links added to the network in each step increases by power law
    - will make $$\gamma$$ larger
  - Aging: link probability $$\Pi(k_i, t - t_i) \sim k_i(t - t_i)^{-v}$$
    - when aging is beneficial ($$v < 0$$), $$\gamma$$ decreases, otherwise increases

### Robustness

- Percolation theory: how random removal of nodes impacts the integrity of the network
  - Model: 
    - putting nodes on a infinite large grid (n-dimensional)
    - neighbouring nodes are regarded as connected
    - a giant (infinite) component (called percolating cluster) will be generated after putting $$p_c$$ proportion of nodes
  - Dynamics:
    - Averge (finite) cluster size: $$\langle s \rangle \sim |p - p_c|^{-\gamma_p}$$
    - Order parameter (probability of a randomly-picked node belonging to the largest component): $$P_{\max} \sim (p - p_c)^{\beta_p}, p \ge p_c$$
    - Correlation length (mean distance within one cluster): $$\xi \sim |p - p_c|^{-v}$$
    - The exponentials $$\gamma_p, \beta_p, v$$ are universal over all grid type, only depending on the dimension of the grid ($$p_c$$ depends on both)
  - The breakdown of random networks is equivalent to removing nodes from a infinte-dimension grid
    - Scale-free networks have different parameters
- Molloy-Reed criterion:
  - A network (with any degree distribution) will have a giant component if nodes are (randomly) connected at least two other nodes on average: $$\kappa = \frac{\langle k^2 \rangle}{\langle k \rangle} > 2$$
  - The critical proportion of nodes removed (note: $$1 - p_c$$) at this point is $$f_c = 1 - \frac{1}{\frac{\langle k^2 \rangle}{\langle k \rangle} - 1}$$
    - Nearly all networks have enhanced robustness against random networks since $$\langle k^2 \rangle$$ is larger
    - The robustness is also enhanced for random link removal
  - For scale-free networks with $$\gamma < 3$$, $$\lim_{n \to \infin} f_c = 1$$, i.e. all nodes must be removed to disconnect a scale-free network
    - because random removal hardly infects hub nodes, which are the key for the network's integrity
- Tolerance over attack (on hubs): scale-free networks are easily destroyed over attacks
- Cascading events:
  - In real networks (e.g. power network), the scale of cascading failure follows power law
  - Propagation model:
    - one event happens at one node
    - if the event happens at a certain proportion of neighbours of one node, it will be propagated to this node too
    - if $$\langle k \rangle$$ is around the critical region, the avalanche exponential will be 1.5
  - Branching model:
    - Plotting out the events as a tree
    - if the average number of children in all branches is around 1, the exponential will be 1.5
    - for scale-free network, the exponential is around 2-1.5 for $$2 < \gamma < 3$$
- Balancing robustness against random failure and attack:
  - The network optimizing $$f_c^{\text{rnd}} + f_c^{\text{att}}$$ will be one superhub and stubs with a same degree (when $$k_{\min}$$ is relatively large, stubs themselves can connect the whole network together)
  - Therefore, the scale-free structure of real network is not aimed at optimizing robustness
  - One method against saccading faults is to seperate the event-striken part from the rest of the network, which can explain the *Lazarus effect* (knocking down additional genes apart from critical ones can "revive" a cell)

### Communities

- A community is a locally densely connected subnet in a network, and community detection is basically a clustering problem (and usually hierarchical, without predefined number of clusters)
  - Strong communities: $$k_i^{\text{int}} > k_i^{\text{ext}}$$ for each node *i* within the community
  - Weak communities: $$\sum_{i \in C} k_i^{\text{int}} > \sum_{i \in C} k_i^{\text{ext}}$$
  - Contrary to community detection problem is the graph partition problem (usually solved by Kerninghan-Lin algorithm), aiming at seperating the network into predefined number of subgraphs
- Node-base detection:
  - Bottom-up method:
    - Define node similarity matrix
      - e.g. $$X_{ij} = \frac{J(i, j)}{\min(k_i, k_j) + 1 - \Theta(A_{ij})}$$ is the topological overlap, where $$J(i, j)$$ is the number of common neighbours (+1 if they are connected) and $$\Theta$$ is the step function
      - $$X_{ij} = 1$$ if two nodes are connected and have completely the same neighbours, $$X_{ij} = 0$$ if they are disconnected and have no common neighbours
    - Define the similarity between clusters, e.g. by average/max/min similarity of all node pairs
    - Hierarchical clustering
  - Top-down method (Girvan-Newman algorithm):
    - Define centrality: e.g. link betweenness $$X_{ij}$$ is the number of shortest paths passing through $$v_{ij}$$
    - Hierarchical clustering: removing one link with the largest centrality and recalculating centrality in each step
- Link-based detection:
  - Clique percolation (*CFinder*):
    - Find out all k-cliques (complete subgraph, usually k = 3 or 4) in the network
    - A k-clique community is the union of all adjacent k-cliques, where two k-cliques are adjacent if they share k-1 nodes
    - For k = 3, it can be calculated that for giant k-clique to emerge in a random network, $$p \sim \frac{1}{\sqrt{2N}}$$
  - Link clustering:
    - Enabling a node to participate in multiple communities
    - Define link similarity: $$S((i, k), (j, k)) = \frac{|n_+(i)\ \cap\ n_+(j)|}{|n_+(i)\ \cup\ n_+(j)|}$$, where $$n_+$$ is the set of its neighbours and itself
    - Hierarchical clustering

- About hierarchical clustering:
  - One way to define when to stop is the maximum of modularity:
    - Modularity $$M = \frac{1}{2L}\sum_{c = 1}^{n_c}\sum_{i,j \in C_c} A_{ij} - \frac{k_i k_j}{2L} = \sum_{c = 1}^{n_c}\frac{L_c}{L} - (\frac{k_c}{2L})^2$$
      - $$L_c, k_c$$ are the total number of links and degrees within community $$c$$, $$L$$ is the total number of links in the network
      - M is the deviation of connectivity pattern from a random network
      - Zero or negative modularity implies the lack of modules
    - A greedy algorithm:
      - Starting from *N* clusters
      - Merge two clusters for most gain in modularity at each step
      - Choose the partition with highest modularity
    - Louvain algorithm
  - Problems of hierarchical clustering:
    - Are real networks hierarchical?
      - In classical network models (Erdos-Renyi and Barabasi-Albert) the clustering coefficient $$C(k)$$ is independent of k, so the hubs are more like connector hubs rather than regional hubs
      - In most real networks, $$C(k)$$ decreases with $$k$$, consistent with a hierarchical structure
    - Modularity metric has some fallacies:
      - The metric will force small groups to merge, sometimes even when they are totally seperated
      - The metric usually has a maximum plateau, not very good for optimization
      - Most importantly, random networks show high modularity with some partition!

### Spreading Phenomenon

- Traditional epidemic modeling:
  - SI model (Susceptable-infected model):
    - $$\frac{dI}{dt} = \langle k \rangle\beta \frac{S(t)I(t)}{N}$$, let $$i = I/N$$ then $$\frac{di}{dt} = \langle k \rangle \beta i(1 - i)$$, $$\langle k \rangle \beta$$ is the transmission rate or transmissibility
    - Sigmoid
    - Characteristic time for $$1/e$$ of the population to be infected: $$\tau = \frac{1}{\langle k \rangle \beta}$$
  - SIS model (Susceptable-infected-susceptable model)
    - $$\frac{di}{dt} = \langle k \rangle \beta i(1 - i) - \mu i$$, $$\mu$$ is the recovery rate
    - Characteristic time $$\tau = \frac{1}{\mu(R_0 - 1)}$$, where $$R_0 = \frac{\langle k \rangle \beta}{\mu}$$ is the basic reproductive number
    - When $$R_0 < 1$$, the epidemic will end with only a proportion of people infected
  - SIR model (Susceptable-infected-removed (recovered/dead) model)
    - $$\begin{cases}\frac{ds}{dt} = -\langle k \rangle \beta i(1 - r - i)\\ \frac{di}{dt} = -\mu i + \langle k \rangle \beta i(1 - r - i)\\ \frac{dr}{dt} = \mu i \end{cases}$$
    - I(t) growing exponentially at first but gradually dropped to 0
- Epidemic on network:
  - SI model: 
    - replacing $$\beta$$ and $$\langle k\rangle$$ with specific $$\Theta_k$$ and $$k$$
    - for networks without degree correlation, $$\Theta_k$$ is independent of *k*
    - $$i_k = g(t) + kf(t)$$
      - hubs are more easily affected
    - $$\tau^{\text{si}} = \frac{\langle k\rangle}{\beta\langle k^2 \rangle - \beta\langle k \rangle}$$
      - $$\tau = \frac{1}{\beta\langle k\rangle}$$ for random network, same as traditional result
      - $$\tau \to 0$$ for large scale-free network ($$2 < \gamma < 3$$), since hubs are susceptible
  - SIS model:
    - $$\tau^{\text{si}} = \frac{\langle k\rangle}{\beta\langle k^2 \rangle - \mu\langle k \rangle}$$, for scale-free network $$\tau \to 0$$
    - spreading rate $$\lambda = \frac{\beta}{\mu}$$
      - the epidemic threshold for random network is $$\lambda_c = \frac{1}{\langle k \rangle} + 1$$
      - for scale-free network $$\lambda_c = \frac{\langle k \rangle}{\langle k^2 \rangle} \to 0$$
  - SIR model:
    - $$\tau^{\text{si}} = \frac{\langle k\rangle}{\beta\langle k^2 \rangle - (\mu + \beta)\langle k \rangle}$$, for scale-free network $$\tau \to 0$$
    - for scale-free network $$\lambda_c = \frac{1}{\frac{\langle k^2 \rangle}{\langle k \rangle} - 1} \to 0$$



## Tessellation

### Voronoi Diagram

- Also called *Dirichlet tessellation*.
- Given a set of *N* points, divide the plane into *N* cells, each containing one point and the area that is closest to this point (rather than other *N-1* points).

### Delaunay Triangulation

- Given a set of *N* points, connect them into triangles so that no point is inside the circumcircle of any triangle.
- It maximizes the minimum angle in the whole triangulation, so it tends to avoid large obtuse angles.
- *Delaunay triangulation* corresponds with the *dual graph* of Voronoi diagram (connecting the *circumcenters* of adjacent triangles generates the Voronoi diagram).



## Interpolation

### Natural Neighbour Interpolation

- Interpolate a point *P* by the weighted sum of its neighbours {*S*} in space, where the weights are calculated according to the *Voronoi tessellation* with or without *P*.
- *Sibson weights*: weights can be the ovelapping volume of the old Voronoi cell of *S* (noted as cell S) and the new Voronoi cell of *P* (noted as cell P) divided by the latter's volume.
- *Laplace weights*: weights are the measure of the interface between cell P and new cell S divided by the distance between P and S, then normalized (See [wiki](https://en.wanweibaike.com/wiki-Natural%20neighbour%20interpolation)).



## Literature Review

### Complex brain networks: graph theoretical analysis of structural and functional systems

- Edward Bullmore\*, Olaf Sporns
- *Nat. Rev. Neuro. 2009*
- 8000+ citations

**General pipeline for graph-theory-driven analysis of brain networks:**

- Define nodes (electrode/source)
- Connectivity estimation
  - Most commonly undirected:
    - Coherence, correlation, mutual information, etc.
    - Inter-regional correlation (in MRs), connection probability (DTI)
  - Directed: Granger causality, Dynamic causal model coefficients, etc.
- Threshold the connectivity to get a binary adjacent matrix
  - Usually the analysis will be repeated by choosing different threshold
  - Sometimes the analysis can also be done on the weighted edges
- Calculate some graph parameters and compare against a random network (usually non-parametric permutation and bootstrap tests)
  - Node degree, degree distribution and assortativity
  - Clustering coefficient and motif
  - Path length and efficiency
  - Cost/Connection density
  - Centrality
  - Robustness
  - Modularity

