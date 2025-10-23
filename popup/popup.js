let timerId = null;
let intervalId = null;

const countdownLook = document.getElementById("countdown");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const resetButton = document.getElementById("resetButton");
const startButton = document.getElementById("startButton");

startButton.onclick = () => {
  const hoursRaw = hoursInput.value;
  const minutesRaw = minutesInput.value;

  const hours = parseFloat(hoursRaw || "0");
  const minutes = parseFloat(minutesRaw || "0");

  // this next part is making sure times are correct
  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 || minutes < 0 || minutes >= 60
  ) {
    alert("Only accepts positive, whole values.");
    return;
}
  const totalMs = (hours * 60 + minutes) * 60 * 1000;
  const endTime = Date.now() + totalMs 

  chrome.storage.local.set({ focusEndTime: endTime });

  chrome.runtime.sendMessage({ type: "START_TIMER", endTime });

  timerfulLook();
};

document.getElementById('logoSection').addEventListener('click', () => {
  const websiteURL = 'https://website.com'; // UPDATE THIS LATER!
  chrome.tabs.create({ url: websiteURL });
});

resetButton.onclick = () => {
  clearInterval(intervalId);
  clearTimeout(timerId);
  timerId = null;
  timerlessLook();
  chrome.storage.local.remove(["focusEndTime"]);
  chrome.runtime.sendMessage({ type: "STOP_TIMER" });
};

window.onload = () => {
  chrome.storage.local.get(["focusEndTime"], (data) => {
    const { focusEndTime } = data;

    if (!focusEndTime || Date.now() >= focusEndTime) {
      timerlessLook();
      chrome.storage.local.remove(["focusEndTime"]);
    } else { 
      resumeTimer(focusEndTime)
    }
  });
};

function startTimer(totalMs) {
  const endTime = Date.now() + totalMs;

  chrome.storage.local.set({ focusEndTime: endTime });

  updateCountdown(endTime);
  intervalId = setInterval(() => updateCountdown(endTime), 1000);

  timerId = setTimeout(() => {
    clearInterval(intervalId);
    timerlessLook();
    timerId = null;
  }, totalMs);
}

function updateCountdown(endTime) {
  const remaining = endTime - Date.now();

  if (remaining <= 0) {
    countdownLook.textContent = "";
    return;
  }

  const hours = Math.floor(remaining / 1000 / 60 / 60);
  const minutes = Math.floor((remaining / 1000 / 60) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  countdownLook.textContent = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resumeTimer(endTime) {
  timerfulLook()
  updateCountdown(endTime);
  intervalId = setInterval(() => updateCountdown(endTime), 1000);
}

function timerlessLook() {
  hoursInput.value = "";
  minutesInput.value = "";
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  resetButton.style.display = "none";
  startButton.textContent = "🌟 Start Focus Session! 🌟";
  countdownLook.textContent = "";
}

function timerfulLook() {
  hoursInput.disabled = true;
  minutesInput.disabled = true;
  resetButton.style.display = "block";
  startButton.textContent = "Focus session in progress...";
}