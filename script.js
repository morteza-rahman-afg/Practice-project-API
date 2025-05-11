'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const btn_start = document.querySelector('.btn_start');
const btn_reset = document.querySelector('.btn_reset');
const input_Latitude = document.querySelector('.input_Latitude');
const input_Longitude = document.querySelector('.input_Longitude');
const box_Test_coordinates = document.querySelector('.box_Test_coordinates');
// ////////////////
const renderError = function (err) {
  countriesContainer.insertAdjacentText('beforeend', err);
};
const renderContry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
          </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const Country_coordinates = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=774552403325881768190x2951`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('The country coordinates are incorrect.❌');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response2 => {
      if (!response2.ok)
        throw new Error('The country coordinates are incorrect.❌');
      return response2.json();
    })
    .then(data2 => {
      renderContry(data2[0]);
    })
    .catch(err => {
      console.error(err.message);
      renderError(err);
    })
    .finally(() => countriesContainer.classList.add('opacity'));
};
btn_start.addEventListener('click', function (e) {
  const input_Latitude_value = +input_Latitude.value;
  const input_Longitude_value = +input_Longitude.value;
  console.log(input_Latitude_value, input_Longitude_value);
  Country_coordinates(input_Latitude_value, input_Longitude_value);
  if (countriesContainer.classList.contains('opacity')) {
    countriesContainer.innerHTML = '';
  }
});
btn_reset.addEventListener('click', function (e) {
  input_Latitude.value = '';
  input_Longitude.value = '';
  countriesContainer.classList.remove('opacity');
});
window.addEventListener('load', function () {
  box_Test_coordinates.classList.add('transform_opacity');
});
