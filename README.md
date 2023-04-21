# Full Game Time Calculator

## About

Tool for adding up level completion times for full game runs, ** HITMAN speedrun community**.

NOTE: This is a modified version of [the original Time Calculator](http://www.grun1.com/utils/timeCalc.html) by Gordon Smith

### Improvements So Far over Grun1's Original Site

- Github Pages seems to be a more reliable website hosting service, leading to greater site stability.
- Can now save URL with one click (on both Desktop and Mobile browsers).
- Improved font size and readability
- Removed extraneous timing options that Hitman Speedrun community doesn't use
- Split code that was originally all on one HTML file into HTML, Javascript, CSS files to make the site easier to maintain.
- Added Shortened URL's with the help of [CORS Anywhere by Rob--w](https://github.com/Rob--W/cors-anywhere) (made my own fork and deployed on Railway), and [this Codepen from Ephellon](https://codepen.io/Ephellon/pen/EvvGGp) that uses TinyURL API.

### Technologies Used

- Lightweight site built with vanilla Javascript, HTML, CSS.
- Deployed on Github Pages

## Screenshots and Usage Instructions

Usage: Enter times into input field, a running total of your total time is calculated. Use the format minutes:seconds for each level.

Click "Save Data as Link" (as highlighted in below screenshot); this will generate three URL's (the original long URL, the shortened URL, and the shortened preview URL).
Just clicking on "Save Data as Link" once will save the original long URL to your clipboard, as confirmed by a popup window.

Next click the "copy icon" (as highlighted in below screenshot); this will copy the shortened URL (via TinyURL API) to your clipboard, as confirmed by a popup window.

Example Screenshot:
![image](https://user-images.githubusercontent.com/82061589/233559040-04f99020-b252-4eb6-af28-f265a104940f.png)
