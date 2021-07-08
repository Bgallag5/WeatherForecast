//---------------------------Notes----------------------//-------------------Notes--------------------------------------//
//
// EXAMPLE CALLS:   api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e09ebb7db49ee70223da23fbbc92a143
//                 https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//                 https://api.openweathermap.org/data/2.5/weather?q={cityname},{statecode},{countrycode}&appid={APIkey}


//----------------------Notes---------------------------//------------------------------Notes---------------------------//

const apiKey = "e09ebb7db49ee70223da23fbbc92a143"
// var place = "Portland,Oregon";


function getWeather(){
    var place = $(citySearch).innerHtml.trim();
    console.log(place)
//call API based on loaction
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`)
.then(response => response.json())
.then(function(response){
    console.log(response);
})

}