

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

var fileEntryList = []

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
        hideElementsByClass("xy-option")
        hideElementsByClass("xy-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        showElementsByClass("hp-option")
        showElementsByClass("hp-option-label")
        hideElementsByClass("graph-option")
        hideElementsByClass("graph-option-label")
    }
    if (type === "Normal Distribution") {
        hideElementsByClass("xy-option")
        hideElementsByClass("xy-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        hideElementsByClass("hp-option")
        hideElementsByClass("hp-option-label")
        hideElementsByClass("graph-option")
        hideElementsByClass("graph-option-label")
    }
    if (type === "All") {
        showElementsByClass("xy-option")
        showElementsByClass("xy-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        showElementsByClass("hp-option")
        showElementsByClass("hp-option-label")
        showElementsByClass("graph-option")
        showElementsByClass("graph-option-label")
    }
    if (type === "Graph Measures") {
        hideElementsByClass("xy-option")
        hideElementsByClass("xy-option-label")
        hideElementsByClass("nd-option")
        hideElementsByClass("nd-option-label")
        hideElementsByClass("hp-option")
        hideElementsByClass("hp-option-label")
        showElementsByClass("graph-option")
        showElementsByClass("graph-option-label")
    }
}

function checkFile(event) {
    // https://web.dev/read-files/
    const userFile = event.target.files[0];
    console.log(userFile.type);

    if (userFile.type != "text/csv") {
        alert("Please provide a .csv or .xlsx file")
        document.getElementById("file-input").value = ""
        return
    }
}

// https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
function setType(event) {
    var inputType = event.target.value
    console.log(inputType)

    var htOption = document.getElementById("select-option-ht")
    var ndOption = document.getElementById("select-option-nd")
    var graphOption = document.getElementById("select-option-graph")

    if (inputType === "norm-dist") {
        htOption.classList.remove("hidden")
        ndOption.classList.remove("hidden")
        graphOption.classList.add("hidden")
    } else if (inputType === "edge-list") {
        htOption.classList.add("hidden")
        ndOption.classList.add("hidden")
        graphOption.classList.remove("hidden")
    }
}

function removeFileEntry(event) {
    var entryDiv = event.target.parentElement
    const entryFileName = entryDiv.children[0].innerText
    entryDiv.remove()

    const index = fileEntryList.indexOf(entryFileName)
    fileEntryList.splice(index, 1)
}

// https://observablehq.com/@danyx/lists-of-items-with-add-delete-buttons#
function addNewFileEntry(event) {
    var index = fileEntryList.length
    var newFileName = document.getElementById("file-input").files[0].name
    if (!(fileEntryList.includes(newFileName))) {
        fileEntryList.push(newFileName)

        var entryText = document.createElement("p")
        entryText.innerText = fileEntryList[index]
    
        fileEntryList.push
    
        var removeButton = document.createElement("a")
        // removeButton.setAttribute("href", "#")
        removeButton.innerText = "🗑"
        removeButton.addEventListener("click", removeFileEntry)
        var entryDiv = document.createElement("div")
        entryDiv.classList.add("history-entry-container")
        entryDiv.appendChild(entryText)
        entryDiv.appendChild(removeButton)
    
        document.getElementById("history-panel-contents").appendChild(entryDiv)  
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

function handleApplyButton(event) {
    toggleResults(event)
    addNewFileEntry(event)
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


document.getElementById("statistics-filter").addEventListener("input", filterStatistics)
document.getElementById("apply-button").addEventListener("click", handleApplyButton)
// document.getElementById("file-input").addEventListener("input", checkFile)
document.getElementById("file-input").addEventListener("change", checkFile)
// https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.getElementsByName("type-picker").forEach(elem => {
    elem.addEventListener("click", setType)
})