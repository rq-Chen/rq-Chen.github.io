/*
    nsfcFund.js - d3 visualization of the NSFC funding

    Author: Ruiqi Chen
    Version: 2019/10/27
*/

var plotDis, plotIns, plotPro, getName;

/* utility functions */
getName = (d => d.name);

/* Plotting functions */
plotDis = function (year = 2018, mainIndex = "Money", yToShown) {

    // parameters
    let padding = 40, labelSize = 10, opac = 0.3, tickNum = 10, linePadding = 8;

    let allDeps= [], myData = [];
    d3.csv('data/Dis' + year + '.csv', function (d) {
        let tmp = {
            name: d.name,
            applyProj: +d.applyProj,
            applyMoney: +d.applyMoney,
            allocProj: +d.allocProj,
            allocMoney: +d.allocMoney
            // other property can be computed from them
        };
        if (d.name.endsWith("学部")) {
            myData.push([tmp, []]);
            allDeps.push(tmp);
        } else myData[myData.length - 1][1].push(tmp);
        return tmp;
    }).then(oriData => {

        // get the plotting area
        let svgW = $("#DisPlot").width();
        let svgH = $("#DisPlot").height();

        // select data
        if (yToShown === undefined)
            yToShown = allDeps.map(d => d.name);
        myData = myData.filter(d => {
            return (yToShown.find(p => {return (p == d[0].name);}) !== undefined);
        });
        allDeps = allDeps.filter(d => {
            return (yToShown.find(p => {return (p == d.name);}) !== undefined);
        });

        console.log("new section");
        console.log(myData);  // a tree with two layers
        console.log("finish");

        // set scales
        let xScale = d3.scaleLinear().domain([-0.5, myData.length - 0.5])
            // add 0.5 to put the bars
            .range([padding, svgW - padding]); // position of the axes 
        let yScale;
        if (mainIndex == "Money") {
            let tmp = allDeps.map(d => d.applyMoney);
            yScale = d3.scaleLinear().domain([0, d3.max(tmp)])
                .range([svgH - padding, padding]);
        } else {
            let tmp = allDeps.map(d => d.applyProj);
            yScale = d3.scaleLinear().domain([0, d3.max(tmp)])
                .range([svgH - padding, padding]);
        }
        let allZScale = [];  // 2 for each department (money and projects)
        // also mapping to x-index
        for (let i = 0; i < myData.length; i++) {
            let tmpMoney = myData[i][1].map(d => d.applyMoney);
            let tmpProj = myData[i][1].map(d => d.applyProj);
            let moneyScale = d3.scaleLinear().domain([0, d3.max(tmpMoney)])
                .range([xScale(i), xScale(i - 0.4)]);
            let projScale = d3.scaleLinear().domain([0, d3.max(tmpProj)])
                .range([xScale(i), xScale(i + 0.4)]);
            allZScale.push([moneyScale, projScale]);
        }

        // utility function
        let addRects = function (sel, index) {
            let nDis = sel.data().length;
            let tmpHeight = (mainIndex == "Money")? myData[index][0].applyMoney :
                myData[index][0].applyProj;
            sel.append("rect")
                .attr("class", "money")
                .attr("x", d => allZScale[index][0](d.applyMoney))
                .attr("y", (d, i) => yScale(tmpHeight / nDis * (i + 1)))
                .attr("width", d => {
                    return xScale(index) - allZScale[index][0](d.applyMoney);
                })
                .attr("height", (d, i) => {
                    return yScale(0) - yScale(tmpHeight / nDis);
                })
                .attr("fill", (d,i) => {
                    return d3.schemeCategory10[i % 10];
                })
                .append("title").text(d => {
                    return d.name + "，申请金额：" + d.applyMoney;
                });
            sel.append("rect")
                .attr("class", "allMoney")
                .attr("x", d => allZScale[index][0](d.allocMoney))
                .attr("y", (d, i) => yScale(tmpHeight / nDis * (i + 1)))
                .attr("width", d => {
                    return xScale(index) - allZScale[index][0](d.allocMoney);
                })
                .attr("height", (d, i) => {
                    return yScale(0) - yScale(tmpHeight / nDis);
                })
                .attr("fill", (d,i) => {
                    return d3.schemeCategory10[i % 10];
                })
                .append("title").text(d => {
                    return d.name + "，资助金额：" + d.allocMoney;
                });
            sel.append("rect")
                .attr("class", "project")
                .attr("x", d => allZScale[index][0](d.applyProj))
                .attr("y", (d, i) => yScale(tmpHeight / nDis * (i + 1)))
                .attr("width", d => {
                    return allZScale[index][1](d.applyProj) - xScale(index);
                })
                .attr("height", (d, i) => {
                    return yScale(0) - yScale(tmpHeight / nDis);
                })
                .attr("fill", (d,i) => {
                    return d3.schemeCategory10[i % 10];
                })
                .append("title").text(d => {
                    return d.name + "，申请项目：" + d.applyProj;
                });
            sel.append("rect")
                .attr("class", "allProject")
                .attr("x", d => allZScale[index][0](d.allocProj))
                .attr("y", (d, i) => yScale(tmpHeight / nDis * (i + 1)))
                .attr("width", d => {
                    return allZScale[index][1](d.allocProj) - xScale(index);
                })
                .attr("height", (d, i) => {
                    return yScale(0) - yScale(tmpHeight / nDis);
                })
                .attr("fill", (d,i) => {
                    return d3.schemeCategory10[i % 10];
                })
                .append("title").text(d => {
                    return d.name + "，资助项目：" + d.allocProj;
                });
            // add background and set opacity
            sel.selectAll(".money, .project").call(ent =>
                    ent.clone(true).lower().attr("fill", "white")
                )
                .attr("opacity", opac);
        }
        let formatTick = function (val, i) {
            val = val / 1e6;  // change into million dollars
            if (this.parentNode.nextSibling) {
                if (i % 2)
                    return val.toFixed(1);
                else return null;
            }
            else return "￥" + val.toFixed(1) + " million";
        };

        // axis
        d3.select("#DisPlot").selectAll(".YAxis").remove();
        d3.select("#DisPlot").append("g")
            .attr("class", "YAxis")
            // .attr("transform", "translate(" + xScale(-0.7) + ",0)")
            .call(
                d3.axisRight().scale(yScale).ticks(tickNum)
                    .tickFormat(formatTick)
            ).call(ent => {
                ent.selectAll("line, path").remove();
                // ent.selectAll("text").style("font-family", "monospace")
                ent.selectAll(".tick:nth-child(even)").append("line")
                    .raise()
                    .attr("stroke", "currentColor")
                    .attr("x1", (d, i, nodes) => {
                        let tmp = nodes[i].previousSibling.getBBox();
                        // console.log("tmp: ", tmp, "nodes: ", nodes[i]);
                        return tmp.x + tmp.width + linePadding;
                    })
                    .attr("x2", svgW)
                    .attr("stroke-opacity", opac)
                    .attr("stroke-dasharray", "5,5")
            })
        
        // bind data and plot
        d3.select("#DisPlot").selectAll(".department")
            .data(myData)
            .join(enter => enter.append("g")
                .attr("class", "department")
                .each((d,i,nodes) => { // rects
                    d3.select(nodes[i]).selectAll(".discipline")
                        .data(d[1])
                        .join(
                            ent => ent.append("g")
                                .attr("class", "discipline")
                                .call(addRects, i)                                
                        );
                })
                .call(ent => {  // departments
                    ent.append("line")
                        .attr("x1", (d, i) => xScale(i - 0.45))
                        .attr("y1", d => {
                            let tmp = (mainIndex == "Money"?
                                yScale(d[0].allocMoney) :
                                yScale(d[0].allocProj));
                            return tmp;
                        })
                        .attr("x2", (d, i) => xScale(i + 0.45))
                        .attr("y2", d => {
                            let tmp = (mainIndex == "Money"?
                                yScale(d[0].allocMoney) :
                                yScale(d[0].allocProj));
                            return tmp;
                        })
                        .attr("stroke", "grey")
                        // .attr("stroke-opacity", 0.4)
                        // .attr("stroke-dasharray", [5, 5]);
                    ent.append("line")
                        .attr("x1", (d,i) => xScale(i))
                        .attr("y1", yScale(0))
                        .attr("x2", (d,i) => xScale(i))
                        .attr("y2", d => {
                            tmp = (mainIndex == "Money"? yScale(d[0].applyMoney) :
                                yScale(d[0].applyProj));
                            return tmp;
                        })
                        .attr("stroke", "white")
                        .attr("stroke-opacity", 0.7)
                        .append("title")
                        .text(d => d[0].name);
                    ent.append("text")
                        .attr("x", (d,i) => xScale(i))
                        .attr("y", yScale(0) + labelSize * 1.5)
                        .attr("text-anchor", "middle")
                        .attr("fill", "black")
                        .attr("font-size", labelSize)                        
                        .text(d => d[0].name);
                })
            )
    
    });    
};

