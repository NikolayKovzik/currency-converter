import { exchangeInput, historyInput } from "./app.js";
const decimal = '0123456789.';

export function isNotFuture(date) {
    let arr = date.split('-').map((item) => +item);
    let now = new Date;

    if (arr[0] > now.getFullYear()) {
        return false;
    } else if ((arr[1] > (now.getMonth() + 1)) && arr[0] === now.getFullYear()) {
        return false;
    } else if ((arr[2] > now.getDate()) && (arr[1] === (now.getMonth() + 1)) && (arr[0] === now.getFullYear())) {
        return false;
    }
    return true;
}


export function inputValidation(inputField) {
    let flag = 0;
    inputField.value = (inputField.value).split('').map((symbol) => {
        if (!decimal.includes(symbol)) {
            return '';
        } else if (symbol !== '.') {
            return symbol;
        } else if (++flag <= 1) {
            return symbol;
        } else {
            --flag;
            return '';
        }
    }).join('');
}


export function historyDataValidation(data, currency, coef) {
    return (data['rates'][`${currency}`]) ? (data['rates'][`${currency}`] * coef * historyInput.value).toFixed(2)
        : 'no results';
}

export function actualDataValidation(currencyRate) {
    let result = exchangeInput.value * currencyRate;
    if (!currencyRate) {
        return 'no results';
    } else if (result < 9e10) {
        return result.toFixed(2)
    } else if (result < 9e20) {
        return result.toString()[0] + 'e' + (result.toString().length - 1);
    } else return 'too big number'
}
