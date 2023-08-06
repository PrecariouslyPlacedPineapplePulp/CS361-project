

function drawChartFromArray(array) {

    var data = new google.visualization.arrayToDataTable(array, false) // false indicates first row in the array are column labels.

    var options = {
        // 'title': title,
        'max-width': 400,
        'max-height': 300
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

// Set a callback to run when the Google Visualization API is loaded.
// google.charts.setOnLoadCallback(drawChart);


export {drawChartFromFile}