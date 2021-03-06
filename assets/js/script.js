const apiKey = "e09ebb7db49ee70223da23fbbc92a143";
var todaysWeather = [];
var myCities = [];

//search button onclick, creates button and searches weather
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
  var place = $("#citySearch").val().trim();
  console.log(place);
    myCities.push(place)
  getWeather(place);
  localStorage.setItem("cities", JSON.stringify(myCities)); 
  var newButton = document.createElement("button");   //create the button
  newButton.innerHTML = place;
  newButton.setAttribute("id", "button");
  newButton.setAttribute("class", "btn btn-light");
  newButton.onclick = function(){
      getWeather(place);
    }
  $("#past-searches").append(newButton);
  // var place = city.value();
});
//on page load, search local storage for past searches and populate the page with that city
function pageLoad() {
  var storedCity = JSON.parse(localStorage.getItem("cities"));
  if (storedCity !== null) {
    //if storedCity isn't empty
    myCities = storedCity; // array myCities is populated by storedCity
  }
  if (storedCity) {
    //if storedCity array has objects, load last city 
    var loadCity = myCities[myCities.length-1]; //
    console.log(loadCity);
    getWeather(loadCity);
  }
}


var getWeather = function (place) {
  console.log(place);

  //call API based on loaction
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
      var location = response.name;
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      getFiveDay(latitude, longitude, location);
    });
};

function getFiveDay(latitude, longitude, location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      var current = data.current;
      var city = location;
      //grab data
      todaysWeather = [""];
      todaysWeather.temp = Math.round((current.temp - 273.15) * 1.8 + 32);
      todaysWeather.humidity = current.humidity;
      todaysWeather.wind = current.wind_speed + "MPH";
      todaysWeather.uvIndex = current.uvi;
      todaysWeather.icon = data.daily[0].weather[0].icon;
      console.log(todaysWeather.icon);

      var datetime = data.current.dt * 1000; //convert Unix UTC to a readable date and time
      var dtMili = new Date(datetime);
      var humanDate = dtMili.toLocaleDateString();
      todaysWeather.date = humanDate;

      console.log(todaysWeather);
      //clear content of previous weather search 
      document.getElementById("oneDay").innerHTML = "";
      document.querySelector(".fiveDayWeather").innerHTML = "";

      $("#oneDay").append(
        `<div class= "card" id= "oneDayForecast">
        <h3>${city}, ${todaysWeather.date}</h3>
        <img src = "http://openweathermap.org/img/wn/${todaysWeather.icon}@2x.png" style = "width: 80px; height: 80px"></img>
        <p> Temp: ${todaysWeather.temp}</p>
        <p> Wind Speed: ${todaysWeather.wind}</p>
        <p> Humidity: ${todaysWeather.humidity}</p>
        <p> UV Index: <span class="p-2" id= "uvColor">${todaysWeather.uvIndex}</span></p>
        </div> `
      );

      for (i = 1; i < 6; i++) {
          //grab data
        var list = data.daily[i];
        var temps = list.temp.day;
        var fahrenheit = Math.round((temps - 273.15) * 1.8 + 32);
        var wind = list.wind_speed;
        var icon = list.weather[0].icon;
        var humid = list.humidity;
        var dt = list.dt * 1000;
        var date = new Date(dt).toLocaleDateString();

        $(".fiveDayWeather").append(
          `<div class = "card singleOfFive" style="width: 12rem">
            <h5> Date: ${date}</h5>
            <img src = "http://openweathermap.org/img/wn/${icon}@2x.png" style = "width: 60px; height: 60px"></img>
            <p> Temp: ${fahrenheit}</p>
            <p> Wind Speed: ${wind}</p>
            <p> Humidity: ${humid}</p>
            </div>`
        );
      }
      colorCode(todaysWeather.uvIndex);
    });
}
//color code UV Index; color code from google search 'uv index chart'
function colorCode(index) {
  console.log(index);
  if (index >= 0 && index < 3) {
    $("#uvColor").attr("style", "background-color: green");
  } else if (index >= 3 && index < 6) {
    $("#uvColor").attr("style", "background-color: yellow");
  } else if (index >= 6 && index < 8) {
    $("#uvColor").attr("style", "background-color: orange");
  } else if (index >= 8 && index < 11) {
    $("#uvColor").attr("style", "background-color: red");
  } else if (index >= 11) {
    $("#uvColor").attr("style", "background-color: pink");
  }
}

pageLoad();

$("#citySearch").keyup(function(event){   //add event listener for "keyup if keycode=13", keycode 13= enter key
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById("searchBtn").click();  //if enter key is released, the button is set to onclick and the function runs
  }
})