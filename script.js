//enter your weather API KEY here:
const API_KEY = '59ef5dddba9154cbe87492f008eebfe8';
const wrapper = document.querySelector('.wrapper');
const inputPart = wrapper.querySelector('.input-part');
const infoTxt = inputPart.querySelector('.info-txt');
const inputField = inputPart.querySelector('input');
const weatherIcon = document.querySelector('.weather-icon');
const getLocationBtn = document.getElementById('location');
const backIcon = document.querySelector('header i');
let dataLink = '';

const iconPack = {
   'Clear': './icons/clear.svg',
   'Clouds': './icons/cloud.svg',
   'Haze': './icons/hazy.svg',
   'Rain': './icons/rain.svg',
   'Snow': './icons/snow.svg',
   'Storm': './icons/storm.svg',
   'Smoke': './icons/smoke.png',
   'Smog': './icons/smog.png',
   'Mist': './icons/mist.png',
}

inputField.addEventListener('keyup', (e) => {
   if (e.key === 'Enter' && inputField.value !== '') {
      requestApi(inputField.value);
   }
})

getLocationBtn.addEventListener('click', () => {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
   } else {
      alert('Location denied')
   }
})

backIcon.addEventListener('click', () => {
   wrapper.classList.remove('active');
   inputField.value = '';
})

function onSuccess({ coords}) {
   const { latitude, longitude } = coords;
   dataLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
   fetchData(dataLink);
}

function onError(error) {
   infoTxt.innerText = error.message;
   infoTxt.classList.add('error');
}

function requestApi(city) {
   dataLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
   fetchData(dataLink);
}

function fetchData(link) {
   infoTxt.innerText = "Loading weather details...";
   infoTxt.classList.add('pending');
   fetch(link).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(weatherInfo) {
   if (weatherInfo.cod === '404') {
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
      infoTxt.classList.replace('pending', 'error');

   } else {
      const city = weatherInfo.name;
      const country = weatherInfo.sys.country;
      const { main, description } = weatherInfo.weather[0];
      const temperature = weatherInfo.main.temp;
      const icon = iconPack[main];
      const feelsLike = weatherInfo.main.feels_like;
      const humidity = weatherInfo.main.humidity;

      wrapper.querySelector('.temp .num').innerText = temperature.toFixed();
      wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
      wrapper.querySelector('.weather').innerText = description.charAt(0).toUpperCase() + description.slice(1);
      wrapper.querySelector('.humidity .num').innerText = humidity + '%';
      wrapper.querySelector('.feels .num').innerText = feelsLike.toFixed();

      setTimeout(() => {
         infoTxt.classList.remove('pending', 'error');
         wrapper.classList.add('active');
         weatherIcon.src = icon;
      }, 400)
   }
   console.log(weatherInfo);
}