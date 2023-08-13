

function drawChartFromArray(array) {

    var data = new google.visualization.arrayToDataTable(array, false) // false indicates first row in the array are column labels.

    var options = {
        // 'title': title,
        'max-width': 500,
        'max-height': 300,
    }

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'))
    chart.draw(data, options)
}


// This function reads the contents of a CSV file and formats it into a list of lists,
// Each element of the outer list contains two values in this format [<index number>, <cell value>]
// where cell values are the values in the CSV file. Only the first column is read.
function drawChartFromFile(file) {

    var tableContent = []

    var reader = new FileReader()
    // reader.onload = () => callback(null, reader.result)
    reader.onload = function(event) {
        var fileContentArray = this.result.split(/\r\n|\n/) // regular expression
        for (var line = 0; line < fileContentArray.length - 1; line++) {

            var cellData = fileContentArray[line].split(',')[0]

            if (line === 0) {
                tableContent.push(['index', cellData])
            } else {
                tableContent.push([line, Number(cellData)])
            }
        }
        
        drawChartFromArray(tableContent)
    }
    reader.readAsText(file)

    // return tableContent
    // NOTE: access to tableContent elements outside of onload is impossible, however printing
    // tableContent is still possible. Unsure why.
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});


// https://d3-graph-gallery.com/graph/network_basic.html
// https://binyamin.medium.com/d3-select-selectall-data-enter-and-exit-f0e4f0d3e1d0
function drawGraphFromObject(dataObj) {
    var margin = {top:50, right:60, bottom:10, left:40},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom

    var svg = d3.select('#graph')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var link = svg
        .selectAll('line')
        .data(dataObj.links)
        .enter()
        .append('line')
        .style('stroke', '#aaa')

    var node = svg
        .selectAll('circle')
        .data(dataObj.nodes)
        .enter()
        .append('circle')
        .attr('r', 15)
        .style('fill', '#69b3a2')

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

}

function drawGraphFromFile(file) {
    var reader = new FileReader()

    var graphEdges = []
    var graphNodes = []
    var visited = []

    reader.onload = function(event) {
        var fileContentArray = this.result.split(/\r\n|\n/) // regular expression
        for (var line = 0; line < fileContentArray.length - 1; line++) {

            if (line === 0) {
                continue
            }

            var edge = {
                'source': Number(fileContentArray[line].split(',')[0]),
                'target': Number(fileContentArray[line].split(',')[1])
            }
            graphEdges.push(edge)

            if (!visited.includes(edge.source)) {
                graphNodes.push({
                    'id': edge.source
                })
                visited.push(edge.source)
                // console.log('source:', edge.source, 'visited:', visited)
            }
            if (!visited.includes(edge.target)) {
                graphNodes.push({
                    'id': edge.target
                })
                visited.push(edge.target)
                // console.log('target:', edge.target, 'visited:', visited)
            }
        }

        drawGraphFromObject({
            'nodes': graphNodes,
            'links': graphEdges
        })
    }
    reader.readAsText(file)
}


export {drawChartFromFile, drawGraphFromFile}