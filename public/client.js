import { toggleResults, setType, filterStatistics } from "./modules/ui_interactions";
import { getCheckbox, getRadioButton } from "./modules/ui_inputs";
import { drawChartFromFile } from "./modules/process_charts";

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
        // fs.writeFile(`${body.name}-result.json`, result, function(err) {
        //     if (err) {
        //         console.log("CLIENT: in writing to JSON: ")
        //         console.log(err)
        //     }
        // }) NOT YET: only implement if there is enough time left.
    })
}

function sampleOutput() {
    return [
        ['stdDev', 1],
        ['var', 1],
        ['mean', 1]
    ]
}


function resultsPanel(outputStats) {

    console.log(outputStats[0][0])
    var statsDict = {}

    // process the output stats to be compatible with template
    for (var i = 0; i < outputStats.length; i++) {
        statsDict[outputStats[i][0]] = outputStats[i][1]
    }

    console.log(statsDict)
    
    var resultAsHTML = Handlebars.templates.resultPanel({
        chart_id: "chart_div",
        stat: statsDict
    })

    const mainDiv = document.getElementsByClassName('main-panel')[0]
    mainDiv.insertAdjacentHTML('beforeend', resultAsHTML)
}

function getInputsAsJSON() {
    var dataFile = document.getElementById("file-input").files[0]
    var chosenType = getRadioButton()
    var chosenStats = getCheckbox()

    return JSON.stringify({
        fileName: dataFile.name,
        file: dataFile,
        type: chosenType,
        stats: chosenStats
    })
}



function handleApplyButton(event) {
    toggleResults(event)
    addNewFileEntry(event)

    if (event.target.innerHTML === "Return") {
        // inputs = getInputsAsJSON()
        
        var stats = sampleOutput()
        console.log(stats[0])
        resultsPanel(stats)

        var typeOfData = getRadioButton()
        if (typeOfData !== 'edge-list') {
            drawChartFromFile(document.getElementById("file-input").files[0])
        }
    }
}

google.charts.load('current', {'packages':['corechart']}).then(function () {
    document.getElementById('apply-button').onclick = handleApplyButton
})

document.getElementById("statistics-filter").addEventListener("input", filterStatistics)
// document.getElementById("apply-button").addEventListener("click", handleApplyButton)
// document.getElementById("file-input").addEventListener("input", checkFile)
document.getElementById("file-input").addEventListener("change", checkFile)
// https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.getElementsByName("type-picker").forEach(elem => {
    elem.addEventListener("click", setType)
})