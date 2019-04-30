const btn = document.querySelector('#btn');
const bg = document.querySelector('#bg');
const container = document.querySelector('#container');
let date = new Date;

const theme = {
    day: "assets/img/day.png",
    night: "assets/img/night.png",
    icons: {
        '01d': "assets/img/sunnyDay.png",
        '01n': "assets/img/sunnyNight.png",
        '02d': "assets/img/fewCloudsDay.png",
        '02n': "assets/img/fewCloudsNight.png",
        '03d': "assets/img/fewCloudsDay.png",
        '03n': "assets/img/fewCloudsNight.png",
        '04d': "assets/img/scatteredClouds.png",
        '04n': "assets/img/scatteredClouds.png",
        '09d': "assets/img/rainDay.png",
        '09n': "assets/img/rainNight.png",
        '10d': "assets/img/rainDay.png",
        '10n': "assets/img/rainNight.png",
        '11d': "assets/img/thunderstorm.png",
        '11n': "assets/img/thunderstorm.png",
        '13d': "assets/img/snowDay.png",
        '13n': "assets/img/snowNight.png",
        '50d': "assets/img/mistDay.png",
        '50n': "assets/img/mistNight.png",
    }
}

// Setting background image according to time
function bgChange() {
    if (date.getHours() > 19) {
        bg.style.backgroundImage = `url(${theme.night})`;
        bg.style.color = "#fff";
        bg.style.backgroundColor = "#001652";
        container.style.backgroundColor = "#001652";
        container.style.boxShadow = "0 0 25px white";
    } else {
        bg.style.backgroundImage = `url(${theme.day})`;
    }
}

bgChange();

btn.addEventListener('click', function() {
    bgChange();
    let userInput = document.querySelector('input').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=4fbcc4f736c166226d8d0b11a6fc32b8&units=metric`;

    let http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let resp = JSON.parse(http.responseText);
            console.log(resp);
            // Object Destructuring
            let { main, clouds, sys, weather, wind } = resp;

            document.querySelector('.city').innerHTML = resp.name;
            document.querySelector('.temp_actual').innerHTML = Math.floor(main.temp) + "°C";
            document.querySelector('.temp_min').innerHTML = Math.floor(main.temp_min) + "°C";
            document.querySelector('.temp_max').innerHTML = Math.floor(main.temp_max) + "°C";
            document.querySelector('.humidity').innerHTML = Math.floor(main.humidity) + "%";
            document.querySelector('.wind').innerHTML = wind.speed;
            document.querySelector('#main').innerHTML = weather[0].main;
            document.querySelector('#description').innerHTML = weather[0].description;
            document.querySelector('#icon').src = theme.icons[weather[0].icon];

        }
    }
    http.open('GET', url, true);
    http.send();

    document.querySelector('#container').style.display = "block";
    document.querySelector('p').style.display = "none";
})