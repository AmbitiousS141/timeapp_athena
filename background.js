import fetchLocations from "./api/fetchLocations.js"

chrome.runtime.onInstalled.addListener(details => {
    fetchLocations()
})

chrome.runtime.onMessage.addListener(data => {
    const { event, prefs } = data // this is so you can type "event" or "prefs" instead of "data.events"/"data.prefs" in the next lines. Called "destructuring"
    switch (event) {
        case 'onStop':
            handleOnStop();
            break;
        case 'onStart':
            handleOnStart(prefs);
            break;
        default:
            break
    }
})

const handleOnStop = () => {
    console.log("On stop in background")
}

const handleOnStart = (prefs) => {
    console.log("On start in background")
    console.log("prefs received:", prefs)
    chrome.storage.local.set(prefs)
}