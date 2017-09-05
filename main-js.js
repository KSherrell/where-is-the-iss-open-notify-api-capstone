"use strict";

//var refreshLoc;
// alert("ready!");

function refreshLocation() {
    var refreshLoc = setInterval(currLoc, 7000);
    //alert("refresh!");
    currLoc();
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
            $("#description").html(`<p>The International Space Station is currently flying over</p><p class="descp">LATITUDE: <span>${issLat}</span></p><p class="descp"> LONGITUDE: <span>${issLon}</span></p>`);
        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function currCrew() {
    var currentCrewMembers = $.ajax({
            url: "http://api.open-notify.org/astros.json",
            dataType: "jsonp",
            type: "GET"
        })
        .done(function (currentCrewMembers) {
            console.log(currentCrewMembers);

            var crew = currentCrewMembers;
            console.log(crew.people);
            $(".numberOfAstros").text(`${crew.number}`);
            $.each(crew.people, function (key, name) {
                console.log(crew.people[key].name);
                $("#astronauts").append(`<li>${crew.people[key].name}</li>`);
            });
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




//$(refreshLocation());
$(currCrew());
