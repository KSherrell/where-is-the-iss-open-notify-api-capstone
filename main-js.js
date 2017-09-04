"use strict";

var refreshLoc;
// alert("ready!");

function refreshLocation() {
    refreshLoc = setInterval(currLoc, 5000);
    //alert("refresh!");
}

function currLoc() {
    var currentLocation = $.ajax({
            url: "http://api.open-notify.org/iss-now.json",
            dataType: "jsonp",
            type: "GET"
        })
        .done(function (currentLocation) {
            console.log(currentLocation);

            var issLat = Number(currentLocation.iss_position.latitude);
            var issLon = Number(currentLocation.iss_position.longitude);
            initMap(issLat, issLon);
            $("#description").text("The International Space Station is currently flying over " + issLat + " latitude, " + issLon + " longitude.")
        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

var map;

function initMap(issLat, issLon) {
    //alert("map!");
    var uluru = {
        lat: issLat,
        lng: issLon
    };
    console.log(uluru);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: uluru,
        disableDefaultUI: true,
        zoomControl: true

    });
    var iconBase = 'imgs/iss_icon.png';
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: iconBase
    });
}



$(currLoc());
$(refreshLocation());
