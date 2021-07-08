//---------------------------Notes----------------------//-------------------Notes--------------------------------------//
//
// EXAMPLE CALLS:   api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e09ebb7db49ee70223da23fbbc92a143
//                 https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//                 https://api.openweathermap.org/data/2.5/weather?q={cityname},{statecode},{countrycode}&appid={APIkey}


//----------------------Notes---------------------------//------------------------------Notes---------------------------//

const apiKey = "e09ebb7db49ee70223da23fbbc92a143"
// var place = "Portland,Oregon";


function getOneDay(){
    var place = document.querySelector("#citySearch").value;
    // var location = place.textContent
    console.log(place)
//call API based on loaction
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`)
.then(response => response.json())
.then(function(response){
    console.log(response)
    var temp = response.main.temp;
    var fahrenheit = ((temp - 273.15) * 1.8) + 32 
    var wind = response.wind.speed + "MPH";
    var humidity = response.main.humidity;
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    var datetime = response.dt;
    datetime = datetime * 1000
    var dtMili = new Date(datetime)
    var humanDate = dtMili.toLocaleString();
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`)
.then(response => response.json())
.then(function(data){
    console.log(data)
    var uvIndex = data.current.uvi
    console.log(latitude, longitude)
    console.log(`Temp: ${fahrenheit} F, Wind Speed: ${wind} mph, Humidity: ${humidity} %, UV Index: ${uvIndex}, Date: ${humanDate}`)
})
})

}

function getFiveDay(){
    
}