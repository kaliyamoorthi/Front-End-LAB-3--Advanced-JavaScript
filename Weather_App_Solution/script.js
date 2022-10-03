const days = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let today = new Date();
let day = days[today.getDay()];
let dd = String(today.getDate()).padStart(2, '0');
let mm = months[today.getMonth()]
let yyyy = today.getFullYear();
today = `${day} ${dd} ${mm} ${yyyy}`;
const date = document.querySelector(".date").textContent = today
const cityInput = document.querySelector(".city_input")
const temp = document.querySelector(".temp")
const city = document.querySelector(".city")
const weatherType = document.querySelector(".weather_type")
const weatherRange = document.querySelector(".weather_range")
const api = {
    key: "b34d5dd8cdf703891683408b7882895b",
    base: "https://api.openweathermap.org/data/2.5/"
};


function get_data(city_name) {
    fetch(`${api.base}weather?q=${city_name}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            if (weather.status != 200) {alert("City not found")}
            return weather.json();
        })
        .then(displayResults);
}

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        get_data(cityInput.value)
    }
});

function displayResults(weather) {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    temp.innerHTML = `${Math.round(weather.main.temp)}°c`;
    weatherType.innerText = weather.weather[0].main;
    weatherRange.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;
}
get_data("Mumbai");