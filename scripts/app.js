import { isNotFuture, inputValidation, historyDataValidation, actualDataValidation } from './validationFunctions.js'
//const DF_API_KEY = "ba982e3f1b2533d1f07c769f25d59182";
//const DF_BASE_URL = "http://data.fixer.io/api/";

/*OLD
//use for actual courses, 250 per month
const EXR_API_KEY = "5b0ec37250a51e6d43357326";
const EXR_BASE_URL = "https://v6.exchangerate-api.com/v6";
//use for history queries, 1000 per month
const OEXR_API_KEY = "3f8166cfef574c9eb1486f502eb97162";
const OEXR_BASE_URL = "https://openexchangerates.org/api/";
*/

/*NEW*/
//use for actual courses, 250 per month
const EXR_API_KEY = "980a7ed07a511424d64c08be";
const EXR_BASE_URL = "https://v6.exchangerate-api.com/v6";
//use for history queries, 1000 per month
const OEXR_API_KEY = "c084e55e531447359525acf462d1c69f";
const OEXR_BASE_URL = "https://openexchangerates.org/api/";

const converter = document.querySelector('.converter');
const datepickerForm = document.querySelector('.datepicker-form');
const firstList = document.querySelector('.first-list');
const secondList = document.querySelector('.second-list');
export const exchangeInput = document.querySelector('.exchange-input');
const actualOutputs = document.querySelector('.actual-outputs');
const firstActualColumn = document.querySelector('.first-actual-column');
const secondActualColumn = document.querySelector('.second-actual-column');
const selectErrorWindow = document.querySelector('.select-error');
const closeSelectError = document.querySelector('.close-select-error');
const swapButton = document.querySelector('.swap-img');
const exchangeCrossButton = document.querySelector('.exchange-cross');
let actualLabelFlag = false;

const thirdList = document.querySelector('.third-list');
export const historyInput = document.querySelector('.history-input');
const historyOutputs = document.querySelector('.history-outputs');
const firstHistoryColumn = document.querySelector('.first-history-column');
const secondHistoryColumn = document.querySelector('.second-history-column');
// const displayOutputs = document.querySelectorAll('.display-output');
const historyErrorWindow = document.querySelector('.history-error');
const closeHistoryError = document.querySelector('.close-history-error');
const historyCrossButton = document.querySelector('.history-cross');
const datepicker = document.querySelector('.datepicker');
let historyLabelFlag = false;

async function getData(link) {
    let response = await fetch(link)
    let data = await response.json();
    console.log(data);
    return data;
}

function getArrayOfSelectedValues() {
    let array = [];
    for (let option of secondList.options) {
        if (option.selected) {
            array.push(option.value);
        }
    }
    return array;
}

function clearOutput(type) {
    document.querySelectorAll(`.${type}-output`).forEach((item) => item.remove());
}

converter.onsubmit = async (event) => {
    event.preventDefault();
    let selected = getArrayOfSelectedValues();

    if (exchangeInput.value && exchangeInput.value > 0) {
        let data = await getData(`${EXR_BASE_URL}/${EXR_API_KEY}/latest/${firstList.value}`);

        if (!actualLabelFlag) {
            actualOutputs.insertAdjacentHTML('beforebegin', `<label class="result-label">Result:</label>`);
            actualLabelFlag = true;
        }
        clearOutput('exchange');
        let outputs = 0;
        selected.forEach((currency) => {
            outputs++;
            if (outputs % 2) {
                firstActualColumn.insertAdjacentHTML('beforeend', `<output class="exchange-output">${currency}&nbsp;:&nbsp;${actualDataValidation(data.conversion_rates[currency])}</output>`);
            } else {
                secondActualColumn.insertAdjacentHTML('beforeend', `<output class="exchange-output">${currency}&nbsp;:&nbsp;${actualDataValidation(data.conversion_rates[currency])}</output>`);
            }
        })
    }
};


datepickerForm.onsubmit = async (event) => {
    event.preventDefault();
    if (datepicker.value && isNotFuture(datepicker.value) && historyInput.value && historyInput.value > 0) {
        historyErrorWindow.classList.add('invisible');
        let data = await getData(`${OEXR_BASE_URL}historical/${datepicker.value}.json?app_id=${OEXR_API_KEY}`);

        let coef = data['rates']['USD'] / data['rates'][`${thirdList.value}`];
        if (!historyLabelFlag) {
            historyOutputs.insertAdjacentHTML('beforebegin', `<label class="result-label">Result:</label>`);
            historyLabelFlag = true;
        }
        clearOutput('history');
        let outputs = 0;
        for (let option of thirdList.options) {
            outputs++;
            if (outputs % 2) {
                firstHistoryColumn.insertAdjacentHTML('beforeend', `<output class="history-output">${option.innerText}&nbsp;:&nbsp;${historyDataValidation(data, option.innerText, coef)}</output>`);
            } else {
                secondHistoryColumn.insertAdjacentHTML('beforeend', `<output class="history-output">${option.innerText}&nbsp;:&nbsp;${historyDataValidation(data, option.innerText, coef)}</output>`);
            }
        }

    } else {
        historyErrorWindow.classList.remove('invisible');
    }
};


closeHistoryError.addEventListener('click', () => {
    historyErrorWindow.classList.add('invisible');
})

closeSelectError.addEventListener('click', () => {
    selectErrorWindow.classList.add('invisible');
})

swapButton.addEventListener('click', () => {
    let selected = getArrayOfSelectedValues();
    if (selected.length === 1) {
        selectErrorWindow.classList.add('invisible');
        [firstList.value, secondList.value] = [secondList.value, firstList.value];
        swapButton.classList.toggle('rotate');
        exchangeInput.value = '';
        clearOutput('exchange');
    } else {
        selectErrorWindow.classList.remove('invisible');
    }

})

exchangeCrossButton.addEventListener('click', () => {
    exchangeInput.value = '';
    clearOutput('exchange');
})

historyCrossButton.addEventListener('click', () => {
    historyInput.value = '';
    clearOutput('history');
})

exchangeInput.addEventListener('input', () => { inputValidation(exchangeInput) })
historyInput.addEventListener('input', () => { inputValidation(historyInput) })

