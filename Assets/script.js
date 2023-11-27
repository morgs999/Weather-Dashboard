var searchBtnEl = $('#search-button');
var citySearchEL = $('#city-search');
var forecastBlockEl = $('.forecast-block');
var dayBlockEl = $('.day-block');
citySearchEL.val("");


// Set Dates for 5 Day Forecast //
for (var i = 0; i < 5; i++) {
    var today = dayjs().add(i, 'day');
    forecastBlockEl.children('card')[i].append(today.format('MM / D / YY'));
}

// Convert City Name to Lat & Lon Coordinates //
// and plug into the search parameters of API //
let convert = function () {
    let cityLocation = [];
    let cityData = {
        temp: 0,
        wind: 0,
        humidity: 0,
    }
    // Fetch Weather Info based on City Name //
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearchEL.val() + '&limit=1&appid=dd2b5626d7f843dd14d416ea538ca245')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            cityLocation.push(data[0].lat);
            cityLocation.push(data[0].lon);

            // Push converted LAT and LON data to Weather Search and return DATA needed //
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLocation[0] + '&lon=' + cityLocation[1] + '&appid=dd2b5626d7f843dd14d416ea538ca245')

                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    cityData.temp = data.list[0].main.temp;
                    cityData.wind = data.list[0].wind.speed;
                    cityData.humidity = data.list[0].main.humidity;
                    console.log(cityData.temp);
                })
            console.log(cityData.temp);
        })
    console.log(cityData);
    $(forecastBlockEl).each(function () {
        $('.temp').append(cityData.temp);
        $('.wind').append(cityData.wind);
        $('.humidity').append(cityData.humidity);

    })
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