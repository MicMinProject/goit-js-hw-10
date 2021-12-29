"use strict";

import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import { debounce } from 'lodash.debounce';
import '../css/styles.css';

const input=document.querySelector('input#search-box');
const countryList=document.querySelector('ul.country-list');
const countryInfo=document.querySelector('div.country-info');

input.addEventListener('input',debounce((e)=>{
  
  let name=e.target.value.trim();
  fetchCountries(name)
  .then(data=> makeCountryList(data))
  .catch(error=>{Notiflix.Notify.failure("Oops, there is no country with that name");
  countryList.style.display="none";
  countryInfo.style.display="none"})
},300))

function makeCountryList(data){

  if(data.length>10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    countryList.style.display="none";
    countryInfo.style.display="none"
  }else if(data.length===1){
    countryList.style.display="none";
    countryInfo.style.display="block";
    
  const markup=data.map(feature=>{
      const languagesArr=[];
      feature.languages.forEach(language=>languagesArr.push(language.name))
      const languagesString=languagesArr.join(", <span>");
    return `<h3 class="country-name"><img class="country-name" src=${feature.flags.png} alt="Flag of ${feature.name}" height="60" width="80">
    ${feature.name}
    </h3>
    <p class="country-features"><b>Capital:</b> ${feature.capital}</p>
    <p class="country-features"><b>Population:</b> ${feature.population}</p>
    <p class="country-features"><b>Languages:</b> ${languagesString}</p>`
  });
      countryInfo.innerHTML=markup;
  }else{
    countryList.style.display="block";
    countryInfo.style.display="none";
    const markup=data.map(feature=>{
    return `<li class="country-item">
    <p class="country-name"><img class="country-name" src=${feature.flags.png} alt="Flag of ${feature.name}" height="30" width="40">
          ${feature.name}
        </p>
      </li>`}).join("");
      countryList.innerHTML=markup
    
    countryList.style.listStyle="none";
}};
