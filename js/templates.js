import { showNew } from './topButtons.js';
import { ways } from './leftButtons.js';
// import { cnt } from './landscape.js';
import { canvas } from './landscape.js';
import { reDraw } from './landscape.js';
import { plot } from './plotsSizes.js';
import { addImage } from './landscape.js';
import { resizeCanvas } from './landscape.js';
import { drawPath } from './leftButtons.js';


let addedDemo;

export function showDemo() {
  if (addedDemo) return;
  createImages();
  start();
  createReadme();
  addedDemo = true;
}

function createImages() {
  for (let i = 1; i < 5; i++) {
    let img = document.createElement('img');
    img.src = `./img/img${i}.png`;
    img.className = `imgDemo${i}`;
    document.body.append(img);
  }
}

let offsetX;
let offsetY;
let scaleX;
let scaleY;

function start() {
  requestAnimationFrame(tick);
  offsetX = 0;
  offsetY = 0;
  scaleX = 1;
  scaleY = 1;
}

function tick() {
  scaleX += 0.03;
  scaleY += 0.03;
  offsetX += 6.5;
  offsetY += 2.8;
  if (
    offsetX > document.documentElement.clientWidth - 50 * scaleX - 100 ||
    offsetY > document.documentElement.clientHeight - 50 * scaleY - 100
  ) {
    showReadme();
    return;
  }
  update();
  requestAnimationFrame(tick);
}

function update() {
  // элементы не вынесены на отдельный GPU-слой, потому что после того, как
  // для них сработает css-анимация transform, браузер вынесет их на отдельный слой самостоятельно
  let img1 = document.querySelector('.imgDemo1');
  img1.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${offsetX},${offsetY})`;
  let img2 = document.querySelector('.imgDemo2');
  img2.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${-offsetX},${offsetY})`;
  let img3 = document.querySelector('.imgDemo3');
  img3.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${-offsetX},${-offsetY})`;
  let img4 = document.querySelector('.imgDemo4');
  img4.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${offsetX},${-offsetY})`;
}

function createReadme() {
  let readme = document.createElement('div');
  readme.className = `readme`;
  let p = document.createElement('p');
  p.className = `readmeText`;
  p.textContent = 'You can choose one of these templates';
  document.body.append(readme);
  readme.append(p);
  let submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Cancel';
  readme.append(submit);
  submit.addEventListener('click', hideReadme);
  document.onkeydown = function (e) {
    if (e.key === 'Escape') {
      hideReadme();
    }
  };
}
let isAdded;
function showReadme() {
  let readme = document.querySelector('.readme');
  readme.style.display = 'flex';
  document.addEventListener('click', chooseTemplate);
  isAdded = false;
}

function hideReadme() {
  let readme = document.querySelector('.readme');
  readme.remove();
  for (let i = 1; i < 5; i++) {
    let img = document.querySelector(`.imgDemo${i}`);
    img.remove();
  }
  addedDemo = false;
  document.onkeydown = null;
}

function chooseTemplate(e) {
  let img1 = document.querySelector('.imgDemo1');
  let img2 = document.querySelector('.imgDemo2');
  let img3 = document.querySelector('.imgDemo3');
  let img4 = document.querySelector('.imgDemo4');
  if (e.target === img1) {
    let count = 'templ1';
    showTemplate(count);
  } else if (e.target === img2) {
    let count = 'templ2';
    showTemplate(count);
  } else if (e.target === img3) {
    let count = 'templ3';
    showTemplate(count);
  } else if (e.target === img4) {
    let count = 'templ4';
    showTemplate(count);
  } else return;
}

let ajaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';

function showTemplate(count) {
  showNew();
  resizeCanvas()
  if (isAdded) return;
  $.ajax({
    url: ajaxHandlerScript,
    type: 'POST',
    cache: false,
    dataType: 'json',
    data: { f: 'READ', n: 'MIASNIKOVA_LANDSKAPE_TEMPLATES' },
    success: readReady,
    error: errorHandler,
  });

  function readReady(callresult) {
    if (callresult.error != undefined) alert(callresult.error);
    else if (callresult.result != '') {
      let savedTemplates = JSON.parse(callresult.result);
      drawTemplates(savedTemplates[count]);
    }
  }

  function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
  }
}

function drawTemplates(template) {
 
     for (let key in template) {
    if (key === 'pl') {
      plot.X = template[key].X;
      plot.Y = template[key].Y;
      plot.W = template[key].W;
      plot.H = template[key].H;
      plot.ratio = template[key].ratio;
      plot.scale = Math.floor(
        Math.min(
          (canvas.width * plot.ratio) / plot.W,
          (canvas.height * plot.ratio) / plot.H
        )
      );
    } else if (key === 'path') {
      for (let item of template[key]) {
        item.pattern = new Image();
        item.pattern.onload = function () {
          drawPath(item);
        };
        item.pattern.src = `./img/pathway/${item.number}.png`;
        ways.push(item);
      }
    } else {
      addImage(
        template[key][0],
        template[key][1],
        template[key][2],
        template[key][3],
        template[key][4],
        template[key][5],
        template[key][6],
        template[key][7],
        template[key][8]
      );
    }
  }
  isAdded = true;
  hideReadme();
 
  reDraw();
}
