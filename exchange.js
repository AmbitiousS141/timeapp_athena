import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

console.log("Your API key is:", apiKey);

const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const convert = document.getElementById('convert');
const result = document.getElementById('result');

const apiUrl="https://api.api-ninjas.com/v1/exchangerate?pair=USD_"

convert.addEventListener('click', () => {
    const amountTotal = amount.value;
    const currencyTotal = currency.value;
    const url = apiUrl + currencyTotal;

    fetch(url, {
        headers: {
            'X-API-KEY': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const result = amountTotal * rate;
        result.innerHTML = `${amount} ${currency} = ${result.toFixed(2)} USD`;
    })
    .catch(error => {
        console.error('Request failed:', error);
        result.innerHTML = 'An error occured, please try again later.'
    })
})