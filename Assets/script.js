var searchBtnEl = $('#search-button');
var citySearchEL = $('#city-search');
var forecastBlockEL = $('.forecast-block');
// var forecastBlockEl = document.getElementsByClassName("forecast-block");
var dayBlockEl = $('.day-block');
citySearchEL.val("");


// Set Dates for 5 Day Forecast //
for (var i = 0; i < 5; i++) {
    var today = dayjs().add(i + 1, 'day');
    forecastBlockEL.children('card')[i].append(today.format('MM / D / YY'));
}

// Convert City Name to Lat & Lon Coordinates //
// and plug into the search parameters of API //
let convert = function () {

    let cityLocation = [];
    // let cityData = {
    //     temp: 0,
    //     wind: 0,
    //     humidity: 0,
    // }
    // Fetch Weather Info based on City Name //
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearchEL.val() + '&limit=1&appid=dd2b5626d7f843dd14d416ea538ca245&units=metric')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            cityLocation.push(data[0].lat);
            cityLocation.push(data[0].lon);

            // Push converted LAT and LON data to Weather Search and return DATA needed //
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLocation[0] + '&lon=' + cityLocation[1] + '&appid=dd2b5626d7f843dd14d416ea538ca245&units=imperial')

                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    console.log(data);



                    forecastBlockEL.html("");

                    for (var i = 0; i < 40; i += 8) {
                        var card = $("<div>").addClass('day-block col-12 col-md-6 col-lg-2');
                        card.append('<h4 class="temp">Temp: ' + data.list[i].main.temp + '</h4>');
                        card.append('<h4 class="wind">Wind: ' + data.list[i].wind.speed + '</h4>');
                        card.append('<h4 class="humidity">Humidity: ' + data.list[i].main.humidity + '</h4>');

                        var today = dayjs().add(1, 'day');
                        card.append('<h6 class="date">' + today.format('MM / D / YY') + '</h6>');

                        $(".forecast-block").append(card);
                    }

                })
        }
        )
}


// Search Button Actions //
$(searchBtnEl).on('click', function () {
    convert(citySearchEL);

    // Save recent searches and wipe search input clean //
    let recentSearchButton = $("<button id='recent-search-button' class='recent-search-button btn btn-light col-12 m-2'></button>").text(citySearchEL.val());
    $('.search-block').append(recentSearchButton);
    citySearchEL.val("");
})

// Reuse Recent Search Buttons //
var recentSearchBtnEl = $('#recent-search-button');
$(recentSearchBtnEl).on('click', function () {
    console.log(recentSearchBtnEl.val());
})