import '../css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountry from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListTpl from '../templates/countryList.hbs';
import countryInfoTpl from '../templates/countryInfo.hbs';
import getRefs from './getRefs/';
const DEBOUNCE_DELAY = 300;

const refs = getRefs();
console.log(refs);

refs.inputCountrySearch.addEventListener(
  'input',
  debounce(onFetchCountry, DEBOUNCE_DELAY)
);

function onFetchCountry(event) {
  event.preventDefault();

  const inputValue = event.target.value.trim();
  console.log(inputValue);

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  fetchCountry(inputValue)
    .then(response => {
      console.log(response);
      console.log(response.length);
      if (response.length > 10) {
        info();
      } else if (response.length >= 2 && response.length <= 10) {
        // console.log(response);
        // countryListRef.innerHTML =`Hello`
        renderCountryList(response);
      } else if (response.length === 1) {
        renderCountryInfo(response);
      }
      // renderCountryList(response);
    })
    .catch(error => err());
}
console.log(fetchCountry);
function renderCountryList(country) {
  refs.countryList.innerHTML = countryListTpl(country);
}

function renderCountryInfo(country) {
  refs.countryInfo.innerHTML = countryInfoTpl(country);
}

function info() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function err() {
  Notify.failure('Oops, there is no country with that name');
}
