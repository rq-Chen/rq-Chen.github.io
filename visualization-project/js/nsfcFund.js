/*
    nsfcFund.js - d3 visualization of the NSFC funding

    Author: Ruiqi Chen
    Version: 2019/10/27
*/

var plotDis, plotIns, plotPro, getName;

/* utility functions */
getName = (d => d.name);

/* Plotting functions */
plotIns = function (year = 2018, mainIndex = "Money", maxX, maxY, maxR) {
    // plot the second figure

    // Parameters && functions
    // It will be better if we can define them in css, but I don't know how.
    let minX = 0,
        minY = 0,
        minR = 0,
        maxRPix = 40;
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
        // return {  // change the '.csv' above to 'All.csv' when using this block
        //     序号 : +d.序号,
        //     单位名称 : d.单位名称,
        //     合计项数 : +d.合计项数,
        //     合计金额 : +d.合计金额,
        //     数理科学部项数 : +d.数理科学部项数,
        //     数理科学部金额 : +d.数理科学部金额,
        //     化学科学部项数 : +d.化学科学部项数,
        //     化学科学部金额 : +d.化学科学部金额,
        //     生命科学部项数 : +d.生命科学部项数,
        //     生命科学部金额 : +d.生命科学部金额,
        //     地球科学部项数 : +d.地球科学部项数,
        //     地球科学部金额 : +d.地球科学部金额,
        //     工程与材料科学部项数 : +d.工程与材料科学部项数,
        //     工程与材料科学部金额 : +d.工程与材料科学部金额,
        //     信息科学部项数 : +d.信息科学部项数,
        //     信息科学部金额 : +d.信息科学部金额,
        //     管理科学部项数 : +d.管理科学部项数,
        //     管理科学部金额 : +d.管理科学部金额,
        //     医学科学部项数 : +d.医学科学部项数,
        //     医学科学部金额 : +d.医学科学部金额,
        //     科学学科项数 : +d.科学学科项数,
        //     科学学科金额 : +d.科学学科金额,
        //     工程管理学科项数 : +d.工程管理学科项数,
        //     工程管理学科金额 : +d.工程管理学科金额
        // };        
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
    });

};

plotPro = function (year = 2018, axStyle = "linear", yToShown) {

    // parameters
    let padding = 60;
    let stWid = 2,
        stOpc = 0.4;
    if (yToShown === undefined) yToShown = ["tMoney",
        "mthMoney", "chmMoney", "bioMoney", "geoMoney",
        "engMoney", "csMoney", "mgtMoney", "medMoney"
    ];
    var colormap = function (t) {
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

        // CAUTION: JS OBJECT ASSIGNMENT IS DEEP COPY!!!!
        // Below is the ONLY correct way to create an object with the same keys.
        allYScale = Object.assign({}, myData[0]);
        delete allYScale["name"]; // set a scale for each quantitative attribute
        maxDat = Object.assign({}, allYScale); // get the max from each attribute
        minDat = Object.assign({}, allYScale); // the minimum
        // CAUTION HERE!!!!

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
                .domain([minDat[curr], maxDat[curr]])
                .range([svgH - padding, padding]);
        }

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
                    );
                })
            )
    });
};

plotIns();
plotPro(2018, "sqrt");