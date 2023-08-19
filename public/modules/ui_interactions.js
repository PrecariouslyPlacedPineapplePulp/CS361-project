// UI_INTERACTIONS holds functions that govern the interactions between
// various input elements on the webpage by ensuring that only reasonably
// compatible input elements are shown at once. For example, given a .csv
// file that describes an edge list, the client shall call the functions
// here to hide all input elements that do not pertain to graphs while
// showing all elements that do.


// FUNCTION DESCRIPTION:
// adds the 'hidden' class to each element belonging to a class listed
// in the array classNames
function hideElementsByClass(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        var targets = document.getElementsByClassName(classNames[i])

        for (var j = 0; j < targets.length; j++) {
            targets[j].classList.add("hidden")
        }
    }
}


// FUNCTION DESCRIPTION:
// removes the 'hidden' class to each element belonging to a class listed
// in the array classNames
function showElementsByClass(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        var targets = document.getElementsByClassName(classNames[i])

        for (var j = 0; j < targets.length; j++) {
            targets[j].classList.remove("hidden")
        }
    }

}


// FUNCTION DESCRIPTION:
// helper function for filterStatistics that shows and hides
// elements of given class names
function _filterTargetClasses(hideTargetClasses, showTargetClass) {
    hideElementsByClass(hideTargetClasses)
    showElementsByClass(showTargetClass)
}


// FUNCTION DESCRIPTION:
// make sure only options that are relevant to the user's selected category
// of statistical measures show up in the statistics panel
function filterStatistics(event) {
    var type = document.getElementById("statistics-filter").value

    if (type === "Linear") {
        _filerOptions(['nd-option', 'graph-option'], ['xy-option'])
    }
    if (type === "Normal Distribution") {
        _filterTargetClasses(['xy-option', 'graph-option'], ['nd-option'])
    }
    if (type === "All") {
        _filterTargetClasses([], ['xy-option', 'nd-option', 'graph-option'])
    }
    if (type === "Graph Measures") {
        _filterTargetClasses(['xy-option', 'nd-option'], ['graph-option'])
    }
}


// FUNCTION DESCRIPTION:
// clears every checkbox that is a member of a class
// listed in classNames
function clearCheckboxesByClass(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        var checkboxes = document.getElementsByClassName(classNames[i])

        for (var j = 0; j < checkboxes.length; j++) {
            checkboxes[j].checked = false
        }
    }
}


// FUNCTION DESCRIPTION:
// adds the 'hidden' class to every element with an ID
// listed in elemIDs
function hideElementsById(elemIDs) {
    for (var i = 0; i < elemIDs; i++) {
        var elem = document.getElementById(elemIDs[i])
        elem.classList.add('hidden')
    }
}


// FUNCTION DESCRIPTION:
// removes the 'hidden' class from every element with an ID
// listed in elemIDs
function showElementsById(elemIDs) {
    for (var i = 0; i < elemIDs; i++) {
        var elem = document.getElementById(elemIDs[i])
        elem.classList.remove('hidden')
    }
}


// FUNCTION DESCRIPTION:
// helper function for setType that makes sure only options relevant
// to the 'norm-dist' option are visible
function _showOptionsForNormD() {
    hideElementsById(['select-option-graph', 'select-option-xy'])
    hideElementsByClass(["xy-option", "graph-option"])
    showElementsById(['select-option-id'])
    showElementsByClass(["nd-option"])
}


// FUNCTION DESCRIPTION:
// helper function for setType that makes sure only options relevant
// to the 'edge-list' option are visible
function _showOptionsForGraph() {
    hideElementsById(['select-option-nd', 'select-option-xy'])
    hideElementsByClass(['nd-option', 'xy-option'])
    showElementsById(['select-option-graph'])
    showElementsByClass(['graph-option'])
}


// FUNCTION DESCRIPTION:
// helper function for setType that makes sure only options relevant
// to the 'xy-graph' option are visible
function _showOptionsForXY() {
    hideElementsById(['select-option-id'], ['select-option-graph'])
    hideElementsByClass(['nd-option', 'graph-option'])
    showElementsById(['select-option-xy'])
    showElementsByClass(['xy-option'])
}


// FUNCTION DESCRIPTION:
// Like filterStatistics, but this function makes sure only options that are
// relevant to the user's selected type of input data show up in the statistics panel.
// REFERENCES:
// https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
function setType(event) {
    var inputType = event.target.value

    if (inputType === "norm-dist") {
        _showOptionsForNormD()
    } else if (inputType === "edge-list") {
        _showOptionsForGraph()
    } else if (inputType === "xy-graph") {
        _showOptionsForXY()
    }

    clearCheckboxesByClass(["xy-option", "graph-option", "nd-option", "hp-option"])
}


// FUNCTION DESCRIPTION:
// toggles 'hidden' from an element's classList for every element with an ID
// listed in elemIDs
function toggleHideById(elemIDs) {
    for (var i = 0; i < elemIDs.length; i++) {
        document.getElementById(elemIDs[i]).classList.toggle('hidden')
    }
}


// FUNCTION DESCRIPTION:
// callback for the apply button. Once called, hides input panels and changes
// the text of the apply button
function toggleResults() {
    toggleHideById(['statistics-box-container', 'file-box-container', 'customize-title', 'results-title'])
    if (document.getElementById("apply-button").innerText === "Return" ) {
        document.getElementById("apply-button").innerText = "Apply" 
    } else {
        document.getElementById("apply-button").innerText = "Return" 
    }
}


// FUNCTION DESCRIPTION:
// makes all result panels go invisible
function hideResultPanels() {
    var panels = document.getElementsByClassName('results-panel')

    for (var i = 0; i < panels.length; i++) {
        panels[i].classList.add('hidden')
    }
}


// FUNCTION DESCRIPTION:
// toggles invisibility for a specific result panel unless input panels
// are visible (result and input panels shouldn't show up at the same time).
// This function is the callback for the labels of entries on the history panel.
function toggleResultForFile(event) {
    if (!document.getElementById('file-box-container').classList.contains('hidden')) {
        return
    }
    const entryText = event.target.innerText
    var panels = document.getElementsByClassName('results-panel')
    for (var i = 0; i < panels.length; i++) {
        if (panels[i].getAttribute('file') === entryText) {
            panels[i].classList.toggle('hidden')
        }
    }
}


// FUNCTION DESCRIPTION:
// if a result panel's 'file' attribute matches with the given
// fileName, removes it
function removeResultPanel(fileName) {
    var panels = document.getElementsByClassName('results-panel')

    for (var i = 0; i < panels.length; i++) {
        if (panels[i].getAttribute('file') === fileName) {
            panels[i].remove()
        }
    }
}

export { toggleResults, setType, filterStatistics, hideResultPanels, toggleResultForFile, removeResultPanel }