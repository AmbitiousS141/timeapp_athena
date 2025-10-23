chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "START_TIMER") {
    const { endTime } = message;
    chrome.alarms.clearAll(() => {
        showNotification("Eclipso", "Your focus session has started! 🌟");
        chrome.alarms.create("focusSessionEnd", { when: endTime });
    });
  }

  if (message.type === "STOP_TIMER") {
    chrome.alarms.clearAll();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusSessionEnd") {
    showNotification("Eclipso", "Well done! Focus session has ended, you can take a break now <3");
    chrome.storage.local.remove(["focusEndTime"]);
  }
});

function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon.png",
    title,
    message,
    priority: 2
  });
}