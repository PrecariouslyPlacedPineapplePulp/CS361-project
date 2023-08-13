import { toggleResults, setType, filterStatistics } from "./modules/ui_interactions";
import { getCheckbox, getRadioButton } from "./modules/ui_inputs";
import { drawChartFromFile, drawGraphFromFile } from "./modules/visualizer";

// NOTE FOR FUTURE: imports only work if main.handlebars has type="module" when it refers to this script.

// Handlebars.registerPartial('resultPanelEntry')

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

        // use handlebars template to generate the results panel
        resultsPanel(data.stats)

        // call appropriate function for drawing either a graph or a chart, depending on tyoeOfData
        var typeOfData = getRadioButton()
        if (typeOfData !== 'edge-list') {
            drawChartFromFile(document.getElementById("file-input").files[0])
        } else {
            drawGraphFromFile(document.getElementById("file-input").files[0])
        }

        // remove ids of visualization elements after js finishes drawing the graph or chart
        document.getElementById('chart-div').removeAttribute('id')
        document.getElementById('graph').removeAttribute('id')
        
    }).catch(function(err) {
        console.log(err)
    })
}


function resultsPanel(outputStats) {
    var statsDict = {}

    // process the output stats to be compatible with template
    for (var i = 0; i < outputStats.length; i++) {
        statsDict[outputStats[i][0]] = outputStats[i][1]
    }
    
    // generate HTML from handlebars template
    var resultAsHTML = Handlebars.templates.resultPanel({
        stat: statsDict
    })

    // insert the HTML into the main div
    const mainDiv = document.getElementsByClassName('main-panel')[0]
    mainDiv.insertAdjacentHTML('beforeend', resultAsHTML)
}

function handleApplyButton(event) {

    // this function hides the input panels and changes the title and button text
    toggleResults(event)

    // this function adds a new entry to the history panel
    addNewFileEntry(event)

    // calls microservice if user is going to the results page.
    if (event.target.innerHTML === "Return") {  // change "Return" to "Apply" if this if-statement is moved before toggleResults(event)
        callMicroservice(getRadioButton(), getCheckbox())
    }
}

// after loading in google charts, add event listener to the Apply/Return button
google.charts.load('current', {'packages':['corechart']}).then(function () {
    document.getElementById('apply-button').onclick = handleApplyButton
})

// add event listeners to other elements
document.getElementById("statistics-filter").addEventListener("input", filterStatistics)
document.getElementById("file-input").addEventListener("change", checkFile)
// https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.getElementsByName("type-picker").forEach(elem => {
    elem.addEventListener("click", setType)
})