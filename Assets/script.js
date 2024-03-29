var searchBtnEl = $('#search-button');
var citySearchEL = $('#city-search');
var searchesList = $("#recent-searches-list");
var forecastBlockEL = $('.forecast-block');
var dayBlockEl = $('.day-block');
// Make City Search blank to begin
citySearchEL.val("");
// Initialize searches array for Local Storage
let searches = [];


// Render the cities searches as a list of buttons to be re-searched
function renderSearches() {
    // Reinitialize 'searchesList'
    searchesList.html('');
    // Render a new li for each city searched
    searches.forEach(function (search) {
        let btn = $("<li><button class='btn btn-dark col-12 mb-2 btn-search'>" + search + "</button></li>");
        searchesList.append(btn);
    })
}

// Set up Local Storage via 'searches' array
function storeSearches() {
    localStorage.setItem("city", JSON.stringify(searches));
}

// Run Fetches of OpenWeather API and Write to Page //
let weather = function () {

    let cityLocation = [];

    // Add the city searched to Local Storage via 'searches' array
    searches.push(citySearchEL.val());

    // Fetch Weather Info based on City Name //
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + citySearchEL.val() + '&limit=1&appid=dd2b5626d7f843dd14d416ea538ca245&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityLocation.push(data[0].lat);
            cityLocation.push(data[0].lon);


            // Single Day Weather Forecast //
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + cityLocation[0] + '&lon=' + cityLocation[1] + '&appid=dd2b5626d7f843dd14d416ea538ca245&units=imperial')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // Uncomment Console Log below to sift through data for the city
                    // console.log(data);
                    // Display Weather Data to Single Day Forecast Block
                    let todayCurrent = dayjs.unix(data.dt).format('MMMM D, YYYY');
                    let singleCityEl = $('.single-city');
                    singleCityEl.html("");
                    // Name
                    $('.single-city').append("<p class='bigger-block p-2'>" + data.name + "</p>");
                    // Current Date
                    $('.single-city').append("<p class='big-block'>" + todayCurrent + "</p>");
                    // Weather Icon
                    $('.single-city').append("<img class='icon' src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>");
                    // Current Temp
                    $('.single-city').append("<p class='big-block'>Current Temp: " + data.main.temp + " F</p>");
                    // Humidity
                    $('.single-city').append("<p class='big-block'>Humidity: " + data.main.humidity + "%</p>");
                    // Wind Speed
                    $('.single-city').append("<p class='big-block'>Wind Speed: " + data.wind.speed + " mph</p>");


                    // 5 Day Forecast // 
                    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLocation[0] + '&lon=' + cityLocation[1] + '&appid=dd2b5626d7f843dd14d416ea538ca245&units=imperial')
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            // Uncomment Console Log below to sift through data for the city
                            // console.log(data);
                            // Iterate Cards for 5 Day Forecast //
                            forecastBlockEL.html("");
                            for (var i = 0; i < 40; i += 8) {
                                let forecastDate = dayjs.unix(data.list[i].dt).format('MM/D/YY');
                                var card = $("<div>").addClass('day-block col-12 col-md-6 col-lg-2');
                                // Icon
                                card.append("<img src='https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'>");
                                // Temperature
                                card.append('<h4 class="temp">Temp: ' + data.list[i].main.temp + ' F</h4>');
                                // Wind Speed
                                card.append('<h4 class="wind">Wind: ' + data.list[i].wind.speed + ' mph</h4>');
                                // Humidity
                                card.append('<h4 class="humidity">Humidity: ' + data.list[i].main.humidity + '%</h4>');
                                // Date
                                card.append('<h4 class=five-day-date">' + forecastDate + '</h4>')
                                // Append each Card
                                $(".forecast-block").append(card);
                            }

                        })
                }
                )
        })
}


// Search Button Actions
$(searchBtnEl).on('click', function () {
    // Run Main Function on Search Button Click
    weather(citySearchEL);
    storeSearches();
    renderSearches();
    citySearchEL.val("");
});

// Recent Search Button Actions
$(document).on('click', '.btn-search', function (event) {
    let selectedCity = $(event.target);
    let clickedCity = selectedCity.text();
    citySearchEL.val(clickedCity);
    // Run Main Function on Seach Button Click
    weather(citySearchEL);
    storeSearches();
    renderSearches();
    citySearchEL.val("");
})