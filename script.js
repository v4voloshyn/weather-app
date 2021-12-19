//enter your weather API KEY here:
const API_KEY = '***';
const wrapper = document.querySelector('.wrapper');
const inputPart = wrapper.querySelector('.input-part');
const infoTxt = inputPart.querySelector('.info-txt');
const inputField = inputPart.querySelector('input');
const getLocationBtn = document.getElementById('location');
let api = '';

inputField.addEventListener('keyup', (e) => {
   if(e.key === 'Enter' && inputField.value !== '') {
      requestApi(inputField.value);
   }
})

getLocationBtn.addEventListener('click', (e) => {
   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
   } else {
      alert('Location denied')
   }
})

function onSuccess({coords}) {
   const {latitude, longitude} = coords;
   api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
   fetchData(api);
}

function onError(error) {
   infoTxt.innerText = error.message;
   infoTxt.classList.add('error');
}

function requestApi(city) {
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
   fetchData(api);
}

function fetchData(apiData) {
   infoTxt.innerText = "Loading weather details...";
   infoTxt.classList.add('pending');
   fetch(apiData).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(weatherInfo) {
   if(weatherInfo.cod === '404'){
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
      infoTxt.classList.add('error');
      
   }
   console.log(weatherInfo);
   
}
