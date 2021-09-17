# R Programming

## Data & Operation

### Datatypes

- Datatypes (objects):
  - Arrays and matrices: similar to matrix in MATLAB
  - Lists: similar to list + dict in Python
  - Factor: similar to categories in MATLAB
  - data frames: similar to table
  - functions
- The function `as.xxx()` provides many conversions.
- `NA` means missing data and `NaN` is something like 0/0, and they can be tested by `is.na()` (for both) and `is.nan()` (for `NaN` only).
- The arrays:
  - Data can be grouped with function `c()`, e.g. `x <- c(1, 2, 3, 4, 5)` renders a numeric vector while `x <- c(1, '2')` renders a character vector `["1", "2"]`.
  - Or by array constructor: `array(datavec, dimvec)`.
- Matrix: `m = matrix(c(1,2,3,4), ncol = 2, nrow = 2, byrow = T)`

### Index

- `1:30` is the same as in MATLAB; `seq(1, 100, by = 3)` is equivalent to `1:3:100` in MATLAB.

- Indexing with `[[i]]` is different from indexing with `[i]`, the former extract the element without the names of dimensions, while the latter extract a sublist, similar to `{i}` and `(i)` in MATLAB cell.

- Index is column-based and started from 1, similar to MATLAB.

- Index is similar to MATLAB but use a square bracket instead. Besides, you can use negative index to exclude items, e.g. `x[-(1:5), 6]`. You can also use logical index.

- You can use matrix as index, with each row of the matrix containing the indices of an element.

- Unlike in MATLAB, you can use matrix as index in R, where each row contains the *n* indices for one element.

- You can assign names to a variable and accessed them with attribute values:

  ```R
  fruit <- c(5, 10, 1, 20)
  names(fruit) <- c("orange", "banana", "apple", "peach")
  lunch <- fruit[c("apple","orange")]
  
  # or by dimnames
  mat <- array(1:4, dim = c(2,2))
  dimnames(mat) <- list(c('x', 'y'), c('x', 'y'))
  subMat <- mat['x','y']  # subMat = 3
  ```

### Operation

- Assigment is like `x <- y`
- You can check whether an item is in a list by `x %in% y`
- You can clip or extend (by `NA`) a vector by directly modifying its length: `length(y) <- 3`
- You can reshape a vector (e.g. into a matrix) by directly modifying its attribute `dim` similarly.
- You can add up two vector with different length ... Which means repeating the short vector for several (maybe not integral) times before element-wise operation. As an example, `labs <- paste(c("X","Y"), 1:10, sep="")` will render a vector of `c("X1", "Y2", "X3", "Y4", "X5", "Y6", "X7", "Y8", "X9", "Y10")`. **IMPORTANT: this is how vector input was processed in all R functions (see below)!**
- Matrices can be combined with `cbind()` for columns or `rbind()` for rows.

## Control Flow & Function

```R
if (something) {
    blablabla
} else if (something) {
    blablabla
} else {
    blablabla
}

for (a in b) {
    something
}

while (somthing) {
    blablabla
    break
    next
}

function_name <- function(arg_1, arg_2) {
   Function body 
}
```

- How function with **vector input** works in R:

  ```R
  func(c(1, 2), c(1, 2, 3), matrix(c(1, 2, 3, 4), nCol = 2)) ==
    [[func(1, 1, 1), func(2, 2, 2)],
     [func(1, 3, 3), func(2, 1, 4)]]
  ```

  In other words, the output size is equal to the largest input size (same shape if it's multidimensional), and the shorter inputs are looped again and again (column-based).

- You can apply a function too every element of a list and get a list output of the same length by `sapply()`.

## JAGS

JAGS's syntax is similar to R, but it does **not** have if-statement!

## ggplot2

- The fundamental idea of ggplot2 is very similar to `d3.js`, that you should map data elements to geometric objects.

  In d3 this is done by the concept of selection:

  ```javascript
  d3.selectAll('tag1').data(myData).append('tag2')
      .attr('attr1', mapFunc)
      .attr('attr2', C)
  	.attr(...);
  ```

  While in ggplot2 it's done by aesthethic mapping.

  ```R
  myData = tibble(attr1 = c(...), attr2 = c(...), ...)
  ggplot(data = myData, mapping = aes(x = attr1, y = attr2, glbAttr1 = attr3, ...))
  	+ geom_elem1(locAttr1 = C, aes(locAttr2 = attr4, ...))
  	+ geom_elem2(...)
  	+ ...
  	+ geom_elemn(...)
  ```

- You need a scaling fuction for mapping. Just like the `d3.scaleXXX().domain().range()` or `d3.interpolateXXX()`, in ggplot2 we have `scale_ELEM_TYPE()`.