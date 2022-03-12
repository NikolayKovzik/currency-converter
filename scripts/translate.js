const translateObject = {
    'en': {
        'exchange-rate': 'Actual exchange rate',
        'currency-select': 'Select the currency you want to exchange:',
        'currency-quantity': 'Enter quantity:',
        'currency-multiselect': 'Hold CTRL, and select currencies you want to convert into:',
        'rate-history': 'Exchange rate history',
        'date-select': 'Select the date you would like to view exchange rates:',
        'currency-history-select': 'Select the currency for which you want to see history:',
        'result': 'Result:',
        'error': 'Error!',
        'error-future': "You can't watch course from the future! Please select a valid date.",
        'error-select': "Please select one currency in multiple input to swap.",
    },
    'ru': {
        'exchange-rate': 'Актуальный курс валют',
        'currency-select': 'Выберите валюту, курс которой хотите посмотреть:',
        'currency-quantity': 'Введите сумму:',
        'currency-multiselect': 'Удерживая CTRL, выберите валюты, в которые хотите конвертировать:',
        'rate-history': 'История курсов валют',
        'date-select': 'Выберите, за какое число вы хотите видеть курс:',
        'result': 'Результат:',
        'error': 'Ошибка!',
        'error-future': 'Нельзя посмотреть курс на это число. Пожалуйста, введите корректную дату.',
        'error-select': 'Для свапа выберите одну валюту из списка.',
    }
}

const searchButton = document.querySelector('.search-button');
const convertButton = document.querySelector('.convert-button');
export let lang = 'en';

export function translatePage(language) {
    let data = document.querySelectorAll('[data-translate]');
    for (let currentElement of data) {
        currentElement.textContent = translateObject[language][currentElement.getAttribute('data-translate')];
    }

    if (language === 'ru') {
        (document.querySelector('.en').classList.remove('active'),
            document.querySelector('.ru').classList.add('active'),
            searchButton.value = 'Поиск',
            convertButton.value = 'Конвертировать',
            convertButton.classList.add('ru-button'),
            lang = 'ru')
    } else {
        (document.querySelector('.ru').classList.remove('active'),
            document.querySelector('.en').classList.add('active'),
            searchButton.value = 'Search',
            convertButton.value = 'Convert',
            convertButton.classList.remove('ru-button'),
            lang = 'en');
    }

}

export function chooseLangButton(event) {
    if (event.target.dataset.switch)
        translatePage(event.target.dataset.switch);
}