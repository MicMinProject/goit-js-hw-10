import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

function eventHandler(event) {
  let name = event.target.value.trim();
  console.log(fetchCountries(name));
  if (name === '') {
    Notiflix.Notify.success('Please enter a country name.');
    list.style.display = 'none';
    info.style.display = 'none';
  } else {
    fetchCountries(name)
      .then(name => {
        if (name.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (name.length >= 2 && name.length <= 10) {
          renderCountryList(name);
          list.style.display = 'block';
          info.style.display = 'none';
        } else if (name.length === 1) {
          renderCountryInfo(name);
          list.style.display = 'none';
          info.style.display = 'block';
        } else {
          Notiflix.Notify.failure('Oops, there is no country with that name.');
          list.style.display = 'none';
          info.style.display = 'none';
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
        list.style.display = 'none';
        info.style.display = 'none';
      });
  }
}

input.addEventListener('input', debounce(eventHandler, DEBOUNCE_DELAY));

function renderCountryList(name) {
  const markup = name
    .map(country => {
      return `<li class="country__list">
          <img class="flag__img" src="${country.flags.svg}" alt="Flag of ${country.name}" width="50" height="30"><span class="country__name">${country.name}</span></img>
        </li>`;
    })
    .join('');
  list.innerHTML = markup;
}

function renderCountryInfo(name) {
  const markup = name
    .map(country => {
      return `<li class="country__info">
          <img class="flag__img" src="${country.flags.svg}" alt="Flag of ${
        country.name
      }" width="50" height="30"><span class="country__name">${country.name}</span></img>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${country.languages.map(language => ' ' + language.name)}</p>
        </li>`;
    })
    .join('');
  info.innerHTML = markup;
}

//STYLES

input.style.marginLeft = '20px';
input.style.marginTop = '20px';
input.style.width = '250px';
input.style.height = '50px';
list.style.marginLeft = '20px';
list.style.fontSize = '20px';
list.style.padding = '0';
list.style.listStyle = 'none';
info.style.fontSize = '20px';
info.style.marginTop = '20px';
info.style.marginLeft = '20px';
info.style.listStyle = "none";