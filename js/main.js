const btn = document.querySelector('#btn');
const bg = document.querySelector('#bg');
let date = new Date;

const theme = {
    day: "/weatherApp/assets/img/day.png",
    night: "/weatherApp/assets/img/night.png"
}

function bgChange() {
    if (date.getHours() > 19) {
        bg.style.backgroundImage = `url(${theme.night})`;
        bg.style.color = "#fff";
        bg.style.backgroudColor = "#001652";
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
            console.log(JSON.parse(http.responseText));
            let resp = JSON.parse(http.responseText);

            // Object Destructuring
            let { main, clouds, sys, weather, wind } = resp;

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

    document.querySelector('.container').style.display = "block";
    document.querySelector('p').style.display = "none";
})