"use strict";


$(document).ready(function () {
    /* Update all the parameters for your API test*/
    /* var params = {
         tagged: 'html',
         site: 'stackoverflow',
         order: 'desc',
         sort: 'creation'
     };*/
    $(".js-currentTime").click(function () {
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
    })


});
var map;

function initMap(issLat, issLon) {
    //alert("map!");
    $("#map")
    var uluru = {
        lat: issLat,
        lng: issLon
    };
    console.log(uluru);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
