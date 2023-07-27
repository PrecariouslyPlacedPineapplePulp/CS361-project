

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

function hideElementsByClass(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        var targets = document.getElementsByClassName(classNames[i])

        for (var j = 0; j < targets.length; j++) {
            targets[j].classList.add("hidden")
        }
    }
}

function showElementsByClass(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        var targets = document.getElementsByClassName(classNames[i])

        for (var j = 0; j < targets.length; j++) {
            targets[j].classList.remove("hidden")
        }
    }

}

function filterStatistics(event) {
    var type = document.getElementById("statistics-filter").value

    if (type === "Linear") {
        hideElementsByClass([
            "nd-option",
            "graph-option"
        ])
        showElementsByClass(["xy-option"])
    }
    if (type === "Normal Distribution") {
        hideElementsByClass([
            "xy-option",
            "graph-option"
        ])
        showElementsByClass(["nd-option"])
    }
    if (type === "All") {
        showElementsByClass([
            "xy-option",
            "nd-option",
            "graph-option"
        ])
    }
    if (type === "Graph Measures") {
        hideElementsByClass([
            "xy-option",
            "nd-option",
        ])
        showElementsByClass(["graph-option"])
    }
}

function checkFile(event) {
    // https://web.dev/read-files/
    const userFile = event.target.files[0];

    if (userFile.type != "text/csv") {
        alert("Please provide a .csv or .xlsx file")
        document.getElementById("file-input").value = ""
        return
    }
}

function clearCheckboxesByClass(classNames) {
    for (i = 0; i < classNames.length; i++) {
        var checkboxes = document.getElementsByClassName(classNames[i])

        for (j = 0; j < checkboxes.length; j++) {
            checkboxes[j].checked = false
        }
    }
}

// https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
function setType(event) {
    var inputType = event.target.value

    var ndOption = document.getElementById("select-option-nd")
    var graphOption = document.getElementById("select-option-graph")
    var xyOption = document.getElementById("select-option-xy")

    if (inputType === "norm-dist") {
        ndOption.classList.remove("hidden")
        graphOption.classList.add("hidden")
        xyOption.classList.add("hidden")
        hideElementsByClass(["xy-option", "graph-option"])
        showElementsByClass(["nd-option"])
    } else if (inputType === "edge-list") {
        ndOption.classList.add("hidden")
        graphOption.classList.remove("hidden")
        xyOption.classList.add("hidden")
        hideElementsByClass(["nd-option", "xy-option"])
        showElementsByClass(["graph-option"])
    } else if (inputType === "xy-graph") {
        ndOption.classList.add("hidden")
        graphOption.classList.add("hidden")
        xyOption.classList.remove("hidden")
        hideElementsByClass(["nd-option", "graph-option"])
        showElementsByClass(["xy-option"])
    }

    clearCheckboxesByClass(["xy-option", "graph-option", "nd-option", "hp-option"])
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
    if (document.getElementById("apply-button").innerHTML === "Return" ) {
        document.getElementById("apply-button").innerHTML = "Apply" 
    } else {
        document.getElementById("apply-button").innerHTML = "Return" 
    }
}

// https://www.geeksforgeeks.org/how-to-get-all-checked-values-of-checkbox-in-javascript/
function getCheckbox() {
    var checkboxes = document.getElementsByName("stats-checkbox")
    var checkedList = []

    console.log("in function getCheckbox")

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedList.push(checkboxes[i].value)
        }
    }
    // console.log(checkedList)
    return checkedList
}

function getRadioButton() {
    var radioButtons = document.getElementsByName("type-picker")
    
    for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value
        }
    }
}

function requestMicroservice(outputJSON) {
    const reqURL = "http://localhost:9000/"

    fetch(reqURL, {
        method: "POST",
        mode: "cors",
        body: outputJSON,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        result = JSON.stringify({
            fileName: body.name,
            type: body.type,
            stats: body.stats
        })

        // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
        fs.writeFile(`${body.name}-result.json`, result, function(err) {
            if (err) {
                console.log("CLIENT: in writing to JSON: ")
                console.log(err)
            }
        })
    })
}



function handleApplyButton(event) {
    toggleResults(event)
    addNewFileEntry(event)

    if (event.target.innerHTML === "Return") {
        var dataFile = document.getElementById("file-input").files[0]
        var chosenType = getRadioButton()
        var chosenStats = getCheckbox()

        var outputJSON = JSON.stringify({
            fileName: dataFile.name,
            file: dataFile,
            type: chosenType,
            stats: chosenStats
        })

        // for (i = 0; i < array.length)

        console.log(outputJSON)
    }
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