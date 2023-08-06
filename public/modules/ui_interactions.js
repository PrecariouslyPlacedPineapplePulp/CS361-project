// UI_INTERACTIONS holds functions that govern the interactions between
// various input elements on the webpage by ensuring that only reasonably
// compatible input elements are shown at once. For example, given a .csv
// file that describes an edge list, the client shall call the functions
// here to hide all input elements that do not pertain to graphs while
// showing all elements that do.


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

function clearCheckboxesByClass(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        var checkboxes = document.getElementsByClassName(classNames[i])

        for (var j = 0; j < checkboxes.length; j++) {
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

function toggleResultPanel() {
    var panel = document.getElementById("results-box-container")

    if (panel) {
        panel.classList.toggle("hidden")
    }
}

function toggleResults(event) {
    document.getElementById("statistics-box-container").classList.toggle("hidden")
    document.getElementById("file-box-container").classList.toggle("hidden")
    // document.getElementById("results-box-container").classList.toggle("hidden")
    toggleResultPanel()
    document.getElementById("customize-title").classList.toggle("hidden")
    document.getElementById("results-title").classList.toggle("hidden")
    if (document.getElementById("apply-button").innerHTML === "Return" ) {
        document.getElementById("apply-button").innerHTML = "Apply" 
    } else {
        document.getElementById("apply-button").innerHTML = "Return" 
    }
}

export { toggleResults, setType, filterStatistics }