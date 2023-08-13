import { toggleResults, setType, filterStatistics, hideResultPanels, toggleResultForFile, removeResultPanel } from "./modules/ui_interactions";
import { getCheckbox, getRadioButton } from "./modules/ui_inputs";
import { drawChartFromFile, drawGraphFromFile } from "./modules/visualizer";

// NOTE FOR FUTURE: imports only work if main.handlebars has type="module" when it refers to this script.

// Handlebars.registerPartial('resultPanelEntry')

// this list keeps track of the names of files that the user has inputted and saved in the history panel
var fileEntryList = []

function checkFile(event) {
    // https://web.dev/read-files/
    const userFile = event.target.files[0];

    if (userFile.type != "text/csv") {
        alert("Please provide a .csv file")
        document.getElementById("file-input").value = ""
        return
    }
}

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

// https://observablehq.com/@danyx/lists-of-items-with-add-delete-buttons#
function addNewFileEntry(entryName) {
    var index = fileEntryList.length

    fileEntryList.push(entryName)

    // generate label text for the entry
    var entryText = document.createElement("p")
    entryText.innerText = fileEntryList[index]
    entryText.addEventListener("click", toggleResultForFile)
    
    // generate trash button for the entry
    var removeButton = document.createElement("a")
    removeButton.innerText = "🗑"
    removeButton.addEventListener("click", removeFileEntry)

    // put elements in a div
    var entryDiv = document.createElement("div")
    entryDiv.classList.add("history-entry-container")
    entryDiv.appendChild(entryText)
    entryDiv.appendChild(removeButton)
    
    // append div to the history panel's content div
    document.getElementById("history-panel-contents").appendChild(entryDiv)
}


async function handleServiceResponse(data, dataFile) {
    // create unique name for file entry
    var entryName = dataFile.name
    if (fileEntryList.includes(entryName)) {
        // if a duplicate exists, append ' copy0' to the file name
        entryName = entryName.concat('(copy1)')
        var i = 2
        // if a duplicate still exists, replace ' copy0' with ' copy' + i, incrementing i until unique name is found
        while (fileEntryList.includes(entryName)) {
            entryName = entryName.slice(0, -2) + i + ')'
            i++
        }
    }

    console.log(data.stats)
    // call function to generate the results panel
    generateResultsPanel(data.stats, entryName)

    // this function adds a new entry to the history panel
    addNewFileEntry(entryName)
}

function callMicroservice(inputType, inputStats) {
    const reqURL= "http://localhost:5000/"

    var dataFile = document.getElementById('file-input').files[0]

    // fetch() sends HTTP request to reqURL
    fetch(reqURL, {

        // these are the contents of the HTTP request, in accordance with the communication contract
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            file: dataFile.name,
            type: inputType,
            stats: inputStats
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


function generateResultsPanel(outputStats, fileName) {
    var statsDict = {}

    // process the output stats to be compatible with template
    for (var i = 0; i < outputStats.length; i++) {
        statsDict[outputStats[i][0]] = outputStats[i][1]
    }
    
    // generate HTML from handlebars template
    var resultAsHTML = Handlebars.templates.resultPanel({
        fname: fileName,
        stat: statsDict
    })

    // insert the HTML into the main div
    const mainDiv = document.getElementsByClassName('main-panel')[0]
    mainDiv.insertAdjacentHTML('beforeend', resultAsHTML)

    // call appropriate function for drawing either a graph or a chart, depending on tyoeOfData
    var typeOfData = getRadioButton()
    if (typeOfData !== 'edge-list') {
        drawChartFromFile(document.getElementById("file-input").files[0])
    } else {
        drawGraphFromFile(document.getElementById("file-input").files[0])
    }
}

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
// https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.getElementsByName("type-picker").forEach(elem => {
    elem.addEventListener("click", setType)
})