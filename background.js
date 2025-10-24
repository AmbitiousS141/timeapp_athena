let focusEndTime = null;
let blockedSites = [];

chrome.storage.local.get(['focusEndTime', 'blockedSites'], (result) => {
  focusEndTime = result.focusEndTime || null;
  blockedSites = result.blockedSites || [];
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.focusEndTime) focusEndTime = changes.focusEndTime.newValue;
  if (changes.blockedSites) blockedSites = changes.blockedSites.newValue;
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "START_TIMER") {
    const { endTime } = message;
    chrome.alarms.clearAll(() => {
      TimerNotification("Eclipso", "Your focus session has started! 🌟");
      chrome.alarms.create("focusSessionEnd", { when: endTime });
      chrome.storage.local.set({ focusEndTime: endTime });
      focusEndTime = endTime;
      checkAllTabs();
    });
  }

  if (message.type === "STOP_TIMER") {
    chrome.alarms.clearAll();
    chrome.storage.local.remove(["focusEndTime"]);
    focusEndTime = null;
  }

  if (message.type === "SET_SLEEP_ALARM" && message.time) {
    createSleepNotification(message.time);
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusSessionEnd") {
    TimerNotification("Eclipso", "Well done! Focus session has ended, you can take a break now <3");
    chrome.storage.local.remove(["focusEndTime"]);
    focusEndTime = null;
    checkAllTabs();
  }

  if (alarm.name === 'sleepNotification') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon-rounded.png',
      title: 'Eclipso',
      message: 'Alright overachiever, time to go to sleep! 🌙',
      priority: 2
    });

    chrome.storage.local.get(['sleepTime'], (result) => {
      if (result.sleepTime) createSleepNotification(result.sleepTime);
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') checkTab(tab);
});
chrome.tabs.onCreated.addListener((tab) => checkTab(tab));

function checkTab(tab) {
  if (!focusEndTime || Date.now() > focusEndTime) return;
  if (!tab.url) return;

  const url = tab.url.toLowerCase();
  for (const site of blockedSites) {
    if (url.includes(site.toLowerCase())) {
      chrome.tabs.remove(tab.id);
      FocusNotification(site);
      break;
    }
  }
}

function checkAllTabs() {
  chrome.tabs.query({}, (tabs) => tabs.forEach(checkTab));
}

function TimerNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon-rounded.png",
    title,
    message,
    priority: 2
  });
}

function FocusNotification(site) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon-rounded.png",
    title: "Eclipso",
    message: `The site "${site}" was open during your focus session. Nuh-uh, you're not done yet! You got this!`,
    priority: 2
  });
}

function createSleepNotification(timeString) {
  const [hour, minute] = timeString.split(':').map(Number);
  const now = new Date();
  let pingTime = new Date();

  pingTime.setHours(hour, minute, 0, 0);

  if (pingTime <= now) {
    pingTime.setDate(pingTime.getDate() + 1);
  }

  const sleepMs = pingTime.getTime();
  chrome.alarms.create('sleepNotification', { when: sleepMs });
}