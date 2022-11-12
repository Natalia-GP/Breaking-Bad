'use strict';
console.log('añañañaña');
//QUERYSELECTORS
const btn = document.querySelector('.js-btn');
const inputSerch = document.querySelector('.js-input');
const listCharacter = document.querySelector('.js-list');
const favourCharacter = document.querySelector('.js-favourite');

let allCharacter = []; //array todo los pj
let serchList = [];
let favCharacter = []; //array personajs favoritos
//VARIABLES GLOBALES-> VARIABLES CON DATOS (PERSONAJES Y FAV)

//FUNCIONES

//fech del API
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    allCharacter = data;
    renderAllCharacters(data, allCharacter);
  });
//bucle para el array de datos
function renderAllCharacters(allCharacter) {
  for (const character of allCharacter) {
    renderCharacters(character);
  }
}
//función para pintar cada personaje con DOM avanzado
function renderCharacters(characterData) {
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const imgElement = document.createElement('img');
  const nameElement = document.createElement('h3');
  const statusElement = document.createElement('p');
  liElement.setAttribute('data-id', `${characterData.char_id}`);
  articleElement.setAttribute('class', 'card');
  imgElement.setAttribute('src', characterData.img);
  imgElement.setAttribute('alt', `${characterData.name}`);
  const nameText = document.createTextNode(characterData.name);
  const nameStatus = document.createTextNode(characterData.status);
  liElement.appendChild(articleElement);
  articleElement.appendChild(imgElement);
  articleElement.appendChild(nameElement);
  articleElement.appendChild(statusElement);
  listCharacter.appendChild(liElement);
}
//EVENTOS
/* btn.addEventListener('click', handleClick); */

//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
