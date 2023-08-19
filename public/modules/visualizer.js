// VISUALIZER.JS holds functions for drawing charts and graphs, as well as
// functions for processing data from a csv file into a form compatible with
// the d3 library for drawing graphs and google charts


// FUNCTION DESCRIPTION:
// removes the unique IDs of the divs that hold visualizations. These IDs are
// used to identify the div that a newly-created graph or chart will occupy, so
// old divs must have these IDs removed. 
function removeIdentifiers() {
    document.getElementById('chart-div').removeAttribute('id')
    document.getElementById('graph').removeAttribute('id')
}


// FUNCTION DESCRIPTION:
// uses Google Charts to draw a bar graph from an array. Called in the 
// function drawChartFromFile
function drawChartFromArray(array) {
    var data = new google.visualization.arrayToDataTable(array, false) // false indicates first row in the array are column labels.
    var options = {'max-width': 500, 'max-height': 300}
    var chart = new google.visualization.BarChart(document.getElementById('chart-div'))
    chart.draw(data, options)

    removeIdentifiers()
}


// FUNCTION DESCRIPTION:
// called in drawChartFromFile. Takes an array of rows of data from
// a table and processes it to be compatible with drawChartFromArray
function parseFileToArray(fileContentArray, tableContent) {
    for (var line = 0; line < fileContentArray.length - 1; line++) {

        var cellData = fileContentArray[line].split(',')[0]

        if (line === 0) {
            tableContent.push(['index', cellData])
        } else {
            tableContent.push([line, Number(cellData)])
        }
    }
}


// FUNCTION DESCRIPTION:
// This function reads the contents of a CSV file and formats it into a list of lists,
// Each element of the outer list contains two values in this format [<index number>, <cell value>]
// where cell values are the values in the CSV file. Only the first column is read.
function drawChartFromFile(file) {
    var tableContent = []
    var reader = new FileReader()
    reader.onload = function(event) {

        // pass file contents to parseFileToArray where each element is a line in the csv
        parseFileToArray(this.result.split(/\r\n|\n/), tableContent)
        
        drawChartFromArray(tableContent)
    }
    reader.readAsText(file)
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});


// FUNCTION DESCRIPTION:
// helper for function drawGraphFromObject.
// appends an svg element to the div with id 'graph' and returns it
function _svg(width, height, margin) {
    return (d3.select('#graph')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'))
}


// FUNCTION DESCRIPTION:
// helper for function drawGraphFromObject.
// adds lines as specified in dataObj to the svg and returns it
function _link(svg, dataObj) {
    return (svg
        .selectAll('line')
        .data(dataObj.links)
        .enter()
        .append('line')
        .style('stroke', '#aaa'))
}


// FUNCTION DESCRIPTION:
// helper for function drawGraphFromObject.
// adds nodes as specified in dataObj to the svg and returns it
function _node(svg, dataObj) {
    return (svg
        .selectAll('circle')
        .data(dataObj.nodes)
        .enter()
        .append('circle')
        .attr('r', 15)
        .style('fill', '#69b3a2'))
}


// FUNCTION DESCRIPTION:
// helper for function drawGraphFromObject.
// sets parameters for drawing the graph
function _simulation(dataObj, width, height) {
    return (d3.forceSimulation(dataObj.nodes)
    .force('link', d3.forceLink()
        .id(function(d) {return d.id;})
        .links(dataObj.links)
    )
    .force('charge', d3.forceManyBody().strength(-350))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('end', ticked))
}


// FUNCTION DESCRIPTION:
// draws a graph at div with id 'graph' from a JS object created
// in the function drawGraphFromFile.
// REFERENCES:
// https://d3-graph-gallery.com/graph/network_basic.html
// https://binyamin.medium.com/d3-select-selectall-data-enter-and-exit-f0e4f0d3e1d0
function drawGraphFromObject(dataObj) {
    var margin = {top:50, right:60, bottom:10, left:40},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom
    var svg = _svg(width, height, margin)
    var link = _link(svg, dataObj)
    var node = _node(svg, dataObj)
    var simulation = d3.forceSimulation(dataObj.nodes)
        .force('link', d3.forceLink()
            .id(function(d) {return d.id;})
            .links(dataObj.links)
        )
        .force('charge', d3.forceManyBody().strength(-350))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('end', ticked)

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x+6; })
            .attr("cy", function(d) { return d.y-6; });
    }

    removeIdentifiers()

}


// FUNCTION DESCRIPTION:
// helper function for parseFileToOBject.
// Makes a JS object of the source and target nodes
// of an edge, saves it into graphEdges, and returns it
function _edge(fileContentArray, line, graphEdges) {
    var edge = {
        'source': Number(fileContentArray[line].split(',')[0]),
        'target': Number(fileContentArray[line].split(',')[1])
    }
    graphEdges.push(edge)
    return edge
}


// FUNCTION DESCRIPTION:
// helper function for parseFileToOBject.
// takes an edge made from the function _edge and saves
// its source into graphNodes if it was not there already
function _nodeSource(edge, graphNodes, visited) {
    if (!visited.includes(edge.source)) {
        graphNodes.push({
            'id': edge.source
        })
        visited.push(edge.source)
    }
}


// FUNCTION DESCRIPTION:
// helper function for parseFileToOBject.
// takes an edge made from the function _edge and saves
// its target into graphNodes if it was not there already
function _nodeTarget(edge, graphNodes, visited) {
    if (!visited.includes(edge.target)) {
        graphNodes.push({
            'id': edge.target
        })
        visited.push(edge.target)
    }
}


// FUNCTION DESCRIPTION:
// called in the function drawGraphFromFile. Takes an array of file contents
// of an edge list and saves it into a list of edges and a list of nodes
function parseFileToObject(fileContentArray, graphEdges, graphNodes) {
    var visited = []

    for (var line = 1; line < fileContentArray.length - 1; line++) {

        var edge = _edge(fileContentArray, line, graphEdges)

        _nodeSource(edge, graphNodes, visited)
        _nodeTarget(edge, graphNodes, visited)
    }
}


// FUNCTION DESCRIPTION:
// given a file object, draws a graph in the div with ID 'graph'
function drawGraphFromFile(file) {
    var reader = new FileReader()
    var graphEdges = []
    var graphNodes = []

    reader.onload = function(event) {
        parseFileToObject(this.result.split(/\r\n|\n/), graphEdges, graphNodes)
        drawGraphFromObject({'nodes': graphNodes,'links': graphEdges})
    }
    reader.readAsText(file)
}


export {drawChartFromFile, drawGraphFromFile}