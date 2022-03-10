import {exchangeInput, secondList} from "./app.js"
const decimal = '0123456789.';

export function isNotFuture(date) {
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


export function inputValidation() {
    let flag = 0;
    exchangeInput.value = (exchangeInput.value).split('').map((symbol)=>{
        if(!decimal.includes(symbol)){
            return '';
        } else if(symbol!=='.') {
            return symbol;
        } else if(++flag <= 1){
            return symbol;
        } else { 
            --flag;
            return '';
        }
   }).join('');
}

export function historyDataValidation(data,currency,coef) {
    return (data['rates'][`${currency}`]) ? (data['rates'][`${currency}`]*coef).toFixed(2) 
                                                           : 'no results';
}

export function actualDataValidation(currencyRate){
    if(currencyRate){
        return (exchangeInput.value * currencyRate).toFixed(2)
    } else return 'no results';
}