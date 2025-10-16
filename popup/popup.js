// ELEMENTS
const locationIdElement = document.getElementById("locationID")
const startDateElement = document.getElementById("startDate")
const endDateElement = document.getElementById("endDate")

// Button elements
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

startButton.onclick = () => { // before, you had it set up as function() {. This new version is cleaner.
    const prefs = {
        locationId: locationIdElement.value,
        startDate: startDateElement.value,
        endDate: endDateElement.value
    }
    chrome.runtime.sendMessage({ event: 'onStart', prefs })   
}

stopButton.onclick = () => {
    chrome.runtime.sendMessage({ event: 'onStop' })
}

chrome.storage.local.get(["locationID", "startDate", "endDate"], (result) => {
    const { locationId, startDate, endDate } = result; // "destructuring"

    if (locationId) { // if locationId is valid... 
        locationIdElement.value = locationId // ...then set the value to locationId.
    }

    if (startDate) {
        startDateElement.value = startDate
    }

    if (endDate) {
        endDateElement.value = endDate
    }
})