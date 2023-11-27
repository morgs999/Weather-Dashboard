var searchBtnEl = $('#search-button');
var citySearchEL = $('#city-search');
var cityLocation = [];
citySearchEL.val("");

// Convert City Name to Lat & Lon Coordinates //
// and plug into the search parameters of API //
let convert = function (citySearchEL) {
    // Fetch Weather Info based on City Name //
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearchEL.val() + '&limit=1&appid=dd2b5626d7f843dd14d416ea538ca245')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityLocation.push(data[0].lat);
            cityLocation.push(data[0].lon);

            // Push converted LAT and LON data to Weather Search //
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLocation[0] + '&lon=' + cityLocation[1] + '&appid=dd2b5626d7f843dd14d416ea538ca245')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                })
        })
    let recentSearchButton = $('<h4>citySearchEL.val()</h4>');
    recentSearchButton.after('<hr>')
    citySearchEL.val("");
    return cityLocation;
}

// Search Button Actions //
$(searchBtnEl).on('click', function () {
    convert(citySearchEL);
})