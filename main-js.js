"use strict";

//var refreshLoc;
// alert("ready!");

function refreshLocation() {
    var refreshLoc = setInterval(currLoc, 7000);
    // alert("refresh!");

}

function currLoc() {
    var currentLocation = $.ajax({
            url: "http://api.open-notify.org/iss-now.json",
            dataType: "jsonp",
            type: "GET"
        })
        .done(function (currentLocation) {
            //console.log(currentLocation);

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
            $.each(crew.people, function (key, value) {
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
    //console.log(uluru);
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

document.getElementById('submit').addEventListener('click', function () {
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder);
});

function geocodeAddress(geocoder) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            var myLon = results[0].geometry.viewport.b.f;
            var myLat = results[0].geometry.viewport.f.f;
            //var myLat = 40.52;
            //var myLon = -104.55;
            console.log(results);
            console.log(myLat, myLon);
            console.log($.isNumeric(myLat));
            console.log($.isNumeric(myLon));
            alert("overheadISS!");
            var params = {
                lat: myLat,
                lon: myLon,
                n: 3
            }
            var nextPass = $.ajax({
                    url: "http://api.open-notify.org/iss-pass.json",
                    data: params,
                    dataType: "jsonp",
                    type: "GET"
                })
                .done(function (nextPass) {
                    console.log(nextPass);
                    $.each(nextPass.response, function (key, value) {
                        console.log(nextPass.response[key].risetime);
                        // $("#nextPass").append(`<p>${nextPass.response[key].risetime}</p>`);
                    })

                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        };
    });
}

$(currLoc());
$(refreshLocation());
$(currCrew());
$(geocodeAddress());
