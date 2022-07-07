const weatherApi ={
    key : "ab8b13f4f1c0d10c82b0824ce6c47a9e",
    baseURL : "https://api.openweathermap.org/data/2.5/weather?"
}

var viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute("content", viewport.content + "")

const searchInputBox = document.getElementById('cityName');

const searchBtn = document.getElementById('btn');

searchBtn.addEventListener('click',(event) => {
    getWeatherData(searchInputBox.value);
});

searchInputBox.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        getWeatherData(searchInputBox.value);
    }
});

// Get weather data
function getWeatherData(cityName){

    fetch(`${weatherApi.baseURL}q=${cityName}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showDetails);
}

function showDetails(weatherData){

    let city = document.getElementById('city');
    city.innerText = `${weatherData.name}, ${weatherData.sys.country}`; 

    let myDate = document.getElementById('myDate');
    let todayDate = new Date();
    myDate.innerText = dateManage(todayDate);
    console.log(dateManage(todayDate));

    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weatherData.main.temp)}&deg;C`;

    let minmax = document.getElementById('minmax');
    minmax.innerHTML = `${Math.floor(weatherData.main.temp_min)}&deg;C (min) / ${Math.ceil(weatherData.main.temp_max)}&deg;C (max)`;

    let desc = document.getElementById('desc');
    desc.innerText = `${weatherData.weather[0].main}`

    let img = document.getElementById('img');
    img.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="${weatherData.weather[0].main}">`;



    if(desc.textContent == 'Clear') {
        document.body.style.backgroundImage = `-webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('images/clear.jpg')`;
        
    } else if(desc.textContent == 'Clouds') {

        document.body.style.backgroundImage = `-webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('images/cloud.jpg')`;
        
    } else if(desc.textContent == 'Haze') {

        document.body.style.backgroundImage = `-webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('images/cloud.jpg')`;
        
    }     else if(desc.textContent == 'Rain') {
        
        document.body.style.backgroundImage = `-webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('images/rain.jpg')`;
        
    } else if(desc.textContent == 'Snow') {
        
        document.body.style.backgroundImage = `-webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('images/snow.jpg')`;
    
    } else if(desc.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = `-webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('images/thunderstorm.jpg')`;
        
    } 

}

function dateManage(dateObj){

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    
    let year = dateObj.getFullYear();
    let month = months[dateObj.getMonth()];
    let date = dateObj.getDate();
    let day = days[dateObj.getDay()];

    return `${date} ${month} ( ${day} ), ${year}`;
}