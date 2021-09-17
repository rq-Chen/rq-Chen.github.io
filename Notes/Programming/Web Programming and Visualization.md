# Some Hints about Web Programming and Visualization



## HTML & CSS

- This is a typical structure for html document:

  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">  <!--Chinese support-->
          <title>My first D3 bar chart</title>
          <link rel="stylesheet" type="text/css" href="bar_chart.css"/>
          <script src = "d3/d3-v5.12.0/d3.min.js" ></script>
          <script src = "bar_chart.js" ></script>
      </head>
  </html>
  <body>
  	<!--Visible content here-->
  </body>
  ```

- This is css:

  ```css
  h1 {  /* label selector, specify the format for the main title */
      text-align: center;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 2.5em;
  }
  
  .subTitle {  /* class selector, change the format for all elements of this class */
      font-weight: bold;
  }
  
  .figure {
      background-color: floralwhite;
  }
  
  .figure div {  /* specify the format for all <div> elements within class .figure */
      font: 10px sans-serif;
      background-color: slategrey;
      text-align: right;
      padding: 3px;
      margin: 1px;
      color: white;
  }
  ```

- If you don't provide a special `favicon.ico` (the icon shown beside the title and in the *favourites*) in the folder, the console will generate a 404 error. Ignore it.

- Typically, all the tabs, spaces and line breaks will shortened to one space character in html. However, *vscode* with *js-beautify* extension will somehow preserve all of them. So make sure **not to add any extra white character in the text or between the text and the tag in *vscode***.



## JavaScript

### Usage

- Import in in the `<head>` element of html (using `<script src = "..."></script>`), or write the js functions at the end of the document.
- When assigning js functions to html elements, the function should be written as `"myFun()"` rather than `"myFun"`.



### IO

- There are only four ways for output in js:
  - `window.alert()`: Pop out a window.
  - `console.log()`: write to the console.
  - `document.write()`: write directly to the output stream of html, **VERY RISKY** since you may overwrite the whole document (if you call it after loading the whole document).
  - `htmlElement.innerHTML()`: change the content of the html element `htmlElement`.



### Basic Syntax

- Comments are marked in exactly the same way as in C.

- Lines can be break by adding `\`, but only in the string.

- Variables should be declared in a way similar to Pascal, multiple and chaining assignment supported:

  ```javascript
  var a, b, c = [3, 4, 5];  // a === undefined, c === [3, 4, 5]
  a = b = c;  // a === b === [3, 4, 5]
  [a, b] = c;  // a = 3, b = 4, c = [3, 4, 5]
  ```

  But for block-scope variables there is a better way: `let a, b, c = [3, 4, 5];`

- Data types: js offers dynamic data type feature.

  - number: all numbers are represented by 64-bit float

  - string: quoted by single or double quote. Similar to python.

    e.g. `var answer="He is called 'Johnny'";`

  - boolean

  - array: similar to python list

    e.g. `var arr1 = ['adfas', 2, 'sdf'];`

  - object: similar to python dict

    e.g `var obj1 = {Name : 'sdf', id: 3, sayHello : function(){blablabla} };`

- **EXTREMELY IMPORTANT: object assignment performs shallow copy (passing reference)! Use `newobj = Object.assign({}, oldObj);` to get the deep copy!**

- Don't write `return` and the return value in different lines, because js will immediately return without the return value!

- Js operators are similar to the ones in C, except for the comparisons:

  | Equation  | Validity |
  | :-------: | :------: |
  | '5' == 5  |   true   |
  | '5' === 5 |  false   |
  |  4 != 4   |  false   |
  | 4 !== '4' |   true   |

  Namely, `==` and `!=` only compare the value while `===` and `!==` also compare the data type. Besides, the arithmetic operators are also slightly different:

  |  Equation  | Result |
  | :--------: | :----: |
  | '5' + '45' | '545'  |
  |  5 + '45'  | '545'  |

- Array methods:

  - If you want to get a column array from an 2D array, use the `slice(sIndex[, eIndex])` method.
  - If you want to get an array of value from the same attribute of every objects in an object array, use the `map(myFun)` method.



### Statements

- `if...else...`, `switch()`, `(statement) ? ... : ... ;`, `for (... ; ... ; ...){}`, `while()`, `do...while()` or `break` and `continue` are the same as in C.
- `for (var in obj) {}` is different from C, because here obj **must be an object and not an array**.
- `this` is similar to the one in python, namely, for the attributes and methods of an objectS, `this` points to the object itself.



### Function

- Declaration: a js function is just another kind of variable

  `myFun = function(inputA, inputB) {statements; return val;}`

- *Arrow function expression* is a more concise way to declare a function (usually when acting as the parameter of another function):

  ```javascript
