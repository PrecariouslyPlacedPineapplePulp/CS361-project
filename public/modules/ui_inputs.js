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
    
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value
        }
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
export { getCheckbox, getRadioButton }