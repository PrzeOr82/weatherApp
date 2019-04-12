let btn = document.querySelector('#btn');

btn.addEventListener('click', function() {
    let userInput = document.querySelector('input').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=4fbcc4f736c166226d8d0b11a6fc32b8&units=metric`;

    let http = new XMLHttpRequest();
    let main = {};
    let clouds = {};
    let sys = {};
    let weather = {};
    let wind = {};

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(http.responseText));
            let resp = JSON.parse(http.responseText);

            main = resp.main;
            clouds = resp.clouds;
            sys = resp.sys;
            weather = resp.weather;
            wind = resp.wind;

            document.querySelector('.city').innerHTML = resp.name;
            document.querySelector('.temp_actual').innerHTML = Math.floor(main.temp) + "°C";
            document.querySelector('.temp_min').innerHTML = Math.floor(main.temp_min) + "°C";
            document.querySelector('.temp_max').innerHTML = Math.floor(main.temp_max) + "°C";
            document.querySelector('.humidity').innerHTML = Math.floor(main.humidity) + "%";
            document.querySelector('.wind').innerHTML = wind.speed;
        }
    }
    http.open('GET', url, true);
    http.send();
})