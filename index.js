 const apikey='';
 const weatherDataEl=document.querySelector('#weather-data');
 const cityInputEl=document.querySelector('#city-input');
 const formEl=document.querySelector('form');
 formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
    const cityValue=cityInputEl.value;
    getWeatherData(cityValue);
    
 })

 async function getWeatherData(cityValue){
  
  try {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data=await response.json();
    const temperature=Math.round(data.main.temp)
    const description=data.weather[0].description
    const icon=data.weather[0].icon
    const details=[
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `wind speed: ${data.wind.speed}m/s`
    ]
    weatherDataEl.querySelector('.temperature').innerText
    weatherDataEl.querySelector('.icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`
    weatherDataEl.querySelector('.temperature').innerText=`${temperature}°C`;
    weatherDataEl.querySelector('.description').innerText=description;
    weatherDataEl.querySelector('.details').innerHTML=details.map(details=>{
      return `<div>${details}</div>`
    }).join("");

  }catch(error){
    weatherDataEl.querySelector('.icon').innerHTML=``
    weatherDataEl.querySelector('.temperature').innerText=``;
    weatherDataEl.querySelector('.description').innerText=`An error happend. Please try again`;
    weatherDataEl.querySelector('.details').innerHTML=``
  }
 }
