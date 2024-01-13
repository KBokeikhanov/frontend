const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

const currencyNames = {
    USD: 'US Dollar',
    EUR: 'Euro',
};

async function populateCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = currency;
        option1.text = currencyNames[currency];
        option2.value = currency;
        option2.text = currencyNames[currency];
        fromCurrencySelect.add(option1);
        toCurrencySelect.add(option2);
    });


    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    try {
        const response = await fetch(`${apiUrl}/${fromCurrency}`);
        const data = await response.json();

        if (data.rates[toCurrency]) {
            const result = (amount * data.rates[toCurrency]).toFixed(2);
            document.getElementById('result').innerHTML = `${amount} ${currencyNames[fromCurrency]} = ${result} ${currencyNames[toCurrency]}`;
        } else {
            throw new Error('Invalid currency pair');
        }
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error converting currency';
    }
}


window.onload = function () {
    populateCurrencies();
};
