const cityEl = document.getElementById("city-el"); 
const checkBtn = document.getElementById("check-btn"); 
const weatherResult = document.getElementById("weather-result"); 
const lastChecked = document.getElementById("last-checked"); 
const API_KEY = "65780f0197ce4c21a61d86f552ff2d4a";
const divContainer = document.getElementById("container"); 
const emojiEl = document.getElementById("emoji"); 
let city = localStorage.getItem("city"); 



function renderWeather(){
    setBackground(); 
    setEmoji(); 
    if (cityEl.value.length !== 0) {
        let city = cityEl.value.toLowerCase();
        localStorage.setItem("city", city);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then(function (data) {

                if(data.cod === 200){
                    weatherResult.textContent = `Currently it's ${data.main.temp}°C in ${city.toUpperCase()}.`;
                    weatherResult.style.fontStyle = "normal"; 
                    weatherResult.style.color = "white"; 
                    weatherResult.style.fontSize = "1rem"; 
                    lastChecked.style.visibility = "visible"; 
                    getDateTime();
                }
                else {
                    weatherResult.textContent = "City not found";
                    weatherResult.style.color = "#9b2226"; 
                    weatherResult.style.fontSize = "20px"; 
                    weatherResult.style.fontStyle = "italic";  
                    lastChecked.style.visibility = "hidden"; 
                }
            });
    }
}

function getDateTime(){
    let today = new Date(); 
    let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`

    let time = `
        ${today.getHours() < 10 ? "0" + today.getHours() : today.getHours()}:${today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()}:${today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds()}
    `
    lastChecked.textContent = `Last checked on ${date} at ${time}`
}

function setBackground(){
    let today = new Date(); 
    if (today.getHours() >= 6 && today.getHours() <= 18){ 
        document.body.background = "images/day.jpeg"; 
    }
    else {
        document.body.background = "images/night.jpg"; 
    }   
}

function setEmoji(){
    let today = new Date(); 
    if(today.getHours() >= 6 && today.getHours() <= 18){
        emojiEl.textContent = "🌞";
    }
    else {
        emojiEl.textContent = "🌃";
    }
}

// Function Calls
if (city) {
    cityEl.value = city;
    renderWeather();
}



