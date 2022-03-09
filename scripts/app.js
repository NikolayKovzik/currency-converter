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
const secondList = document.querySelector('.second-list');
const firstInput = document.querySelector('.first-input');
const secondInput = document.querySelector('.second-input');
const displayInputs = document.querySelectorAll('.display-input');
const errorWindow = document.querySelector('.error');
const closeWindow = document.querySelector('.close-window');
// const convertButton = document.querySelector('.convert-button');
// const searchButton = document.querySelector('.search-button');
const datepicker = document.querySelector('.datepicker');

async function getData(link) {
    let response = await fetch(link)
    let data = await response.json();
    console.log(data);
    return data;
}


function isNotFuture(date) {
    let arr = date.split('-').map((item) => +item);
    let now = new Date;

    if (arr[0] > now.getFullYear()) {
        return false;
    } else if ((arr[1] > (now.getMonth() + 1)) && arr[0]===now.getFullYear()) {
        return false;
    } else if ((arr[2] > now.getDate()) && (arr[1] === (now.getMonth() + 1)) && (arr[0] === now.getFullYear())) {
        return false;
    }

    return true;
}




converter.onsubmit = async (event) => {
    event.preventDefault();
    if (firstInput.value) {
        let data = await getData(`${EXR_BASE_URL}/${EXR_API_KEY}/latest/${firstList.value}`);
        secondInput.value = (firstInput.value * data.conversion_rates[secondList.value]).toFixed(2);
    }
};


datepickerForm.onsubmit = async (event) => {
    event.preventDefault();
    if (datepicker.value && isNotFuture(datepicker.value)) {
        errorWindow.classList.add('invisible');
        let data = await getData(`${OEXR_BASE_URL}historical/${datepicker.value}.json?app_id=${OEXR_API_KEY}`);
        displayInputs.forEach((item)=>{
            item.value = (data['rates'][`${item.getAttribute('data-currency')}`]) ? (data['rates'][`${item.getAttribute('data-currency')}`]).toFixed(2) 
                                                                                  : 'no results';
        })
    } else {
        errorWindow.classList.remove('invisible');
    }
};


closeWindow.addEventListener('click', ()=>{
    errorWindow.classList.add('invisible');
})