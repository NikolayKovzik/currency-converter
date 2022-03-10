import { isNotFuture, inputValidation, historyDataValidation, actualDataValidation } from './validationFunctions.js'
//const DF_API_KEY = "ba982e3f1b2533d1f07c769f25d59182";
//const DF_BASE_URL = "http://data.fixer.io/api/";


//use for actual courses, 250 per month
const EXR_API_KEY = "5b0ec37250a51e6d43357326";
const EXR_BASE_URL = "https://v6.exchangerate-api.com/v6";
//use for history queries, 1000 per month
const OEXR_API_KEY = "3f8166cfef574c9eb1486f502eb97162";
const OEXR_BASE_URL = "https://openexchangerates.org/api/";


const converter = document.querySelector('.converter');
const datepickerForm = document.querySelector('.datepicker-form');
const firstList = document.querySelector('.first-list');
export const secondList = document.querySelector('.second-list');
const thirdList = document.querySelector('.third-list');
export const exchangeInput = document.querySelector('.exchange-input');
const exchangeOutput = document.querySelector('.exchange-output');
const displayInputs = document.querySelectorAll('.display-output');
const errorWindow = document.querySelector('.error');
const closeWindow = document.querySelector('.close-window');
const swapButton = document.querySelector('.swap-img');
const crossButton = document.querySelector('.cross');
// const convertButton = document.querySelector('.convert-button');
// const searchButton = document.querySelector('.search-button');
const datepicker = document.querySelector('.datepicker');

async function getData(link) {
    let response = await fetch(link)
    let data = await response.json();
    console.log(data);
    return data;
}


converter.onsubmit = async (event) => {
    event.preventDefault();
    if (exchangeInput.value && exchangeInput.value > 0) {
        let data = await getData(`${EXR_BASE_URL}/${EXR_API_KEY}/latest/${firstList.value}`);
        exchangeOutput.value = actualDataValidation(data);
    }
};


datepickerForm.onsubmit = async (event) => {
    event.preventDefault();
    if (datepicker.value && isNotFuture(datepicker.value)) {
        errorWindow.classList.add('invisible');
        let data = await getData(`${OEXR_BASE_URL}historical/${datepicker.value}.json?app_id=${OEXR_API_KEY}`);

        if (historyDataValidation(data, thirdList.value,1) !== 'no results' && historyDataValidation(data, 'USD',1) !== 'no results') {
            let coef = data['rates']['USD']/data['rates'][`${thirdList.value}`];
            displayInputs.forEach((item) => {
                if(item.getAttribute('name') === thirdList.value){
                    item.value = 1
                } else{
                    item.value = historyDataValidation(data,item.getAttribute('name'),coef);
                }
            })
        } else {
            displayInputs.forEach((item) => {
                item.value = 'no results';
            })
        }

    } else {
        errorWindow.classList.remove('invisible');
    }
};


closeWindow.addEventListener('click', () => {
    errorWindow.classList.add('invisible');
})

swapButton.addEventListener('click', () => {
    [firstList.value, secondList.value] = [secondList.value, firstList.value];
    swapButton.classList.toggle('rotate');
    exchangeInput.value = '';
    exchangeOutput.value = '';
})

crossButton.addEventListener('click', () => {
    exchangeInput.value = '';
})


exchangeInput.addEventListener('input', inputValidation)

