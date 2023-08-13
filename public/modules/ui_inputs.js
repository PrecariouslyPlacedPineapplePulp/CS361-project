// ui_inputs
// This file contains functions related to acquiring user input from HTML
// elements on the website.
// References used:
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules for making and exporting local modules
//      https://www.geeksforgeeks.org/how-to-get-all-checked-values-of-checkbox-in-javascript/ for getting input from checkboxes

// getCheckbox
// Returns the user's selection for the checkboxes inside the stats panel.
// Possible return options include: 
//      'std-dev',
//      'variation',
//      'mean',
//      'median,
//      'line-best-fit,
//      'num-of-vertices',
//      'num-of-edges',
//      'vertex-connectivity',
//      'edge-connectivity',
//      'graph-density'
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


// getRadiobutton
// Returns the user's selection for the radio buttons "type picker".
// Possible return options include:
//      'edge-list',
//      'norm-dist',
//      'xy-graph'.
function getRadioButton() {
    var radioButtons = document.getElementsByName("type-picker")
    
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value
        }
    }
}

export { getCheckbox, getRadioButton }