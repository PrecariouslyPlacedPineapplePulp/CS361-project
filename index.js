

// CHART SHENANIGANS

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);

  // Set chart options
  var options = {'title':'How Much Pizza I Ate Last Night',
                 'max-width':400,
                 'max-height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

// NON-CHART SHENANIGANS

function hideElementsByClass(className) {
    var targets = document.getElementsByClassName(className)

    for (var i = 0; i < targets.length; i++) {
        targets[i].classList.add("hidden")
    }
}

function showElementsByClass(className) {
    var targets = document.getElementsByClassName(className)

    for (var i = 0; i < targets.length; i++) {
        targets[i].classList.remove("hidden")
    }
}

function filterStatistics(event) {
    var type = document.getElementById("statistics-filter").value
    console.log(type)

    if (type === "Hypothesis Testing") {
        hideElementsByClass("generic-option")
        hideElementsByClass("generic-option-label")
        hideElementsByClass("nd-option")
        hideElementsByClass("nd-option-label")
        showElementsByClass("hp-option")
        showElementsByClass("hp-option-label")
    }
    if (type == "Normal Distribution") {
        hideElementsByClass("generic-option")
        hideElementsByClass("generic-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        hideElementsByClass("hp-option")
        hideElementsByClass("hp-option-label")
    }
    if (type == "All") {
        showElementsByClass("generic-option")
        showElementsByClass("generic-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        showElementsByClass("hp-option")
        showElementsByClass("hp-option-label")
    }
}

function toggleResults(event) {
    document.getElementById("statistics-box-container").classList.toggle("hidden")
    document.getElementById("file-box-container").classList.toggle("hidden")
    document.getElementById("results-box-container").classList.toggle("hidden")
    document.getElementById("customize-title").classList.toggle("hidden")
    document.getElementById("results-title").classList.toggle("hidden")
    document.getElementById("apply-button").innerHTML = "Return"    
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


document.getElementById("statistics-filter").addEventListener("input", filterStatistics);
document.getElementById("apply-button").addEventListener("click", toggleResults)