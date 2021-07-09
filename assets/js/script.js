
const apiKey = "e09ebb7db49ee70223da23fbbc92a143"
const todaysWeather = {};

function getOneDay(city){
    var place = document.querySelector("#citySearch").value;
    console.log(city)
    // var pastCity = 
    // var location = place.textContent
//call API based on loaction
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`)
.then(response => response.json())
.then(function(response){
    console.log(response);
    var location = response.name;
    var temp = response.main.temp;
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    getFiveDay(latitude, longitude, location);
})   
}

function getFiveDay(latitude, longitude, location){
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`)
.then(response => response.json())
.then(function(data){
    console.log(data)
    var current = data.current
    var city = location;
    todaysWeather.temp= Math.round(((current.temp - 273.15) * 1.8) + 32) 
    todaysWeather.humidity = current.humidity; 
    todaysWeather.wind = current.wind_speed + "MPH";
    todaysWeather.uvIndex= data.current.uvi
    var datetime = data.current.dt * 1000; //convert Unix UTC to a readable date and time
    var dtMili = new Date(datetime)
    var humanDate = dtMili.toLocaleDateString();
    todaysWeather.date = humanDate;
    console.log(todaysWeather);
    document.getElementById('oneDay').innerHTML="";
    document.querySelector('.fiveDayWeather').innerHTML="";

    $('#oneDay').append(
        `<div class= "card">
        <h3>${city}, ${todaysWeather.date}</h3>
        <p> Temp: ${todaysWeather.temp}</p>
        <p> Wind Speed: ${todaysWeather.wind}</p>
        <p> Humidity: ${todaysWeather.humidity}</p>
        </div> `
    );
 
    for(i=1; i < 6; i++){
        var list = data.daily[i]
        var temps = list.temp.day;
        var fahenehit = Math.round(((temps - 273.15) * 1.8) + 32) 
        var wind = list.wind_speed;
        var uv = list.uvi;
        var humid = list.humidity;
        var dt = list.dt * 1000
        var date = new Date(dt).toLocaleDateString();

        $('.fiveDayWeather').append(
            `<div class = "card" style="width: 12rem">
            <h5> Date: ${date}</h5>
            <p> Temp: ${fahenehit}</p>
            <p> Wind Speed: ${wind}</p>
            <p> Humidity: ${humid}</p>
            </div>`
        )
    }
})
}

$('.btn').on("click", function(){
    
    var city = $('#citySearch').val().trim()
    console.log(city)
    var newButton = document.createElement("button")
  newButton.innerHTML = city;
  newButton.setAttribute("onclick", function(city){
    
  })
})
