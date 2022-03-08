//const API_KEY = "ba982e3f1b2533d1f07c769f25d59182";
//const BASE_URL = "http://data.fixer.io/api/";
//const API_KEY = "3f8166cfef574c9eb1486f502eb97162";
//const BASE_URL = "https://openexchangerates.org/api/";
const API_KEY = "5b0ec37250a51e6d43357326";
const BASE_URL = "https://v6.exchangerate-api.com/v6";   //250 per month, use for actual courses

const converter = document.querySelector('.converter');
const firstList = document.querySelector('.first-list');
const secondList = document.querySelector('.second-list');
const firstInput = document.querySelector('.first-input');
const secondInput = document.querySelector('.second-input');
const convertButton = document.querySelector('.submit-button');


function getExchangeRates(link){
    fetch(link)
    .then((response) => response.json())
    .then((data) => {
        secondInput.value = (firstInput.value*data.conversion_rates[secondList.value]).toFixed(2);
    })
    console.log(`${BASE_URL}/${API_KEY}/latest/${firstList.value}`);
}   



converter.onsubmit = (event) => {
    event.preventDefault();
    if(firstInput.value){
        getExchangeRates(`${BASE_URL}/${API_KEY}/latest/${firstList.value}`);
    }
  };