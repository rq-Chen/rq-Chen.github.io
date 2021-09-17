# Python Notes

## Anaconda

How to install python 2.7 (32 bit) and python 3.7 (64 bit) simultaneously on a 64 bit windows 10 machine:

1. Download and install [Anaconda 3](https://www.anaconda.com/distribution/) (using default settings).

   Anaconda helps maintain Python packages and enables switching between different python version through virtual environments. In my case, I create two environment other than the normal one (base): py27win32 for NAO Robot development and tensorflow2gpu for CNN training (python 3.7 (64 bit), tensorflow2, keras).

2. Add Anaconda directories to the system path:

   1. `C:\Users\YOURNAME\Anaconda3`
   2. `C:\Users\YOURNAME\Anaconda3\Scripts`
   3. `C:\Users\YOURNAME\Anaconda3\Library\bin`

3. Create a virtual environment for 32-bit python 2.7:

   Enter the command in cmd or Anaconda prompt (replace YOURENVNAME with the name your want, e.g. `py27Win32`):

   ```shell
   conda create -n YOURENVNAME
   conda activate YOURENVNAME
   conda config --env --set subdir win-32
   conda install python=2.7
   conda deactivate
   ```

   The `subdir` key enables us to force Anaconda to search only for win32 packages.

4. Register the new python:

   Enter `regedit`, go to `HKEY_CURRENT_USER\Software\Python\PythonCore`, create a new folder `2.7` in the style of the original one (`3.7`), changing all directory prefix to `ANACONDAPTH\envs\YOURENVNAME`.

**Rolling back to a previous installation state:**

```bash
conda list --revisions
conda install --revision [revision number that you want to go back to (including it)]
```



## Jupyter Notebook

- Magic code for inline illustration: `%matplotlib inline`
  - Use matplotlib instead of opencv for illustration, since the latter will pump up new window
- Run each block to see the output (including markdown blocks)
- If you want to change the path of the Notebook, the easiest way is to cd into the path in a shell, then type `jupyter notebook` to open it. (And **don't** close the shell)
- If you want to use vscode to edit Jupyter file, make sure you launch vscode by **Anaconda Shell** (type `code`) rather than Navigator! (And **don't** close the shell)
  - For code completion:
    - Install *IntelliCode* and *Pylance* from vscode marketplace
    - Open a .py file, then a dialogue will pump up asking you whether you want to set *Pylance* as the default language server, click 'yes and reload'
    - Open an iPython file and *Intellicode* will begin downloading model, and work immediately



## Python

- How to use the elements of an iterable (e.g. list) one by one as the input arguments of a function: using starred expression

  - Using starred expression for function input
    ```python
    def myfunc(a, b, c):
        print(a, b, c)
    mylist = [1, 2, [3, 4]]
    myfunc(*mylist)  # Output: 1 2 [3, 4]
    ```

  - starred expression can also be used as the left value of assigment:

    ```python
    a, *b, c = range(5)  # b = [1, 2, 3]
    ```

- For Python 2 only: `/` is the same as the `/` in C, or `//` in Python 3



## Numpy

- See https://numpy.org/doc/stable/user/numpy-for-matlab-users.html for the difference between numpy and matlab.

- Most important differences:
  - Arrays are passed **by reference**, including all **basic indexing**, which only creates views
    - Use `Y = X.copy()` for deep copy
    - Only advanced indexing (list, logical, `.ix_()`, array) generates deep copy
  - Arithmatic operations are **element-wise**, though `@` represents matrix multiplication ('element-wise' is just like that in matlab)
    - But `dot()` conducts matrix multiplication if both inputs are matrices!
  - `np.std()` and `np.var()` are normalized by **n** rather than **n - 1** in Matlab
  - **Zero-based, row-first** indexing
    - An *N*-dimensional numpy array of size $$(n_1, \dots, n_N)$$ is actually a list containing $$n_1$$ *(N-1)*-dimensional arrays, and a 0-dimensional array is just a normal list
    - So `x.flatten()` generates a vector in **last-dimension-first (row-first)** way, while `x.flatten('F')` is in column-first way just as in Matlab
    - Some functions are also different, e.g. `numpy.corrcoef()` treats each row as an variable by default while Matlab always treats each row as an observation
  
  - When indiced by **a single integer *i*** (not `i:i+1`), this dimension (even if it is in the middle position) will be removed, unlike matlab
    - e.g. `arr = np.zero([2, 3, 4])`, then `arr[:, 0, :].shape` will be `(2, 4)`
  - A silly difference:
    - `np.round()` (or `np.floor()`, `np.ceil()`) returns a **numpy.float64** object (more exactly, the same type as the input) which cannot be used directly as an index
    - More silly difference: `round(np.array(0))` also returns a **numpy.float64** object!
    - The workaround is to use `array.astype('int')`, which converts each element to int (round-towards-zero like `//`, and preserves the shape)
  
- Size:
  - `size()` is the same as `numel()` in matlab, `arr.shape()` is the same as `size(arr)` in matlab
  - Normal one-dimensional Python lists and 1D numpy arrays are **row vectors** by default, but matlab arrays have fixed shape
    - e.g., if you multiply an 1D array of size `(n,)` with a column vecor of size `(n, 1)`, the result is an **n * n** matrix rather than a vector
    - e.g., an array of size `(2, 3)` can be added up with an array of size `(3,)` but not `(2,)`
    - You will get an **1D** array when extracting a column using a single integer
  - Just like Matlab, Numpy will add or remove the trailing singular dimension automatically
    - But unlike Matlab, it will be removed only after operation rather than immediately after your declaration.
  
- Indexing:
  - Basic Indexing:
    - Python uses zero-based Indexing and the second argument in the `::` command means the position after the end
      - e.g., getting 40 trials for each subject *i*: `arr[i * 40:(i + 1) * 40, :]`
    - `arr[a-1:b:step, ...]` equals to `arr(a:step:b, :, :)` in matlab (maybe more `, :`) if `step` is positive, and `arr(a:step:b+2, :, :)` if `step` is negative
      - if you need to index a dimension reversely to the beginning (including), it's like: `arr[a::-1, :]`
    - You can add a `None,` (or `np.newaxis,`) to where you want in order to add a singular dimension
      - e.g. `arr = np.zero([2, 3, 4])`, then `arr[..., None, :].shape` will be `(2, 3, 1, 4)`
    - When indiced by **a single integer *i***, this dimension (even if it is in the middle position) will be removed
      - e.g., you will get an **1D** array (row vector) instead of a column by `arr[:, i]`
      - But indexing by `i:i+1` can work around it
    
  - Advanced Indexing:
    
    - You can use list or logical indexing just like matlab, iff in **ONLY ONE DIMENSION**
    
      - Besides, `[aList]` is the same as `[aList, ...]`
    
    - For list or logical slicing over more than one dimension, you must use `arr[np.ix_(list1, list2, ... listN)]` in **ALL DIMENSION**
    
      - Each list must be **1D**, i.e., for position *i* you need `[i]`, and you can't use column vector
      - You should **NEVER** mix up `np.ix_()` with any other kind of indexing!
    
    - You can use ndarrays with compatible size in every position for indexing, in order to extract scattering elements in the array:
    
      ```python
      result[i_1, ..., i_M] == x[ind_1[i_1, ..., i_M], ind_2[i_1, ..., i_M],
                                 ..., ind_N[i_1, ..., i_M]]
      ```
    
      for all `i_k` in `range(n_k)`, where all indexing arrays can be broadcast to size `[n_1, ..., n_M]`.
    
      - In Matlab you can do similar things (but no broadcasting, all arrays must have same size) by `sub2ind()`
  
- Broadcasting:
  
  - Numpy operations are broadcast in a similar way as Matlab's element-wise operation (that is, arrays must be in "compatible size")
  
- Others:
  - You can use `+=` in python
  - You must close a file opened by `np.load('xxx.npz')` after extracting the data (but for `.npy` file the return value is a single array)
  - Somtimes `np.load('xxx.npy')` may return something like `tmp1 = array({'a', va, 'b', vb, ...}, dtype=object)`, which is an 0-dimensional array containing a dict. In order to get the contain, you have to use `tmp = tmp1[()]` or `tmp = tmp1.item()`
  - There's no `find()` in numpy, but you can use `nonzero()`. 
    - **CAUTION**: `np.nonzero()` returns a tuple of arrays, each containing the indices of none-zero elements in corresponding dimension!
    - Besides, you can use `argmax()` to get the index of the first occurrence of largest item (but you cannot do so by `max()`)
  - Matlab functions usually operate on the first dimension by default, but numpy's usually work on the whole array by default (e.g. `min`, `std`)



## Matplotlib

- `plt.clim(a, b)`, not `clim([a, b])`
- `plt.subplot()` cannot combine several small subplots like matlab
  - But you can use `plt.subplot2grid(size, loc, rowspan, colspan)`



## OpenCV

- The top-left pixel is (0,0) and the y axis points to the bottom.
- OpenCV's default color space is **BGR!!!** And the range will vary too (0 to 255 for CV_8U images, 0 to 65536 for CV_16U images, 0-1 for CV_32F images). See https://docs.opencv.org/master/d8/d01/group__imgproc__color__conversions.html.
- `cv2.imshow()` will only show image after execution of `cv2.waitKey()`, similarly `plt.imshow()` or other matplotlib functions will only show image after `plt.show()`.
- `cv2.HOUGH_GRADIENT` is called `cv2.cv.CV_HOUGH_GRADIENT` in the old version.



## PyTorch

- Torch tensor: a replacement of Numpy array
  - `torch.xxx` instead of `np.xxx`, e.g. `rand(), zero()`
  - `torch.tensor()` instead of `np.array()`
    - Note that the latter can convert multidimensional python lists to numpy array but the former cannot
      - But it can convert multidimensional numpy arrays to tensors
    - Note: for both one, passing `[1., 2.]` to prevent implicit conversion into integer
    - In old version, only `torch.variable()` instead of `torch.tensor()` can be used in autograd, but now the former has been removed
  - `torch.from_numpy()` transform a numpy array to torch tensor
  - Note: pytorch cannot convert float to double automatically in computation
    - The default dtype of pytorch is `torch.float32`
    - But the default dtype of numpy is `numpy.float64`, therefore, when you convert a numpy array to torch tensor, it will be `torch.float64` and may cause problems
    - A solution is to set `torch.set_default_dtype(torch.float64)`
  - some simple operations are defined as methods, e.g. `.sigmoid().pow(2).sum()`
  - some slight differences, e.g. parameter order in `meshgrid()`
  - `torch.max()` can return index along with maximum value if you set the parameter `dim=`
  
- Autograd: tensors will automatically track their computational history (by links `.grad_fn()` to the caller functions) if `.requires_grad() = True`
  - **requires_grad**:
    - Self-created tensors have a default value of **False**
    - Parameters in network modules have a default value of True
    
  - You can freeze a part in the network by:
    
    ```python
    for param in model.parameters():
        if (param is in this part):
            param.requires_grad = False
    ```
    
  - You can propagate the gradient to the `.grad` field of respective tensors by `.backward()`
    
    - e.g., `x = torch.tensor(2.); y = x ** 2`, then `y.backward()` will make `x.grad = 4.`
    
  - The gradient is computed each time `.backward()` is called, so the computational graph is recreated every time
    - Therefore, theoretically you can change the network structure in every iteration, using commands like `while(), if()` in python
    - However, in Tensorflow 1.0, the whole graph must be defined statically and compiled before real computation by commands like `tf.while_loop()`
    - Torch tensors contain real data while Tensorflow uses placeholders.
    - That's why we say PyTorch supports dynamic computational graph while Tensorflow cannot.
  
- Using GPU:
  - `device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')`
  - Store data in GPU:
    - `x = torch.tensor([1, 2, 3], device=device)` or
    - `x = torch.tensor([1, 2, 3]).to(device)`
  - Store model in GPU: `net.to(device)` (no reassignment required)
  - Usually, you don't need to specify the device in the definition of a module if you make sure all inputs are on the same device:
    - e.g. when transfering a list of tensors (maybe of differnt shape so that you cannot convert the list into a larger one) to GPU, you may need to use `[curr.to('cuda') for curr in listTensor]`
    - if the outputs are generated by the processing of input through a series of PyTorch modules, than the output will be on the same device of the input
      - but if you do other operation involving **a tensor** on another device (so using a number will be OK), e.g. adding a constant offset vector manually, than that will be a problem
    - however, the output of self-defined methods without GPU input (e.g. `initialize_hidden()`) is on CPU by default
  
- Define and train a network: see [Pytorch_Basis.ipynb](Pytorch_Basis.ipynb)

  - A key feature in Pytorch is the *module*, which encapsulate computational units like layers and networks.
  - A module is defined as a subclass of `nn.module`, which has a `.__init__(self)` method (of course) and a `.forward(self, x)` method:
    - In `.__init__`, you initialize the module and define the trainable modules/parameters
      
      - The immediate submodules can be shown by generators `.children()` or `.named_children()`, and all submodules can be shown recursively by `.modules()` or `.named_modules()`
    - All parameters can be shown by `.parameters()` or `.named_parameters()`
      - You can use modules dynamically with the help of `.ModuleList()` or `.ModuleDict()`
    - In `.forward()`, you define the computational flow of the module
  - To train a network:

    - Register the parameters into an optimizer

    - Repeat the following:

      - Feed one batch into the network
  - Adding up the loss
      - Clear current gradient, then BP
  - Update the optimizer state (i.e. the parameters)
  - How to train in batches:
    - Most Pytorch modules' definition don't contain the batch size parameter:
      - If the data has one more dimension than the input definition, the first dimension will be automatically treated as the batch size
      - the modules will automatically stack the outputs along the first dimension
    - But the input of `torch.nn.Rnn()` is of size `(seq_len, batch_size, input_dim)` by default unless `batch_first` is `True`
    - When defining new modules, make sure that they can handle data in batches correctly (e.g. using `nn.Linear()` instead of matrix multiplication)
    - A simple way to divide the data into batches is to use `torch.utils.data.TensorDataset()` and `torch.utils.data.DataLoader()`

- A concrete example: see http://pytorch.panchuang.net/ThirdSection/LearningPyTorch/

- Some functions:
  
  - `.repeat_interleave()` is similar to `np.repeat()` and different from `.repeat()`, where each element (instead of the whole pattern) is repeated



## BrainPy

- Current packages for computational neuroscience:
  - NEURON, NEST
    - Not based on Python entirely
    - Need to write C++ for new models
  - BRAIN (BRAIN2)
    - using strings to generate codes automatically
  - None can perform dynamic system analysis
  - BrainPy: https://github.com/PKU-NIP-LAB/BrainPy/
    - Python-based
    - Numerical solvers for ODE, SDE (stochastic), ...
    - Different neuron models, synapse models (e.g., AMPA, eletric gap), network models (e.g. E-I, CANN); soma and dentrite in future
    - AST(Abstract Semantic Tree)-based dynamic system analysis (but not for statistical model currently)
- ODE solver:
  - defined as a function `(x, y, ..., t, param1, param2, ...)`, output `dx, dy, ...`
  
  - used decorator `@bp.odeint(dt=DELTAT)` to solve automatically:
  
    ```python
    @bp.odeint(dt=0.01)
    def integral(x, y, t, p1, p2):
        dx = ...
        dy = ...
        return dx, dy
    x, y = 0., 0.
    for t in np.arange(0, 1, 0.01):
        x, y = integral(x, y, t, 1, 1)
        print(x, y)
    ```
- `bp.analysis` for dynamic system analysis