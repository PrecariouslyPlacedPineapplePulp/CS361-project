import { toggleResults, setType, filterStatistics, hideResultPanels, toggleResultForFile, removeResultPanel } from "./modules/ui_interactions";
import { getCheckbox, getRadioButton } from "./modules/ui_inputs";
import { drawChartFromFile, drawGraphFromFile } from "./modules/visualizer";

// this list keeps track of the names of files that the user has inputted and saved in the history panel
var fileEntryList = []


// FUNCTION DESCRIPTION: 
// checks if the file that the user inputted is a csv.
// If not, clears the input and notifies the user with a pop-up.
function checkFile(event) {
    // https://web.dev/read-files/
    const userFile = event.target.files[0];

    if (userFile.type != "text/csv") {
        alert("Please provide a .csv file")
        document.getElementById("file-input").value = ""
        return
    }
}


// FUNCTION DESCRIPTION:
// callback for when the user clicks on trash buttons in the history panel.
// Removes the history entry and its associated result panel.
function removeFileEntry(event) {

    // get the name stored in the entry's text element
    var entryDiv = event.target.parentElement
    const entryFileName = entryDiv.children[0].innerText

    // remove that name from the entry list 
    const index = fileEntryList.indexOf(entryFileName)
    fileEntryList.splice(index, 1)

    // delete associated elements
    removeResultPanel(entryFileName)
    entryDiv.remove()
}


// FUNCTION DESCRIPTION:
// a helper function used in addNewFileEntry that
// generates label text for a new file entry
// in the history panel.
function _entryText() {
    var index = fileEntryList.length
    var entryText = document.createElement("p")
    entryText.innerText = fileEntryList[index - 1]
    entryText.addEventListener("click", toggleResultForFile)
    return entryText
}


// FUNCTION DESCRIPTION:
// a helper function used in addNewFileEntry that
// returns an HTML element for a new trash button
function _removeButton() {
    var removeButton = document.createElement("a")
    removeButton.innerText = "🗑"
    removeButton.addEventListener("click", removeFileEntry)
    return removeButton
}


// FUNCTION DESCRIPTION:
// a helper function used in addNewFileEntry that
// returns an HTML element for the outer div of a new history
// panel entry
function _historyEntryContainer(entryText, removeButton) {
    // put elements in a div
    var entryDiv = document.createElement("div")
    entryDiv.classList.add("history-entry-container")
    entryDiv.appendChild(entryText)
    entryDiv.appendChild(removeButton)
    return entryDiv
}


// FUNCTION DESCRIPTION:
// takes a string as a paramter and adds an entry to the history panel
// with the string as its label.
// REFERENCES:
// https://observablehq.com/@danyx/lists-of-items-with-add-delete-buttons#
function addNewFileEntry(entryName) {
    fileEntryList.push(entryName)
    var entryText = _entryText()
    var removeButton = _removeButton()
    var entryDiv = _historyEntryContainer(entryText, removeButton)
    document.getElementById("history-panel-contents").appendChild(entryDiv)
}


// FUNCTION DESCRIPTION:
// if fileName already exists, adds '(copy#)' to the name to make it unique,
// where # is an int indicating that the current name is the #th copy.
function generateFileEntryName(fileName) {
    if (fileEntryList.includes(fileName)) {
        // if a duplicate exists, append ' copy0' to the file name
        fileName = fileName.concat('(copy1)')
        var i = 2
        // if a duplicate still exists, replace ' copy0' with ' copy' + i, incrementing i until unique name is found
        while (fileEntryList.includes(fileName)) {
            fileName = fileName.slice(0, -2) + i + ')'
            i++
        }
    }
    return fileName
}


// FUNCTION DESCRIPTION:
// Takes the response of the microservice and the user's inputted file,
// and calls other functions to process the data.
function handleServiceResponse(data, dataFile) {
    const entryName = generateFileEntryName(dataFile.name)
    generateResultsPanel(data.stats, entryName)
    addNewFileEntry(entryName)
}

// FUNCTION DESCRIPTION:
// sends an HTTP request to the microservice and gets the response back
function callMicroservice(inputType, inputStats) {
    var dataFile = document.getElementById('file-input').files[0]

    fetch("http://localhost:5000/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            file: dataFile.name,    // this is the file name
            type: inputType,        // this is either 'norm-dist', 'edge-list', or 'xy-graph'
            stats: inputStats       // these are the stats and measures the user has requested
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        handleServiceResponse(data, dataFile)
    }).catch(function(err) {
        console.log(err)
    })
}

// FUNCTION DESCRIPTION:
// calls a function from visualizer.js to draw a chart or a graph depending
// on what kind of data the user inputted.
function callVisualizer() {
    var typeOfData = getRadioButton()
    if (typeOfData !== 'edge-list') {
        drawChartFromFile(document.getElementById("file-input").files[0])
    } else {
        drawGraphFromFile(document.getElementById("file-input").files[0])
    }
}


// FUNCTION DESCRIPTION:
// helper function for generateResultsPanel that generates the HTML
// for a result panel and inserts it into the main div
function _resultPanel(fileName, statsDict) {
    // generate HTML from handlebars template
    var resultAsHTML = Handlebars.templates.resultPanel({
        fname: fileName,
        stat: statsDict
    })

    // insert the HTML into the main div
    const mainDiv = document.getElementsByClassName('main-panel')[0]
    mainDiv.insertAdjacentHTML('beforeend', resultAsHTML)
}


// FUNCTION DESCRIPTION:
// adds a result panel to the main div and populates it with a visualization
// (graph or chart) and summary stats of the user's data.
function generateResultsPanel(outputStats, fileName) {
    var statsDict = {}

    // process the output stats to be compatible with template
    for (var i = 0; i < outputStats.length; i++) {
        statsDict[outputStats[i][0]] = outputStats[i][1]
    }
    
    _resultPanel(fileName, statsDict)
    callVisualizer()
}


// FUNCTION DESCRIPTION:
// depending on the state of the big special button, either
// calls the microservice or goes back to the customization page.
function handleApplyButton(event) {

    // this function hides the input panels and changes the title and button text
    toggleResults()

    // calls microservice if user is going to the results page.
    if (event.target.innerHTML === "Return") {  // change "Return" to "Apply" if this if-statement is moved before toggleResults(event)
        callMicroservice(getRadioButton(), getCheckbox())
    } else {
        hideResultPanels()
    }
}

// after loading in google charts, add event listener to the Apply/Return button
google.charts.load('current', {'packages':['corechart']}).then(function () {
    document.getElementById('apply-button').addEventListener('click', handleApplyButton)
})

// add event listeners to other elements
document.getElementById("statistics-filter").addEventListener("input", filterStatistics)
document.getElementById("file-input").addEventListener("change", checkFile)
document.getElementsByName("type-picker").forEach(elem => {
    elem.addEventListener("click", setType)
})