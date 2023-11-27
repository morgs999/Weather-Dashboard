var searchBtnEl = $('#search-button');
var citySearchEL = $('#city-search');
// citySearchEL.val("");
var cityLocation = [];

// Convert City Name to Lat & Lon Coordinates //
let convert = function (citySearchEL) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearchEL + '&limit=1&appid=dd2b5626d7f843dd14d416ea538ca245')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityLocation.push(data[0].lat);
            cityLocation.push(data[0].lon);
        })
    return cityLocation;
}

// console.log(convert("Toronto"));
// console.log(cityLocation[0], cityLocation[1]);
// console.log(convert("Dallas"));
// console.log(cityLocation[0], cityLocation[1]);

// Search Button Actions //
$(searchBtnEl).on('click', function () {
    let citySearchEL = $('#city-search');
    convert(citySearchEL);
    console.log(citySearchEL);
    console.log(cityLocation[0], cityLocation[1]);
    citySearchEL.val("");

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLocation[0] + '&lon=' + cityLocation[1] + '&appid=dd2b5626d7f843dd14d416ea538ca245')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
})