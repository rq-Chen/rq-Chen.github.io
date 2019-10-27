/*
    nsfcFun+d.js - d3 visualization of the NSFC funding

    Author: Ruiqi Chen
    Version: 2019/10/27
*/

var plotDis, plotIns, plotPro;

plotIns = function (year = 2018, mainIndex = "Money", maxX, maxY, maxR) {
    // plot the second figure

    // Parameters
    let minX = 0, minY = 0, minR = 0, maxRPix = 40;
    let padding = 50;  // must be larger than maxRPix
    let colormap = function (t) {  // choose a color scheme
        /*single(or pseudo-single)-hue*/
        // return d3.interpolateYlGn(t * 0.8 + 0.2);  // light yellow - dark green

        /*multi-hue*/
        return d3.interpolateYlGnBu(t * 0.8 + 0.2);  // light green - dark blue
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
            // science (maths, chem, bio, geo, med)
            sciProj: +d.sciProj,
            sciMoney: +d.sciMoney,
            // technology and management (indus, cs, mgt)
            techProj: +d.techProj,
            techMoney: +d.techMoney            
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
        console.log(myData);
        // alert(data[0].name);

        // get the plotting area
        let svgW = $("#InsPlot").width();
        let svgH = $("#InsPlot").height();

        // set scale
        let maxDat = [];  // get the max from each column
        for (let i in myData[0]){
            let tmp = myData.map(function (d) {
                return d[i];
            });
            maxDat.push(d3.max(tmp));  // get the i-th column
            // this implementation is ugly and should be updated by
            //   changing maxDat into an object directly
        }

        if (maxX === undefined) {
            maxX = (mainIndex == "Money")?maxDat[5]:maxDat[4];
        }
        if (maxY === undefined) {
            maxY = (mainIndex == "Money")?maxDat[7]:maxDat[6];
        }
        if (maxR === undefined) {  // radius is different from axes
            maxR = (mainIndex == "Money")?maxDat[2]:maxDat[3];
        }
        let xScale = d3.scaleLinear()
            .domain([minX, maxX])
            .range([padding, svgW - padding]);  // leave some padding
        let yScale = d3.scaleLinear()
            .domain([minY, maxY])
            .range([svgH - padding, padding]);  // reverse the y-axis
        let rScale = d3.scaleLinear()
            .domain([minR, maxR])
            .range([0, maxRPix]);  // let the largest radius be 50px

        // binding data
        d3.select("#InsPlot").selectAll("circle")
            .data(myData, function (d) {
                return d.name;  // bind institutions with circles
            })
            .join(
                enter => enter.append("circle")
                    .attr("cx", function (d) {
                        return (mainIndex == "Money")?
                            xScale(d.sciMoney):
                            xScale(d.sciProj);
                    })
                    .attr("cy", function (d) {
                        return (mainIndex == "Money")?
                            yScale(d.techMoney):
                            yScale(d.techProj);
                    })
                    .attr("r", function (d) {
                        return (mainIndex == "Money")?
                            rScale(d.tProj):
                            rScale(d.tMoney);
                    })
                    .attr("fill", function (d) {
                        let tmp = (mainIndex == "Money")?
                            d.sciMoney / maxX:
                            d.sciProj / maxX;
                        let rtmp = 1 - d.number / maxDat[0];
                        return colormap(tmp);  // color by x value
                        // return colormap(rtmp); // by ranking
                    })
                //update => update  // pending
            )
    });
    
};

plotIns();