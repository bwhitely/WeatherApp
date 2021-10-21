import './style.css'
import Cloud from './cloud_icon.png'
import Sun from './sun_icon.png'
import SunCloud from './sun_cloud_icon.png'
import Rain from './rain_icon.png'
import Thunder from './thunder_icon.png'
import Snow from './snow_icon.png'
import Atmosphere from './atmosphere_icon.png'

const key = "a89a7db397a8040b5e0e42e65bc6ced8";

const resultsDiv = document.getElementById('results');
const input = document.getElementById('city_input')
const button = document.getElementById('btn');

button.addEventListener('click', function () {
    const data = getData(input.value).then(data => {
        appendData(data);
    })
})

function appendData(data) {
    let info = document.getElementById('results-info')
    // Header
    document.getElementById('results-h4').innerHTML = data.location.city + ' - ' + data.location.country;
    // Info
    document.getElementById('info-p').innerHTML = `<b>${data.main_description} (${data.extra_descrption})</b>`;

    const img = new Image();
    img.id = "info-img";

    // Remove previous img element
    if (document.getElementById('info-img') != null) {
        document.getElementById('info-img').remove()
    }
    switch (data.main_description) {
        case "Clear":
            img.src = Sun;
            break;
        case "Clouds":
            img.src = Cloud;
            break;
        case "Rain" || "Drizzle":
            img.src = Rain;
            break;
        case "Thunderstorm":
            img.src = Thunder
            break;
        case "Snow":
            img.src = Snow
            break;
        case "Atmosphere":
            img.src = Atmosphere
            break;
    }
    info.appendChild(img);

    // Temperature stuff
    document.getElementById('temperature').innerHTML = `<b>Temperature:</b> ${Math.round(data.temp.temperature)}&#176C`;
    document.getElementById('feels-like').innerHTML = `<b>Feels like:</b> ${Math.round(data.temp.feels_like)}&#176C`
    document.getElementById('humidity').innerHTML = `<b>Humidity:</b> ${data.temp.humidity}%`;
    // Wind stuff
    document.getElementById('speed').innerHTML = `<b>Wind Speed:</b> ${data.wind.speed}`
    document.getElementById('gust').innerHTML = `<b>Gust:</b> ${data.wind.gust}`
    // Sun stuff
    document.getElementById('sunrise').innerHTML = `<b>Sunrise:</b> ${new Date(data.sunrise * 1000).toTimeString().substring(17, length)}`
    document.getElementById('sunset').innerHTML = `<b>Sunset:</b> ${new Date(data.sunset * 1000).toTimeString().substring(17, length)}`
    document.getElementById('visibility').innerHTML = `<b>Visibility:</b> ${data.visibility}`
}

async function getData(locationString) {
    console.log(locationString)
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + locationString + '&units=metric' + '&appid=' + key, { mode: 'cors' });
    const data = await res.json();
    const strippedData = stripData(data);
    return strippedData;
}

function stripData(data) {
    const relevantData = {
        location: {
            city: data.name,
            country: data.sys.country
        },
        temp: {
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temperature: data.main.temp,
            max_temp: data.main.temp_max,
            min_temp: data.main.temp_min
        },
        main_description: data.weather[0].main,
        extra_descrption: data.weather[0].description,
        wind: {
            deg: data.wind.deg,
            gust: data.wind.gust,
            speed: data.wind.speed
        },
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        visibility: data.visibility
    };

    return relevantData;
}

function validateForm() {
    let input = document.getElementById('city_input');
}