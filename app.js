const cityEl = document.getElementById("city-el"); 
const checkBtn = document.getElementById("check-btn"); 
const weatherResult = document.getElementById("weather-result"); 
const API_KEY = "65780f0197ce4c21a61d86f552ff2d4a";



checkBtn.addEventListener("click", function(){
    if (cityEl.value.length !== 0){
        let city = cityEl.value; 
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        .then(response => response.json())
        .then(function(data){
            console.log(data.main.temp); 
        });
        


    }
})
