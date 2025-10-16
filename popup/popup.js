// ELEMENTS
const locationIdElement = document.getElementById("locationID")
const startDateElement = document.getElementById("startDate")
const endDateElement = document.getElementById("endDate")

// Button elements
const startButtonElement = document.getElementById("startButton")
const stopButtonElement = document.getElementById("stopButton")

startButton.onclick = function() {
    if (startDateElement.value) {
        console.log("Start date element:", startDateElement.value);
    } else {
        console.log("Start date is invalid.");
    }
    
}

stopButton.onclick = function() {
    console.log("End date:", endDateElement.value);
}