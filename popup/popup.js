// ELEMENTS
const startTimeElement = document.getElementById("startTime");
const startButton = document.getElementById("startButton");

let timerId = null;

startButton.onclick = () => {
  const timeValue = startTimeElement.value;

  if (!timeValue) {
    alert("Please select a time duration.");
    return;
  }

  // Converting time to milliseconds
  const [hoursStr, minutesStr] = timeValue.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const totalMs = (hours * 60 * 60 + minutes * 60) * 1000;

  if (totalMs <= 0) {
    alert("Please select a time greater than 0.");
    return;
  }

  startTimeElement.disabled = true;
  startButton.classList.add("is-loading");
  startButton.textContent = "Focus session in progress...";

  chrome.storage.local.set({ startTime: timeValue });

  timerId = setTimeout(() => { 
    startTimeElement.disabled = false;
    startButton.classList.remove("is-loading");
    startButton.textContent = "🌟 Start Focus Session! 🌟";

    chrome.storage.local.remove("startTime");

    timerId = null;
  }, totalMs);
};

chrome.storage.local.get("startTime", (result) => {
  if (result.startTime) { // if result.startTime is valid...
    startTimeElement.value = result.startTime; // set it as value
  }
});