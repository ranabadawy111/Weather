"use strict"
var finalResult=[];
async function getWeather(city){
    let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5971117a8bda478f88e201723221007&q=${city}&days=3`);
    
    if(response.ok && response.status !=400){
        finalResult= await response.json();
        displayCurrent(finalResult.location, finalResult.current);
        getNextWeather(finalResult.forecast.forecastday)
    }
}

document.getElementById("search").addEventListener("keyup", e => { getWeather(e.target.value) }); 
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

function displayCurrent(location, current){
    if(current!=null){
        let date =new Date(current.last_updated.replace(" ","T"));
        let data =`
        <div class="col-md-4" >
            <div class="time d-flex justify-content-between p-3" style="background-color:rgb(45,48,61);">
                <div class="day">${days[date.getDay()]}</div>
                <div class="date">${date.getDate() + monthNames[date.getMonth()]}</div>
            </div>
            <div class="information p-4" style="background-color:rgb(50,53,68);">
                <div class="city fw-bold pb-4">${finalResult.location.name}</div>
                <div class="temp d-flex">
                    <div class="degree text-white" style="font-size:70px">${current.temp_c}<sup>o</sup>c</div>
                    <div class="icon p-4"><img src="https:${current.condition.icon}" alt="status" width="90"/></div>
                </div>
                <div class="status text-primary fw-bold">${current.condition.text}</div>
                <span class="me-4"><img class="me-2" src="images/icon-umberella@2x.png" width ="21px" alt="...">20%</span>
                <span class="me-4"><img class="me-2" src="images/icon-wind@2x.png" width ="21px" alt="...">18km/h</span>
                <span class="me-4"><img class="me-2" src="images/icon-compass@2x.png" width ="21px" alt="...">East</span>  
            </div>
        </div>
        `
        document.getElementById("weather").innerHTML=data;
    }
}

function getNextWeather(forecasts){
    let data =``;
    for (let i = 1; i < forecasts.length; i++) {
        data +=`
        <div class="col-md-4 pb-5 text-center" >
            <div class="p-3" style="background-color:rgb(45,48,61);">${days[new Date(forecasts[i].date.replace(" ", "T")).getDay()]}</div>
            <div class=" p-4" style="background-color:rgb(50,53,68);">
                <div class="p-4"><img src="https:${forecasts[i].day.condition.icon}" alt="status" width=48/></div>
                <div class="my-2 text-white fw-bold" style="font-size:24px">${forecasts[i].day.maxtemp_c} <sup>o</sup>c</div>
                <small>${forecasts[i].day.mintemp_c}<sup>o</sup>c</small>
                <div class="my-1 pt-4 text-primary">${forecasts[i].day.condition.text}</div>
            </div>
        </div>
        `
    }
    document.getElementById("weather").innerHTML+=data;
}
getWeather("cairo");