/* Regular way */
  var myFun = function (arg1, arg2 = 0, arg3) {
    // expressions
      return {attr:value};
};
  
  /* Arrow function */
  myFun = ((arg1, arg2 = 0, arg3) => {/*expressions*/});
  
  /* Syntax */
  (param1, param2, …, paramN) => { statements } 
  (param1, param2, …, paramN) => expression
  // the second is equivalent to: (...) => { return expression; }
  
  // Parentheses are optional when there's only one parameter name:
  (singleParam) => { statements }
  singleParam => { statements }
  
  // The parameter list for a function with no parameters should be written with a pair of parentheses.
  () => { statements }
  
  // Parenthesize the body of a function to return an object literal expression:
  params => ({foo: bar})
  
  // Rest parameters and default parameters are supported
  (param1, param2, ...rest) => { statements }
  (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { 
  statements }
  
  // Destructuring within the parameter list is also supported
  var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
  f(); // 6
  ```
  
  Js doesn't check the number of the input
  
  - missing arguments are replaced by `undefined`, which can be checked using 
  
    `=== undefined`
  
  - extra arguments can be reached by a built-in object `arguments` containing an array of the input arguments
  
  - **objects are passed by reference**



## D3.js

### Selection

- The fundamental intuition of D3 is to bind the data array with the html element selection (more precisely, one element of the `_groups` attribute of the selection), e.g. binding a numeric array with a group of `<div>`s, each containing a bar or other forms of illustration.
- A selection can be created by `LargerSelection.select('LabelOrClass')` which select the first html element in selection `LargerSelection` with the property specified, or `LargerSelection.selectAll('LabelOrClass')` to get all of them. The largest selection is `d3`. Stacked `select()` or `selectAll()` will create a tree of elements and propagate the data from the root to the leaves likewise. Null elements will be created to maintain the structure if only a portion of leaf nodes contains element qualified for a new `select()` or `selectAll`. The tree will be condensed to three layers (selection-groups-elements) after selection.
- https://bost.ocks.org/mike/selection/ provides a very good illustration of the basic idea of selection and data binding.



### Loading Data

- `d3.csv()` use *fetch* to parse the *.csv* documents, and *fetch* doesn't support local files (only http and https supported). Therefore, you must set up a local server to do so, e.g. by [Chrome Web Server](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) extension.

- If your *.csv* file contains Chinese characters, make sure to **open it in notepad and resave it using utf8** encoding.

- Data loading is done **asynchronously**. So if you want to use the data, put all the code in the callback function in the `then()` method, e.g: 

  ```javascript
  d3.csv(filename, function (line) {
      return {
          ... : ... ,
          ...
      };
  }).then(function (data) {
      ...
  });
  ```



### Binding Data

- Data is bound to the selection by `selection.data(myData);`. Actually, the data is not stored in the selection, but in the DOM (the html elements).
- The data binding is defined **per-group** rather than per-element. For example, the command `d3.select('.figure').selectAll('tr').selectAll('td').data(matrix);` created a selection with m group nodes (the `tr`s - the leaf nodes before the second `selectAll` was called), each containing n `td`s, and the `data` function will be executed for m times, each time binding a row of the matrix with one group node. (see the webpage for a graphical illustration)
- The data binding is actually doing **key-matching** between elements and data, where the key is the index in the group/array by default. Therefore, you need to specify an key function if you want to change the order of the elements in order to fit the data using `data(myData, keyFunction)`, where `keyFunction` may return the name or other property of the input (element/datum).
- You can also bind a single datum to an element using the `datum()` method.



### Joining Data

- The `selection.enter()` only returns placeholder nodes for each datum that had **no corresponding DOM element** in the selection. Therefore, if key function is not specified (using index as key), `selection.enter()` and `selection.exit()` will only be non-empty when the number of entries is changed. For example, replacing [1, 2] with [1, 4] will render empty `selection.enter()` and `selection.exit()`. If you want them to contain the elements correspondent to 2 and 4, you must assign a key function that returns the datum instead of the index. The key function is defined by : `myFun = function(datum, index, parent) {...};`.
  - `datum` is the datum bound to the element (or the datum itself, for `myData`)
  - `index` is the index in the group/array
  - `parent` is the parent node (while `this` is the parent element in DOM)

- There is **nothing** called `selection.update()`, because the returned selection of `selection.data(myData)` is already the updated one (and only containing the old html elements). So using `selection` directly will generate the expected outcome. (but there really is something called `update` in the syntax of `selection.join()` method, see below)

- The best way to update data is by calling the `selection.join()` method:

  `NewSelection = selection.join(enter => enter.append('tag').SomthingYouLike[, update => update.SomethingYouLike][, remove => remove.SomethingYouLike)`

  It will perform the desired operation on the `enter()` and updated selection and automatically removed the `exit()`, then merge all of them together and properly reorder them into a new selection.
  
  If you just want to append an element, say `<circle>`, to the `enter()` section, you can pass the tag as a string (instead of a function) to `join()` as the first argument: `NewSelection = selection.join("circle")`.
  
- The `selection.call(myFun(sel[,vargin])[,vargin])` will call `myFun` once with the selection itself as the first argument and `vargin` as other arguments, which will be very useful for chaining method if you want to modify multiple types of elements (e.g. circles and triangles) by the same selection.



### Scaling

- It seems that the `d3.scale()` usage has already been abandoned, so we should use `d3.scaleLinear()` instead. View https://observablehq.com/@d3 for updated reference of D3.



### Drawing

- If you want to label the elements, select the `<text>` tag in svg, then apply the `selection.text()` method, because the latter merely inserts the text between the openning and close tag (which is useless for `<rect>` etc.).

- In order to draw a line, you have to modify the `"d"` attribute of the `"path"` element in svg in the following way: `pathSelection.attr("d", d => myFun(d3.path(),d).toString())` because the d3-based drawing function cannot accept functions as arguments, nor return an object for chaining syntax. The function `myFun` should be written in a canvas-like way and return the path object. For example, to draw an triangle:

  ```javascript
  let myFun = function(myPath, d) {
      myPath.moveTo(x0, y0);
      myPath.lineTo(x1, y1);
      myPath.lineTo(x2, y2);
      myPath.closePath();	
      return myPath;
  }
  ```

  See https://observablehq.com/@d3/d3-path?collection=@d3/d3-path for details.
  
- In order to draw an axis, you need to use `selection.call(d3.axisLeft().scale(yScale).otherFormatting)`. But what if you bind the data to several categories and neede to create multiple axes at a time? You can write in this way:

  ```javascript
  selection.each(function (d, i) {
      d3.select(this).call(  // get a new selection containing only one element
          d3.axisLeft().scale(allYScale[i]).otherFormatting
      );
  })
  ```

  See https://github.com/d3/d3-axis for the detailed discription about axes.

- as for tick formatting: `.tickFormat()` can accept a function as its argument, and pass three arguments to the function: the tick value, the tick index and the parent node. Therefore, if you want to display only the odd (the lowest one is No.0) tick values, you can write in this way:

  ```javascript
  let formatTick = function (val, i) {
      return (i % 2 ? val : null);
  }
  someAxis.tickFormat(formatTick);
  ```



## SVG

- It's not necessary to store svg in a single file. Simply using `<svg></svg>` in html document is enough. For a "complete" svg file see https://www.runoob.com/svg/svg-example.html.
- One important tag in svg is `<g>`, which groups together some elements like `<div>` in html. You can use `YouGSelection.attr("class", "ClassName")` to group together some elements and label them (and update them by `d3.selectAll(".ClassName")`).
- Set `text-anchor` attribute of the `<text>` element to `"middle"` can align the text centered to its `x` coordinate.