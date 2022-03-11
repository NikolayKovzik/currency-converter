import { lang } from "./translate.js";
import {firstList, secondList, thirdList, datepicker, getArrayOfSelectedValues } from "./app.js";
export function setLocalStorage() { 
    let storageObj = {
        lang,
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
                console.log(`optionSelect ${option} --- arrItem${item}`)
            })
        }
        return array;


        thirdList.value = storageObj.thirdList;
        datepicker.value = storageObj.datepicker;
      //  lang = storageObj.lang;
    }
 }


function setArrayOfSelectedValues() {
   
}