plotIns = function (year = 2018, mainIndex = "Money", maxX, maxY, maxR) {
    // plot the second figure

    // Parameters && functions
    // It will be better if we can define them in css, but I don't know how.
    let minX = 0,
        minY = 0,
        minR = 0,
        maxRPix = 40,
        tickNum = 6;
    let padding = 70; // plotting area padding, must be larger than maxRPix
    let textPadding = 5; // between label and shape
    let colormap = function (t) { // choose a color scheme
        /*single(or pseudo-single)-hue*/
        // return d3.interpolateYlGn(t * 0.8 + 0.2);  // light yellow - dark green

        /*multi-hue*/
        return d3.interpolateYlGnBu(t * 0.8 + 0.2); // light green - dark blue
        // return d3.interpolateTurbo(t);  // green-red
        // return d3.interpolateViridis(t);  // purple-yellow, cool
        // return d3.interpolatePlasma(t); // purple-yellow, warm
    };

    d3.csv('data/Ins' + year + '.csv', function (d) {
        return {
            number: +d.number,
            name: d.name,
            // total
            tProj: +d.tProj,
            tMoney: +d.tMoney,
            // science (mth, chm, bio, geo, med)
            sciProj: +d.sciProj,
            sciMoney: +d.sciMoney,
            // engineering and management (eng, cs, mgt)
            engMgtProj: +d.engMgtProj,
            engMgtMoney: +d.engMgtMoney
        };      
    }).then(function (myData) {
        // then() make sure the code is executed after loading data
        // So perform all operations here
        // Syntax: then(onfulfilled[, onrejected]), where onfulfilled(value)
        // accepts the fulfillment value as input.

        // debugging
        // console.log(myData);
        // alert(data[0].name);

        // get the plotting area
        let svgW = $("#InsPlot").width();
        let svgH = $("#InsPlot").height();

        // set scale
        let maxDat = []; // get the max from each column
        for (let i in myData[0]) {
            let tmp = myData.map(function (d) {
                return d[i];
            });
            maxDat.push(d3.max(tmp)); // get the i-th column
            // this implementation is ugly and should be updated by
            //   changing maxDat into an object directly
        }
        if (maxX === undefined) {
            maxX = (mainIndex == "Money") ? maxDat[5] : maxDat[4];
        }
        if (maxY === undefined) {
            maxY = (mainIndex == "Money") ? maxDat[7] : maxDat[6];
        }
        if (maxR === undefined) { // radius is different from axes
            maxR = (mainIndex == "Money") ? maxDat[2] : maxDat[3];
        }
        let xScale = d3.scaleLinear()
            .domain([minX, maxX])
            .range([padding, svgW - padding]); // leave some padding
        let yScale = d3.scaleLinear()
            .domain([minY, maxY])
            .range([svgH - padding, padding]); // reverse the y-axis
        let rScale = d3.scaleLinear()
            .domain([minR, maxR])
            .range([0, maxRPix]); // let the largest radius be 50px

        // utility functions
        let getX = function (d) {
            return (mainIndex == "Money") ?
                xScale(d.sciMoney) :
                xScale(d.sciProj);
        };
        let getY = function (d) {
            return (mainIndex == "Money") ?
                yScale(d.engMgtMoney) :
                yScale(d.engMgtProj);
        };
        let getR = function (d) {
            return (mainIndex == "Money") ?
                rScale(d.tProj) :
                rScale(d.tMoney);
        };
        let formatTick = function (val, i) {
            if (i % 2) return val;
                else return null;            
        };

        // binding data with the circles
        d3.select("#InsPlot").selectAll(".institute")
            .data(myData, getName)
            // bind institutes with groups in the class .institute
            .join(
                enter => enter.append("g")
                .attr("class", "institute")
                .call(function (insti) {
                    insti.append("circle")
                        .attr("cx", getX).attr("cy", getY).attr("r", getR)
                        .attr("fill", function (d) {
                            let tmp = (mainIndex == "Money") ?
                                d.sciMoney / maxX :
                                d.sciProj / maxX;
                            let rtmp = 1 - (d.number - 1) / (maxDat[0] - 1);
                            return colormap(tmp); // color by x value
                            // return colormap(rtmp); // by ranking
                        })
                        .append("title").text(d => {
                            let tmp = ((mainIndex == "Money") ?
                                "总资助项目数：" + d.sciProj :
                                "总资助金额：" + d.sciMoney);
                            return d.name + "，" + tmp;
                        });
                    insti.append("text")
                        .text(getName)
                        .attr("font-size", function (d) {
                            return getR(d) / 3;
                        })
                        .attr("fill", "white")
                        .attr("x", getX)
                        .attr("y", function (d) {
                            return getY(d) + getR(d) / 6;
                            // half the height of a character
                            // the scale is reversed, so "+" means lower
                        })
                        .attr("text-anchor", "middle");
                })
                // , update => update  // pending
            );

        d3.select("#InsPlot").selectAll(".xAxis").remove();
        d3.select("#InsPlot")
            .append("g").attr("class", "xAxis")
            .attr("transform", "translate(0," + (yScale(0) + padding / 4) + ")")
            .call(
                d3.axisBottom().scale(xScale)
                    .ticks(tickNum).tickFormat(formatTick).tickSizeOuter(0)
            );  
        d3.select("#InsPlot")
            .append("g").attr("class", "yAxis")
            .attr("transform", "translate(" + (xScale(0) - padding / 4) + ",0)")
            .call(
                d3.axisLeft().scale(yScale)
                    .ticks(tickNum).tickFormat(formatTick).tickSizeOuter(0)
            );            
    });
};

