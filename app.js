const cityEl = document.getElementById("city-el"); 
const checkBtn = document.getElementById("check-btn"); 
const weatherResult = document.getElementById("weather-result"); 
const lastChecked = document.getElementById("last-checked"); 
const API_KEY = "65780f0197ce4c21a61d86f552ff2d4a";
let city = localStorage.getItem("city"); 

if (city){
    cityEl.value = city; 
    renderWeather(); 
}

function renderWeather(){
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
                    weatherResult.style.color = "green"; 
                    weatherResult.style.fontStyle = "normal"; 
                    lastChecked.style.visibility = "visible"; 
                    getDateTime();
                }
                else {
                    weatherResult.textContent = "City not found";
                    weatherResult.style.color = "red"; 
                    weatherResult.style.fontStyle = "italic";  
                    lastChecked.style.visibility = "hidden"; 
                }
            });
    }
}

function getDateTime(){
    let today = new Date(); 
    let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
    let time = `${today.getHours()}:${today.getMinutes()}`
    lastChecked.textContent = `Last checked on ${date} at ${time}`
}


