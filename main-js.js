"use strict";

//var refreshLoc;
// alert("ready!");

var issLat = 39.989079;
var issLon = -172.110723;
var map;

function refreshLocation() {
    var refreshLoc = setInterval(currLoc, 7000);
    // alert("refresh!");

}



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

function currLoc() {
    var currentLocation = $.ajax({
            url: "http://api.open-notify.org/iss-now.json",
            dataType: "jsonp",
            type: "GET"
        })
        .done(function (currentLocation) {
            //console.log(currentLocation);

            issLat = Number(currentLocation.iss_position.latitude);
            issLon = Number(currentLocation.iss_position.longitude);
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
            //console.log(currentCrewMembers);

            var crew = currentCrewMembers;
            //console.log(crew.people);
            $(".numberOfAstros").text(`${crew.number}`);
            $.each(crew.people, function (key, value) {
                //console.log(crew.people[key].name);
                var liOutput = '<li><a href="https://www.google.co.uk/search?q=' + crew.people[key].name + '" target="_blank">' + crew.people[key].name + '</a></li>';
                //                console.log(liOutput);
                $("#astronauts").append(liOutput);
            });
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}



document.getElementById('submit').addEventListener('click', function () {
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder);
});

function geocodeAddress(geocoder) {

    var address = document.getElementById('address').value;
    if (geocoder !== undefined) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === 'OK') {
                var myLon = results[0].geometry.viewport.b.f;
                var myLat = results[0].geometry.viewport.f.f;
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
                        // console.log(nextPass);
                        $.each(nextPass.response, function (key, value) {
                            var issPass = nextPass.response[key].risetime;

                            console.log(issPass);

                            //                        function convertUnixTimeCallback(result) {
                            //                            console.log(result);
                            //                        }
                            var threePasses = $.ajax({
                                    url: "http://www.convert-unix-time.com/api?timestamp=" + issPass + "&returnType=jsonp&callback=convertUnixTimeCallback",
                                    // data: issPass,
                                    dataType: "jsonp",
                                    type: "GET"
                                })
                                .done(function (threePasses) {
                                    //alert("passesOverhead!");
                                    console.log(threePasses);
                                })
                                .fail(function (jqXHR, error, errorThrown) {
                                    console.log(jqXHR);
                                    console.log(error);
                                    console.log(errorThrown);
                                });
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
}

$(currLoc());
$(refreshLocation());
$(currCrew());
$(geocodeAddress());
