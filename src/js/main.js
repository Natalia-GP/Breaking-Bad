'use strict';
console.log('añañañaña');
//QUERYSELECTORS
const btn = document.querySelector('.js-btn');
const inputSearch = document.querySelector('.js-input');
const listCharacter = document.querySelector('.js-list');
const favCharacter = document.querySelector('.js-favourite');

let allCharacter = []; //array todo los pj
let searchList = [];
let favList = []; //array personajs favoritos
//VARIABLES GLOBALES-> VARIABLES CON DATOS (PERSONAJES Y FAV)

//FUNCIONES

//fetch del API
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    allCharacter = data;
    renderAllCharacters(allCharacter, listCharacter);
  });
//bucle para pintar array de datos
function renderAllCharacters(dataChar, htmlList) {
  htmlList.innerHTML = '';
  for (const character of dataChar) {
    renderCharacters(character, htmlList);
  }
}
//función para pintar cada personaje con DOM avanzado
function renderCharacters(characterData, htmlList) {
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const imgElement = document.createElement('img');
  const nameElement = document.createElement('h3');
  const statusElement = document.createElement('p');
  articleElement.setAttribute('id', `${characterData.char_id}`);
  imgElement.setAttribute('src', characterData.img);
  imgElement.setAttribute('alt', `${characterData.name}`);
  const nameText = document.createTextNode(characterData.name);
  const nameStatus = document.createTextNode(characterData.status);
  articleElement.setAttribute('class', 'section__list__article');
  imgElement.setAttribute('class', 'section__list__article--img');
  liElement.appendChild(articleElement);
  articleElement.appendChild(imgElement);
  articleElement.appendChild(nameElement);
  articleElement.appendChild(statusElement);
  nameElement.appendChild(nameText);
  statusElement.appendChild(nameStatus);
  htmlList.appendChild(liElement);
  addEvent();
}
//función para filtrar
function handleClick(event) {
  event.preventDefault();
  const userSearch = inputSearch.value;
  fetch(`https://breakingbadapi.com/api/characters?name=${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
      searchList = data;
      renderAllCharacters(searchList, listCharacter);
    });

}
//EVENTOS
btn.addEventListener('click', handleClick);

//FUNCIÓN AÑADIR FAV

function handleFavourites (event) {
  event.preventDefault();
  const target = event.currentTarget;
  if (target.classList.contains('favourite')){
    target.classList.remove('favourite');
    const position =searchArray(parseInt(target.id));
    favList.splice(position, 1);
  } else{
    target.classList.add('favourite');
    favList.push(  //agrega
      allCharacter.find((eachCharacter) => eachCharacter.char_id === parseInt(target.id))
    );
  }
  localStorage.setItem('favChar', JSON.stringify(favList)); //guardar los datos y convertir el array en cadena
  renderAllCharacters(favList, favCharacter); //pintamos
}
//EVENTO ESCUCHA CADA PJ
function addEvent() {
  const characters = document.querySelectorAll('.section__list__article');
  for (const eachCharacter of characters) {
    eachCharacter.addEventListener('click', handleFavourites);
  }
}

function searchArray(target) {
  return favList.findIndex((each) => each.char_id === target);
}