plotPro = function (year = 2018, axStyle = "linear", yToShown) {

    // parameters
    let padding = 60, labelSize = 10;
    let stWid = 2, stOpc = 0.4, tickSi = 6, tickNum = 5;
    if (yToShown === undefined) yToShown = ["tMoney",
        "mthMoney", "chmMoney", "bioMoney", "geoMoney",
        "engMoney", "csMoney", "mgtMoney", "medMoney"
    ];
    let chgScale = function (d, i, iMax) {
        // this function is used to scale the data so that the line
        //   representing Beijing wiil not be adjacent to the top...
        let midTop = 0.8;  //  the relative height of the middle axis
        let tmpRatio = (1 / midTop - 1) / (iMax / 2);
        // console.log((Math.abs(i - iMax / 2) * tmpRatio + 1));
        return d * (Math.abs(i - iMax / 2) * tmpRatio + 1);
        //  Looks like this
        //  .    .
        //   .  .
        //    .
    };
    let colormap = function (t) {
        // In this section, we want to emphasize the extremes.
        //   So the color should be clear for both the max and the min.
        //   Therefore, we'd better not use scheme like YlGnBu.
        //   But the schemes for all figures should be in harmony, of course.

        /* Diverging */
        return d3.interpolateBrBG(t);
    };

    d3.csv('data/Pro' + year + '.csv', function (d) {
        return {
            // actually it seems that array is more useful than object,
            // but object is more robust when the fields are re-arranged
            number: +d.number,
            name: d.name,
            tProj: +d.tProj,
            tMoney: +d.tMoney,
            mthProj: +d.mthProj,
            mthMoney: +d.mthMoney,
            chmProj: +d.chmProj,
            chmMoney: +d.chmMoney,
            bioProj: +d.bioProj,
            bioMoney: +d.bioMoney,
            geoProj: +d.geoProj,
            geoMoney: +d.geoMoney,
            engProj: +d.engProj,
            engMoney: +d.engMoney,
            csProj: +d.csProj,
            csMoney: +d.csMoney,
            mgtProj: +d.mgtProj,
            mgtMoney: +d.mgtMoney,
            medProj: +d.medProj,
            medMoney: +d.medMoney
        };
    }).then(myData => {

        // console.log("new section");
        // console.log(myData);
        // console.log("finish");

        // get the plotting area
        let svgW = $("#ProPlot").width();
        let svgH = $("#ProPlot").height();

        // set scale
        let xScale = d3.scaleLinear().domain([0, yToShown.length - 1])
            .range([padding, svgW - padding]); // position of the axes
        let allYScale, maxDat, minDat;

        // CAUTION: JS OBJECT ASSIGNMENT IS SHALLOW COPY!!!!
        // Below is the ONLY correct way to create an object with the same keys.
        allYScale = Object.assign({}, myData[0]);
        delete allYScale["name"]; // set a scale for each quantitative attribute
        maxDat = Object.assign({}, allYScale); // get the max from each attribute
        minDat = Object.assign({}, allYScale); // the minimum
        // CAUTION HERE!!!!

        let loopI = 0, iMax = myData.columns.length - 1;
        for (let curr in maxDat) {
            let tmp = myData.map(function (d) {
                return d[curr];
            });
            [minDat[curr], maxDat[curr]] = d3.extent(tmp);
            allYScale[curr] = (axStyle == "linear")?
                d3.scaleLinear():
                d3.scaleSqrt();
                // d3.scaleSymlog();  // symlog allow zero value
            allYScale[curr] = allYScale[curr]
                .domain([minDat[curr],
                        chgScale(maxDat[curr], loopI++, iMax)])
                .range([svgH - padding, padding]);
        }
        delete loopI, iMax;

        // utility functions
        let drawLine = function (d) {
            let myPath = d3.path();
            for (let i = 0; i < yToShown.length; i++) {
                let currX = xScale(i);
                let currY = allYScale[yToShown[i]](d[yToShown[i]]);
                if (i == 0) myPath.moveTo(currX, currY);
                else myPath.lineTo(currX, currY);
                // change the command above to draw curve
            }
            return myPath.toString();
        };
        let formatTick = function (val, i) {
            return (i % 2 ? val: null);
        };

        // bind data and update
        d3.select("#ProPlot").selectAll(".province")
            .data(myData, getName)
            // bind each province with a group in class .province
            .join(enter => enter.append("g")
                .attr("class", "province")
                .call(provin => {
                    provin.append("path")
                        .attr("fill", "none")
                        .attr("stroke-width", stWid)
                        .attr("stroke-opacity", stOpc)
                        .attr("stroke", d =>
                            colormap((d.number - 1) / (maxDat["number"] - 1)))
                        .attr("d", drawLine)
                        .append("title").text(getName);
                })
            )
        d3.select("#ProPlot").selectAll(".axis")
            .data(yToShown, d => d)  // bind each category with a y-axis
            .join(enter => enter.append("g")
                .attr("class", "axis")
                .attr("transform", (d, i) => {
                    return "translate(" + xScale(i) + ",0)";
                })
                // the following code illustrates how to apply a function
                //   to every element of the selection and keep on using
                //   d3 methods
                .each(function (d, i) {
                    d3.select(this).call(
                        d3.axisLeft().scale(allYScale[d])
                            .ticks(tickNum).tickFormat(formatTick)
                            .tickSizeInner(tickSi).tickSizeOuter(0)
                        // creation of axis is a function
                    );
                })
                .call(function (d, i) {                    
                    d3.select("#ProPlot")
                    .selectAll(".tick text") // modify the tick number appearance
                        .clone(true).lower()
                        // Must be "true"! Otherwise the text content will not be
                        //   copied, thus providing no background.
                        // add a background by inserting something under it
                        .attr("fill", "white")
                        .attr("stroke", "white")
                        .attr("stroke-width", 2 * stWid);
                    d3.select("#ProPlot")
                    .selectAll(".axis path, .axis line")
                        // modify the axes and ticks
                        .attr("stroke-dasharray", "5, 5")
                        .attr("stroke-opacity", stOpc);
                })
                .call(g => g.append("text")
                    .text(d => d)
                    .attr("x", 0)
                    .attr("font-size", labelSize)
                    .attr("y", svgH - padding + 1.25 * labelSize)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                )
            )
    });
};

plotDis();
plotIns();
plotPro(2018, "sqrt");