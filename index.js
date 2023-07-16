


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
        hideElementsByClass("generic-option")
        hideElementsByClass("generic-option-label")
        hideElementsByClass("nd-option")
        hideElementsByClass("nd-option-label")
        showElementsByClass("hp-option")
        showElementsByClass("hp-option-label")
    }
    if (type == "Normal Distribution") {
        hideElementsByClass("generic-option")
        hideElementsByClass("generic-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        hideElementsByClass("hp-option")
        hideElementsByClass("hp-option-label")
    }
    if (type == "All") {
        showElementsByClass("generic-option")
        showElementsByClass("generic-option-label")
        showElementsByClass("nd-option")
        showElementsByClass("nd-option-label")
        showElementsByClass("hp-option")
        showElementsByClass("hp-option-label")
    }
}

document.getElementById("statistics-filter").addEventListener("input", filterStatistics);