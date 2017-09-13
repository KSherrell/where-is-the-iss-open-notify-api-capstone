# "Where Is the ISS?" - Thinkful API Capstone Project
A responsive website that pulls data from three APIs, Open Notify (http://open-notify.org), Google Maps (https://console.developers.google.com/), and Convert Unix Time (http://www.convert-unix-time.com/) to enable users to track the location of the International Space Station (ISS) over the Earth.

## User Cases
This app is for three types of users.
1. As an amateur astronomer, I want to find the current location of the ISS in order to track the path of the ISS in real-time.
2. As a space travel enthusiast, I want to find the time of the next pass of the ISS over my location so that I may possibly view the ISS.
3. As an elementary school teacher, I want to find the predicted location of the ISS at a future date and time to plan for future viewings and share that with my students.

### UI Flow
![UI Flow handwritten draft](https://github.com/KSherrell/where-is-the-iss-open-notify-api-capstone/blob/master/wireframe/ui-flow.jpg)
### Wireframe _main
![Wireframe _Main](https://github.com/KSherrell/where-is-the-iss-open-notify-api-capstone/blob/master/wireframe/wireframe-iss-main.jpg)
### Wireframe _User Cases
![Wireframe _User Case 1](https://github.com/KSherrell/where-is-the-iss-open-notify-api-capstone/blob/master/wireframe/wireframe-iss-user-cases.jpg)

## Working Prototype
You can access a working prototype of the app here: https://ksherrell.github.io/where-is-the-iss-open-notify-api-capstone/

## Functionality
The app's functionality includes:
* The ability to view a video of the ISS traveling across the night sky.
* The app shows the current location of the ISS, updated every 7 seconds.
* The app returns the time and date of the next three passes of the ISS over a user-input location.
* The app lists the current crewmembers of the ISS.


## Technology
* HTML
* CSS
* JavaScript
* jQuery

* The app uses AJAX JSON calls to the <a href="http://api.open-notify.org/iss-now.json">Open Notify</a>Open Platform API to return ISS latitude and longitude, the time of the next three passes, and the names of the current crewmembers.
* The app uses AJAX JSON calls to the <a href="http://www.convert-unix-time.com/api">Convert Unix Time</a>Open Platform API to return the unix timestamp converted to an UTC formatted date and time.
* The app uses AJAX JSON calls to the <a href="https://maps.googleapis.com/maps/api">Google Maps and Google Geocode</a>Open Platform API to return the map showing the current location of the ISS and return the latitude and longitude of the user-input location.

## Responsive
App is built to be responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Time/Date of the next three passes shown in local time.
