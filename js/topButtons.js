import { storeInfo } from './ajax.js';
import { getPlot } from './plotsSizes.js';
import { drawnObjects } from './landscape.js';
import { addedObj } from './landscape.js';
import { reDraw } from './landscape.js';
import { canvas } from './landscape.js';
import { removeSelection } from './landscape.js';
import { plot } from './plotsSizes.js';
import { ways } from './leftButtons.js';
import { addedPath } from './leftButtons.js';
import { showDemo } from './templates.js';
import { restoreInfo } from './ajax.js';

export function createTopMenu() {
  let divPaint = document.createElement('div');
  divPaint.className = 'divPaint';
  document.getElementById('IPage').prepend(divPaint);
  createButton('getPlot', getPlot);
  createButton('new', showNew);
  createButton('save', save);
  createButton('deleteAll', deleteAll);
  createButton('lock', lock);
  createButton('unlock', unlock);
  createButton('delete', deleteObj);
  createButton('saveImage', savePicture);
  createButton('person', loginAccount);
  createLoginName();
  createButton('templates', showDemo);
}
export let currentUser = [];
if (localStorage.key('user')) {
  currentUser = JSON.parse(localStorage.getItem('user'));
}

let needToSaved;
function save() {
  if (Object.keys(currentUser).length === 0) {
    needToSaved = true;
    loginAccount();
  } else {
    storeInfo();
  }
}
export function showNew() {
  ways.splice(ways[0], ways.length);
  drawnObjects.splice(drawnObjects[0], drawnObjects.length);
  plot.W = 0;
  plot.H = 0;
  plot.X = 0;
  plot.Y = 0;
  plot.ratio = 0.65;
  reDraw();
}
function createButton(name, handler, left) {
  let divPaint = document.querySelector('.divPaint');
  let div = document.createElement('div');
  div.className = `size-button , ${name}`;
  div.style.marginLeft = left;
  div.addEventListener('click', handler);
  divPaint.append(div);
  let img = document.createElement('img');
  img.className = 'btnImg';
  img.src = `./img/${name}.png`;
  img.alt = name;
  div.prepend(img);
  if (name === 'person') {
    let loginWindow = document.createElement('div');
    loginWindow.className = 'loginWindow';
    let person = document.querySelector('.person');
    person.append(loginWindow);
    let exit = document.createElement('div');
    exit.className = 'exit';
    exit.textContent = 'Log off';
    loginWindow.append(exit);
    exit.addEventListener('mousedown', LogOff);
  }
}
import { askQuestion } from './landscape.js';
function LogOff() {
  storeInfo();
  window.removeEventListener('beforeunload', askQuestion);
  removeAll();
  window.location.reload();
}

function removeAll() {
  localStorage.removeItem('user');
  currentUser = [];
  let loginWindow = document.querySelector('.loginWindow');
  loginWindow.style.display = 'none';
  let login = document.querySelector('.login');
  login.remove();
 }

function savePicture() {
  removeSelection();
  reDraw();
  let dataURL = canvas.toDataURL();
  let link = document.createElement('a');
  link.href = dataURL;
  link.download = 'landskape.jpg';
  link.click();
}
function deleteObj() {
  if (!drawnObjects[0] && !ways[0]) return;
  if (addedObj) {
    drawnObjects.splice(drawnObjects.indexOf(addedObj), 1);
  }
  if (addedPath) {
    ways.splice(ways.indexOf(addedPath), 1);
  }
  reDraw();
  addedObj === null;
  addedPath === null;
}
function deleteAll() {
  if (!drawnObjects[0] && !ways[0]) return;
  drawnObjects.splice(drawnObjects[0], drawnObjects.length);
  ways.splice(ways[0], ways.length);
  reDraw();
}

let isError;
function loginAccount() {
  if (Object.keys(currentUser).length !== 0) {
    let loginWindow = document.querySelector('.loginWindow');
    loginWindow.style.display = 'block';
    document.addEventListener('mousedown', hideLoginWindow);
    return;
  }
  createForm();
  showCover();
  document.onkeydown = function (e) {
    if (e.key === 'Escape') {
      complete();
    }
  };
}
function hideLoginWindow(e) {
  let loginWindow = document.querySelector('.loginWindow');
  if (e.target.className !== 'loginWindow' && e.target.className !== 'exit') {
    loginWindow.style.display = 'none';
    document.removeEventListener('mousedown', hideLoginWindow);
  }
}
function createForm() {
  let container = document.createElement('div');
  container.id = 'personal-container';
  document.body.prepend(container);
  let form = document.createElement('form');
  form.id = 'person-form';
  container.append(form);
  let text = document.createElement('div');
  text.id = 'prompt-message';
  form.append(text);
  text.textContent = 'Enter your login information:';
  let inputs = document.createElement('div');
  form.append(inputs);
  let email = document.createElement('input');
  email.name = 'email';
  email.id = 'mail';
  email.type = 'email';
  email.placeholder = 'Email';
  inputs.append(email);
  let login = document.createElement('input');
  login.name = 'login';
  login.id = 'login';
  login.type = 'text';
  login.placeholder = 'Login';
  inputs.append(login);
  let password = document.createElement('input');
  password.name = 'password';
  password.id = 'Pass';
  password.type = 'text';
  password.placeholder = 'Password';
  inputs.append(password);
  let submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Enter';
  form.append(submit);
  let cancel = document.createElement('input');
  cancel.type = 'button';
  cancel.value = 'Cancel';
  cancel.name = 'cancel';
  form.append(cancel);
  container.style.display = 'block';
  form.elements.email.focus();
  form.email.value = '';
  form.password.value = '';
  form.login.value = '';
  form.addEventListener('submit', submitValue);
  form.cancel.addEventListener('click', complete);
}
function submitValue(e) {
  let form = document.getElementById('person-form');
  let mail = form.email.value;
  let password = form.password.value;
  let login = form.login.value;
  let arr = [form.email, form.password, form.login];
  isError = false;
  validateValue(arr);
  if (!isError) {
    currentUser = { login: login, mail: mail, password: password };
    let currUser = JSON.stringify(currentUser);
    localStorage.setItem('user', currUser);
    createLoginName();
    if (!needToSaved) {
      showNew();
      restoreInfo();
    } else storeInfo();
    complete();
  }
  e.preventDefault();
}
function validateValue(arr) {
  for (let item of arr) {
    if (!item.value) {
      item.style.borderColor = 'red';
      isError = true;
    } else {
      item.style.border = 'none';
    }
  }
}
function createLoginName() {
  let divPaint = document.querySelector('.divPaint');
  let person = divPaint.querySelector('.person');
  let p = document.createElement('p');
  p.textContent = currentUser.login;
  p.className = 'login';
  person.after(p);
}
function complete() {
  let container = document.getElementById('personal-container');
  container.style.display = 'none';
  document.onkeydown = null;
  hideCover();
}
function hideCover() {
  let form = document.getElementById('person-form');
  document.getElementById('cover-div').remove();
  form.cancel.removeEventListener('click', complete);
}
function showCover() {
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';
  document.body.append(coverDiv);
}
function lock() {
  let canvas = document.querySelector('canvas');
  canvas.style.pointerEvents = 'none';
}
function unlock() {
  let canvas = document.querySelector('canvas');
  canvas.style.pointerEvents = 'auto';
}
