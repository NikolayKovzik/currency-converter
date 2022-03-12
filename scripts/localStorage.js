import { lang, translatePage} from "./translate.js"; 
import {firstList, secondList, thirdList, datepicker, getArrayOfSelectedValues } from "./app.js"; 
 
export function setLocalStorage() {  
    let storageObj = { 
        lang: lang, 
        firstList: firstList.value, 
        secondList: getArrayOfSelectedValues(), 
        thirdList: thirdList.value, 
        datepicker: datepicker.value, 
    }; 
     
    localStorage.setItem('infoFromCurrencyConverter', JSON.stringify(storageObj)) 
}    
 
 
 export function getLocalStorage() { 
     
    if (localStorage.getItem('infoFromCurrencyConverter')) { 
        let storageObj = JSON.parse(localStorage.getItem('infoFromCurrencyConverter')); 
        firstList.value = storageObj.firstList; 

        let array = storageObj.secondList; 
        for (let option of secondList.options) { 
            array.forEach((item)=>{ 
                if(option.innerText === item) { 
                    option.selected = true; 
                } 
                     
            }) 
        } 
        translatePage(storageObj.lang);
        thirdList.value = storageObj.thirdList; 
        datepicker.value = storageObj.datepicker; 
    } else {
        firstList.value = 'BYN';
        secondList.value = 'USD';
        thirdList.value = 'BYN';
        translatePage('en');
        let now = new Date();
        datepicker.value = `${now.getFullYear()}-${(now.getMonth()+1) <=9 ? '0'+ (now.getMonth()+1) : (now.getMonth()+1)}-${now.getDate()}`;
    }
 } 
 