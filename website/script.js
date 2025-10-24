document.addEventListener('DOMContentLoaded', () => { 
    const buttons = document.querySelectorAll('.tab-button'); 
    const texts = document.querySelectorAll('.tab-words'); 
    
    buttons.forEach(btn => { 
        btn.addEventListener('click', () => { 
            buttons.forEach(b => 
                b.classList.remove('active')); 

            btn.classList.add('active'); 
            
            const tab = btn.dataset.tab; 
            texts.forEach(t => { 
                t.style.display = (t.dataset.tab === tab) ? 'block' : 'none'; 
            }); 
        }); 
    }); 

    const input = document.getElementById('blocked-sites-input');
    const saveSitesButton = document.getElementById('save-blocked-sites');
    const status = document.getElementById('save-status');

    if (input && saveSitesButton) {
        chrome.storage.local.get(['blockedSites'], (result) => {
            if (result.blockedSites) {
                input.value = result.blockedSites.join('\n');
            }
        });

        saveSitesButton.addEventListener('click', () => {
            const sites = input.value
                .split('\n')
                .map(s => s.trim())
                .filter(s => s.length > 0);

            chrome.storage.local.set({ blockedSites: sites }, () => {
                const originalText = saveSitesButton.textContent;
                saveSitesButton.textContent = "Saved!";
                setTimeout(() => {
                    saveSitesButton.textContent = originalText;
                }, 1500);
            });
        });
    }

    const sleepTime = document.getElementById('sleepTime');
    const saveSleepButton = document.getElementById('save-sleep-time');

    if (sleepTime && saveSleepButton) {
        chrome.storage.local.get(['sleepTime'], (result) => {
            if (result.sleepTime) {
                sleepTime.value = result.sleepTime;
            }
        });

        saveSleepButton.addEventListener('click', () => {
            if (!sleepTime.checkValidity()) {
                alert("Please enter a military time between 00:00 and 23:59");
                return;
            }

            const timeValue = sleepTime.value;
            chrome.storage.local.set({ sleepTime: timeValue }, () => {
                saveSleepButton.textContent = "Saved!";
                setTimeout(() => saveSleepButton.textContent = "Save", 1500);

                chrome.runtime.sendMessage({ type: "SET_SLEEP_ALARM", time: timeValue });
            });
        });
    }
});
