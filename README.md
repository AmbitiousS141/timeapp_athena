# timeapp_athena
Hello, I'm Eclipso! I'm here to help you balance your time through sun and moon :D I come as a browser extension with a popup where you can start focus sessions that block distracting websites, as well as an options page to edit your preferences: what websites you'd like to block, and when you'd like to receive a bedtime nudge.  

--  

I built Eclipso because... well, in my mom's own words, I built this for myself. I needed it TT Besides that though, I was curious to try my hand in this after downloading a few other extensions and being unsatisfied with their features. Eclipso runs all the features I need in the the way I like best. I've also built many websites using HTML and CSS, but JavaScript was used sparingly. This was a real big push out of my comfort zone, from which I learned a lot and gained confidence. The nights spent on this are proof of it - but now that it's over, Eclipso is here to make sure I make up for that lost sleep TT   

Essentially, how the code works is that when a focus session is started in the popup, the end time of the focus session is calculated and shown in the popup as a timer as well as sent to the background.js file so it's not lost as soon as the popup is closed. Background.js uses the end time to send a notification when the focus session is over. Also, if the reset button is pressed, the timer is stopped and the end time is deleted from storage to not send that notification. During focus sessions, it checks the URLs of each tab so that if a website among the inputted list of blocked ones from the options page is opened, the tab is removed and a notification to stay on trach is sent. Another tab in the options page lets people choose a time to get a bedtime notification. This is again sent to background.js, where an alarm is set to trigger a notification either that day at the given time, or adding a day to the date if the time has already passed on the current day.  

New things I've learned:
- This is my first website using VS Code! RIP Glitch TT. This meant that there were little things like "../" to search for files in other folders that I got to learn about now.
- CSS: there's a few concepts I've simply never thought of trying before that added a nice touch to the design, like the transitions for the help and feedback box beside Eclipso and the gradient backgrounds :D. I also strived to make the page as responsive as possible through units like %, viewport width and height, and relative font size. I'd 100% appreciate pointers and feedback :DDD !
- JS: I was expecting notifications to be so tricky, but I found out how to use Chrome's notification API for it and it's such a simple format! I'll say that lots of the JS syntax was newly-learnt, though previous experiences with Python helped a ton (like, the built-in functions necessary to match the urls with the blocked websites were a pretty quickly figured-out issue). Always making sure to check that no cases were unaccounted for was probably what I found hardest... I hope I got them all in the end o.o that took some hours to puzzle over.

## Made for Athena :D 
![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)  

*Thanks for reading!* 🩷💛