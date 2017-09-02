"use strict";

$(document).ready(function () {

    $(".js-search-form").submit(function (event) {
        event.preventDefault();
        var searchTerm = $(".js-query").val();
        console.log(searchTerm + " is the searchTerm");
        getVideos(searchTerm);
    })

    function getVideos(searchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                key: "AIzaSyCJn4EgqP8i7Gt5S8yV1QGRFfXt53khN8k",
                part: "snippet",
                maxResults: 12,
                q: searchTerm,
                type: "video"
            },
            function (cake) {
                if (cake.pageInfo.totalResults == 0) {
                    alert("No videos found!")
                } else {
                    displayResults(cake.items, searchTerm)
                }
            }
        )
    }

    function displayResults(videoList, searchTerm) {

        var htmlOutput = "";
        $.each(videoList, function (key, value) {
            htmlOutput += `
                            <li>
                                <a href='https://www.youtube.com/watch?v=${value.id.videoId} target='blank'>
                                <img src='${value.snippet.thumbnails.medium.url}' alt="${searchTerm} photo #${key+1}."/>
                                </a>
                                <p>${value.snippet.title}</p>
                            </li>
                        `;

        });
        $(".js-search-results ul").html(htmlOutput);
        $("h2").text(`Voila! Here are 12 ${searchTerm} videos for you to enjoy!`);
    }
})
