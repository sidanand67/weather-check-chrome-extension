const cityEl = document.getElementById("city-el"); 
const checkBtn = document.getElementById("check-btn"); 
const weatherResult = document.getElementById("weather-result"); 
const lastChecked = document.getElementById("last-checked"); 
const API_KEY = "65780f0197ce4c21a61d86f552ff2d4a";
let city = localStorage.getItem("city"); 

if (city){
    cityEl.value = city; 
}

function getDateTime(){
    let today = new Date(); 
    let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
    let time = `${today.getHours()}:${today.getMinutes()}`
    lastChecked.textContent = `Last Checked: ${time} ${date}`
    console.log(date); 
    console.log(time); 
}

checkBtn.addEventListener("click", function(){
    if (cityEl.value.length !== 0){
        let city = cityEl.value; 
        localStorage.setItem("city", city); 
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        .then(response => response.json())
        .then(function(data){
            // console.log(data.main.temp); 
            weatherResult.textContent = `Currently it's ${data.main.temp}°C in ${city.toUpperCase()}`;
            getDateTime(); 
        });
        


    }
})
