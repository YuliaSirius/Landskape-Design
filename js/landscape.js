import { zoom } from './events.js';
import { zoomStep } from './events.js';
import { plot } from './plotsSizes.js';
import { image } from './leftButtons.js';
import { drawPath } from './leftButtons.js';
import { ways } from './leftButtons.js';
import { addEventMouseEnter } from './leftButtons.js';
import { currentUser } from './topButtons.js';
import { createTopMenu } from './topButtons.js';
import { addListener } from './events.js';
import { addHtml } from './partOfHtml.js';
import { restoreInfo } from './ajax.js';
import { getPlot } from './plotsSizes.js';

export let canvas;
export let cnt;

 function resize(canvas) {
  let displayWidth = canvas.clientWidth;
  let displayHeight = canvas.clientHeight;
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    cnt.fillRect(0, 0, canvas.width, canvas.height);
  }
}
let start;
function startMain() {
  start = true;
  canvas = document.getElementById('cnv');
  cnt = canvas.getContext('2d');
  resize(canvas);
  plot.scale = canvas.width / 40;
  createTopMenu();
  restoreInfo();
  window.addEventListener('resize', resizeCanvas);
  reDraw();
}

export function resizeCanvas() {
  resize(canvas);
  if (plot.W === 0) {
    plot.scale = canvas.width / 40;
  } else {
    plot.scale = Math.floor(
      Math.min(
        (canvas.width * plot.ratio) / plot.W,
        (canvas.height * plot.ratio) / plot.H
      )
    );
  }
  plot.X =
    Math.floor(
      ((canvas.width - plot.W * plot.scale) / 2 / canvas.width) * 1000
    ) / 1000;
  plot.Y =
    Math.floor(
      ((canvas.height - plot.H * plot.scale) / 2 / canvas.height) * 1000
    ) / 1000;

  reDraw();
}

export let drawnObjects = [];

export function reDraw() {
  cnt.clearRect(0, 0, canvas.width, canvas.height);
  cnt.fillStyle = 'rgba(202, 200, 200, 0.2)';
    drawLines(plot.scale);
  drawPlot();

  if (plot.W) {
    drawArrows(
      plot.X * canvas.width,
      plot.Y * canvas.height,
      plot.X * canvas.width + plot.W * plot.scale,
      plot.Y * canvas.height + plot.H * plot.scale,
      plot.scale
    );
  }
  for (let item of drawnObjects) {
    drawImage(item);
  }
  for (let item of ways) {
    drawPath(item);
  }
}

export function drawLines(step) {
  cnt.strokeStyle = 'black';
  cnt.lineWidth = 0.5;
  for (let i = 0 + step; i <= canvas.width; i += step) {
    cnt.beginPath();
    cnt.moveTo(i, canvas.height - cnt.lineWidth);
    cnt.lineTo(i, cnt.lineWidth);
    cnt.stroke();
  }
  for (let i = 0 + step; i <= canvas.height; i += step) {
    cnt.beginPath();
    cnt.moveTo(cnt.lineWidth, i);
    cnt.lineTo(canvas.width - cnt.lineWidth, i);
    cnt.stroke();
  }
}
let grass;
export function drawPlot() {
  if (!grass) {
    grass = new Image();
    grass.onload = function () {
      createPlot(
        plot.X * canvas.width,
        plot.Y * canvas.height,
        plot.W * plot.scale,
        plot.H * plot.scale
      );
    };
    grass.src = `./img/grassbg.png`;
  } else {
    createPlot(
      plot.X * canvas.width,
      plot.Y * canvas.height,
      plot.W * plot.scale,
      plot.H * plot.scale
    );
  }
}

function createPlot(X, Y, W, H) {
  let patt = cnt.createPattern(grass, 'repeat');
  cnt.beginPath();
  cnt.fillStyle = patt;
  cnt.fillRect(X, Y, W, H);
  cnt.strokeStyle = 'black';
  cnt.lineWidth = 3;
  cnt.strokeRect(X, Y, W, H);
}

function drawArrows(x, y, length, height, step) {
  let offset = Math.min(0.05 * canvas.width, 0.05 * canvas.height);
  cnt.strokeStyle = 'blue';
  cnt.lineWidth = 1;
  cnt.beginPath();
  cnt.moveTo(x - offset * 1.4, height + offset);
  cnt.lineTo(length + 25, height + offset);
  cnt.stroke();
  cnt.beginPath();
  cnt.moveTo(x - offset, height + offset * 1.4);
  cnt.lineTo(x - offset, y - 25);
  cnt.stroke();
  cnt.fillStyle = 'blue';
  cnt.font = '600 2.4vmin Arial';
  cnt.textBaseline = 'middle';
  cnt.textAlign = 'center';
  let amountY = 0;
  let amountX = 0;

  for (let i = x; i <= length + 0.9 * step; i += step * 5) {
    cnt.beginPath();
    cnt.moveTo(i, height + offset - 4);
    cnt.lineTo(i, height + offset + 4);
    cnt.stroke();
    cnt.fillText(`${amountX}`, i, height + offset + 20);
    amountX += 5;
  }

  cnt.beginPath();
  cnt.moveTo(length, height + offset - 4);
  cnt.lineTo(length, height + offset + 4);
  cnt.stroke();
  cnt.fillText(`${plot.W}`, length, height + offset + 20);

  for (let i = height; i >= y - 0.9 * step; i -= step * 5) {
    cnt.beginPath();
    cnt.moveTo(x - offset - 4, i);
    cnt.lineTo(x - offset + 4, i);
    cnt.stroke();
    cnt.fillText(`${amountY}`, x - offset - 25, i);
    amountY += 5;
  }

  cnt.beginPath();
  cnt.moveTo(x - offset - 4, y);
  cnt.lineTo(x - offset + 4, y);
  cnt.stroke();
  cnt.fillText(`${plot.H}`, x - offset - 25, y);

  cnt.beginPath();
  cnt.moveTo(length + 25, height + offset + 4);
  cnt.lineTo(length + 25, height + offset - 4);
  cnt.lineTo(length + 25 + 14, height + offset);
  cnt.fill();
  cnt.beginPath();
  cnt.moveTo(x - offset - 4, y - 25);
  cnt.lineTo(x - offset + 4, y - 25);
  cnt.lineTo(x - offset, y - 25 - 14);
  cnt.fill();
}

export function addImage(sub, number, X, Y, W, H, selectX, selectY, angle) {
  let img = new Image();
  img.Xshare = X;
  img.Yshare = Y;
  img.widthShare = Math.floor(W * 1000) / 1000;
  img.heightShare = Math.floor(H * 1000) / 1000;
  img.angle = angle;
  img.s = sub;
  img.num = number;
  img.selectX = Math.floor(selectX * 1000) / 1000;
  img.selectY = Math.floor(selectY * 1000) / 1000;

  if (!img.selectX) {
    img.selectX = 1;
  }
  if (!img.selectY) {
    img.selectY = 1;
  }
  if (!img.angle) {
    img.angle = 0;
  }
  img.addEventListener('load', function () {
    drawnObjects.push(img);
    drawImage(img);
  });
  img.src = `./img/${sub}/${number}.png`;
}

function drawImage(img) {
  if (!plot.W) {
    getPlot();
  } else {
    img.X = plot.X * canvas.width + img.Xshare * plot.W * plot.scale;
    img.Y = plot.Y * canvas.height + img.Yshare * plot.H * plot.scale;
    img.W = img.widthShare * plot.scale * img.selectX;
    img.H = img.heightShare * plot.scale * img.selectY;
  }

  let rotateX = img.X + img.W / 2;
  let rotateY = img.Y + img.H / 2;
  cnt.save();
  cnt.translate(rotateX, rotateY);
  cnt.rotate(img.angle);
  cnt.translate(-rotateX, -rotateY);
  cnt.drawImage(img, img.X, img.Y, img.W, img.H);
  cnt.restore();

  cnt.fillStyle = 'rgba(0, 0, 0,0)';
  let rx = img.W / 2;
  let ry = img.H / 2;
  let XY = getX1Y1(img, rx, ry);
  img.template = new Path2D();
  img.template.moveTo(XY[0], XY[1]);
  rx = img.X - img.W - (img.X - img.W / 2);
  ry = img.H / 2;
  XY = getX1Y1(img, rx, ry);
  img.template.lineTo(XY[0], XY[1]);
  rx = img.X - img.W - (img.X - img.W / 2);
  ry = img.Y - (img.Y + img.H / 2);
  XY = getX1Y1(img, rx, ry);
  img.template.lineTo(XY[0], XY[1]);
  ry = img.Y - (img.Y + img.H / 2);
  rx = img.W / 2;
  XY = getX1Y1(img, rx, ry);
  img.template.lineTo(XY[0], XY[1]);
  img.template.closePath();
  cnt.fill(img.template);

  canvas.addEventListener('mousedown', getObj);
}

let currObj;
let topLeft;
let topRight;
let bottomLeft;
let bottomRight;
let top;
let bottom;
let right;
let left;
let rotation;

export let addedObj;
export function getObj(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  currObj = null;
  addedObj = null;
  // mousedown on objects
  for (let item of drawnObjects) {
    if (cnt.isPointInPath(item.template, x, y)) {
      currObj = item;
      addedObj = item;
      item.elemLeft = x - item.X;
       item.elemTop = y - item.Y;
          if (!item.rotation) {
        cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
        cnt.strokeStyle = 'rgb(68, 109, 245)';
        drawSelect(item);
        cnt.fillStyle = 'black';
        drawSize(item);
      }
    }
    if (item.rotation) {
      if (
        cnt.isPointInPath(item.rotation, x, y) ||
        cnt.isPointInPath(item.topLeft, x, y) ||
        cnt.isPointInPath(item.topRight, x, y) ||
        cnt.isPointInPath(item.bottomLeft, x, y) ||
        cnt.isPointInPath(item.bottomRight, x, y) ||
        cnt.isPointInPath(item.bottom, x, y) ||
        cnt.isPointInPath(item.top, x, y) ||
        cnt.isPointInPath(item.right, x, y) ||
        cnt.isPointInPath(item.left, x, y)
      ) {
        currObj = item;
        addedObj = item;
      }
    }
    cnt.fillStyle = 'rgba(0, 0, 0, 0)';
    cnt.strokeStyle = 'rgba(0, 0, 0, 0)';
    drawSelect(item);
    // mousedown on select
    if (cnt.isPointInPath(item.bottomRight, x, y)) {
      bottomRight = true;
    }
    if (cnt.isPointInPath(item.bottomLeft, x, y)) {
      bottomLeft = true;
    }
    if (cnt.isPointInPath(item.topRight, x, y)) {
      topRight = true;
    }
    if (cnt.isPointInPath(item.topLeft, x, y)) {
      topLeft = true;
    }
    if (cnt.isPointInPath(item.right, x, y)) {
      right = true;
    }
    if (cnt.isPointInPath(item.left, x, y)) {
      left = true;
    }
    if (cnt.isPointInPath(item.bottom, x, y)) {
      bottom = true;
    }
    if (cnt.isPointInPath(item.top, x, y)) {
      top = true;
    }
    if (cnt.isPointInPath(item.rotation, x, y)) {
      rotation = true;
    }
  }
  canvas.addEventListener('mousemove', moveObj);
  canvas.addEventListener('mouseup', letGoObj);
}

function getX1Y1(image, rx, ry) {
  let x1 =
    image.X +
    image.W / 2 +
    rx * Math.cos(image.angle + Math.PI) -
    ry * Math.sin(image.angle + Math.PI);
  let y1 =
    image.Y +
    image.H / 2 +
    rx * Math.sin(image.angle + Math.PI) +
    ry * Math.cos(image.angle + Math.PI);
  let coord = [x1, y1];
  return coord;
}

function drawSelect(image) {
  let size = 7;
  cnt.lineWidth = 1;
  cnt.beginPath();
  let rx = image.W / 2;
  let ry = image.H / 2;
  let XY = getX1Y1(image, rx, ry);
  image.template = new Path2D();
  image.template.moveTo(XY[0], XY[1]);
  rx = image.X - image.W - (image.X - image.W / 2);
  ry = image.H / 2;
  XY = getX1Y1(image, rx, ry);
  image.template.lineTo(XY[0], XY[1]);
  rx = image.X - image.W - (image.X - image.W / 2);
  ry = image.Y - (image.Y + image.H / 2);
  XY = getX1Y1(image, rx, ry);
  image.template.lineTo(XY[0], XY[1]);
  ry = image.Y - (image.Y + image.H / 2);
  rx = image.W / 2;
  XY = getX1Y1(image, rx, ry);
  image.template.lineTo(XY[0], XY[1]);
  image.template.closePath();
  cnt.stroke(image.template);
  ///////////////////////////////
  rx = image.W / 2;
  ry = image.H / 2;
  image.topLeft = new Path2D();
  XY = getX1Y1(image, rx, ry);
  image.topLeft.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.topLeft);
  cnt.stroke(image.topLeft);
  /////////////////////////////////
  ry = image.Y - (image.Y + image.H / 2);
  rx = image.W / 2;
  XY = getX1Y1(image, rx, ry);
  image.bottomRight = new Path2D();
  image.bottomRight.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.bottomRight);
  cnt.stroke(image.bottomRight);
  /////////////////////////////////
  ry = image.Y - (image.Y + image.H / 2);
  rx = image.X - image.W - (image.X - image.W / 2);
  XY = getX1Y1(image, rx, ry);
  image.bottomLeft = new Path2D();
  image.bottomLeft.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.bottomLeft);
  cnt.stroke(image.bottomLeft);
  ///////////////////////////////////
  rx = image.X - image.W - (image.X - image.W / 2);
  ry = image.H / 2;
  XY = getX1Y1(image, rx, ry);
  image.topRight = new Path2D();
  image.topRight.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.topRight);
  cnt.stroke(image.topRight);
  //////////////////////////////////////////
  rx = image.X - image.W - (image.X - image.W / 2);
  ry = image.H / 2 - image.H / 2;
  XY = getX1Y1(image, rx, ry);
  image.right = new Path2D();
  image.right.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  image.right.X = XY[0];
  image.right.Y = XY[1];
  cnt.fill(image.right);
  cnt.stroke(image.right);
  /////////////////////////////////////////////
  rx = image.W / 2;
  ry = image.H / 2 - image.H / 2;
  XY = getX1Y1(image, rx, ry);
  image.left = new Path2D();
  image.left.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.left);
  cnt.stroke(image.left);
  ///////////////////////////////////////
  rx = image.W / 2 - image.W / 2;
  ry = image.H / 2;
  XY = getX1Y1(image, rx, ry);
  image.top = new Path2D();
  image.top.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  (image.top.X = XY[0]), (image.top.Y = XY[1]), cnt.fill(image.top);
  cnt.stroke(image.top);
  ///////////////////////////////////////
  ry = image.Y - (image.Y + image.H / 2);
  rx = image.W / 2 - image.W / 2;
  XY = getX1Y1(image, rx, ry);
  image.bottom = new Path2D();
  image.bottom.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.bottom);
  cnt.stroke(image.bottom);
  ///////////////////////////////////////////
  rx = image.W / 2 - image.W / 2;
  ry = image.H / 2 + 25;
  XY = getX1Y1(image, rx, ry);
  image.rotation = new Path2D();
  image.rotation.arc(XY[0], XY[1], size, 0, 2 * Math.PI);
  cnt.fill(image.rotation);
  cnt.stroke(image.rotation);
  ///////////////////////////////////
  cnt.beginPath();
  rx = image.W / 2 - image.W / 2;
  ry = image.H / 2 + size;
  XY = getX1Y1(image, rx, ry);
  cnt.moveTo(XY[0], XY[1]);
  rx = image.W / 2 - image.W / 2;
  ry = image.H / 2 + size + 25 - size * 2;
  XY = getX1Y1(image, rx, ry);
  cnt.lineTo(XY[0], XY[1]);
  cnt.stroke();
}

function drawSize(image) {
  let ry = image.Y - (image.Y + image.H / 2) - 25;
  let rx = image.W / 2 - image.W / 2;
  let XY = getX1Y1(image, rx, ry);
  cnt.textBaseline = 'middle';
  cnt.textAlign = 'center';
  cnt.font = '500 13px Arial';
  // Bottom number
  cnt.fillText(`${(image.W / plot.scale).toFixed(1)} m`, XY[0], XY[1]);
  // Left number
  rx = image.X - image.W - (image.X - image.W / 2) - 25;
  ry = image.H / 2 - image.H / 2;
  XY = getX1Y1(image, rx, ry);
  cnt.fillText(`${(image.H / plot.scale).toFixed(1)} m`, XY[0], XY[1]);
}

let eX = [];
let eY = [];

function moveObj(e) {
  eX.push(e.offsetX);
  eY.push(e.offsetY);
  if (eX.length > 2) {
    eX.shift();
  }
  if (eY.length > 2) {
    eY.shift();
  }
  if (!currObj) {
    return;
  }
  let max = 550;
  let min = 25;
  let index = 0.02;

  if (topLeft) {
    if (
      (e.offsetX < eX[0] || e.offsetY < eY[0]) &&
      currObj.H < max &&
      currObj.W < max
    ) {
      currObj.selectX += index;
      currObj.selectY += index;
    } else if (currObj.H > min && currObj.W > min) {
      currObj.selectX -= index;
      currObj.selectY -= index;
    }
  } else if (topRight) {
    if (
      (e.offsetX > eX[0] || e.offsetY < eY[0]) &&
      currObj.H < max &&
      currObj.W < max
    ) {
      currObj.selectX += index;
      currObj.selectY += index;
    } else if (currObj.H > min && currObj.W > min) {
      currObj.selectX -= index;
      currObj.selectY -= index;
    }
  } else if (bottomLeft) {
    if (
      (e.offsetX > eX[0] || e.offsetY > eY[0]) &&
      currObj.H < max &&
      currObj.W < max
    ) {
      currObj.selectX += index;
      currObj.selectY += index;
    } else if (currObj.H > min && currObj.W > min) {
      currObj.selectX -= index;
      currObj.selectY -= index;
    }
  } else if (bottomRight) {
    if (
      (e.offsetX < eX[0] || e.offsetY > eY[0]) &&
      currObj.H < max &&
      currObj.W < max
    ) {
      currObj.selectX += index;
      currObj.selectY += index;
    } else if (currObj.H > min && currObj.W > min) {
      currObj.selectX -= index;
      currObj.selectY -= index;
    }
  } else if (bottom) {
    if (e.offsetY > eY[0] && currObj.H < max) {
      currObj.selectY += index;
    } else if (currObj.H > min) {
      currObj.selectY -= index;
    }
  } else if (top) {
    if (e.offsetY < eY[0] && currObj.H < max) {
      currObj.selectY += index;
    } else if (currObj.H > min) {
      currObj.selectY -= index;
    }
  } else if (right) {
    if (e.offsetX > eX[0] && currObj.W < max) {
      currObj.selectX += index;
    } else if (currObj.W > min) {
      currObj.selectX -= index;
    }
  } else if (left) {
    if (e.offsetX < eX[0] && currObj.W < max) {
      currObj.selectX += index;
    } else if (currObj.W > min) {
      currObj.selectX -= index;
    }
  } else if (rotation) {
    let mx = e.clientX - currObj.X - currObj.W / 2;
    let my = e.clientY - currObj.Y - currObj.H / 2;
    currObj.angle = Math.atan2(my, mx) + Math.PI / 2;
  } else {
    currObj.Yshare =
      (e.offsetY - currObj.elemTop - plot.Y * canvas.height) /
      (plot.H * plot.scale);
    currObj.Xshare =
      (e.offsetX - currObj.elemLeft - plot.X * canvas.width) /
      (plot.W * plot.scale);
  }
  reDraw();

  cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
  cnt.strokeStyle = 'rgb(68, 109, 245)';
  drawSelect(currObj);
  cnt.fillStyle = 'black';
  drawSize(currObj);
}

function letGoObj() {
  reDraw();
  if (currObj) {
    cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
    cnt.strokeStyle = 'rgb(68, 109, 245)';
    drawSelect(currObj);
    cnt.fillStyle = 'black';
    drawSize(currObj);
  }
  currObj = null;
  topLeft = false;
  topRight = false;
  bottomLeft = false;
  bottomRight = false;
  top = false;
  bottom = false;
  right = false;
  left = false;
  rotation = false;
  canvas.removeEventListener('mousemove', moveObj);
}

export function removeSelection() {
  topLeft = false;
  topRight = false;
  bottomLeft = false;
  bottomRight = false;
  top = false;
  bottom = false;
  right = false;
  left = false;
  rotation = false;
}

////////  SPA
let logo = document.querySelector('.logo');
logo.addEventListener('click', switchToMainPage);

let about = document.querySelector('.about');
about.addEventListener('click', switchToAboutPage);

window.onhashchange = switchToStateFromURLHash;
let count = 1;
let SPAState = {};
let pictures = {
  1: './img/img1.png',
  2: './img/img2.png',
  3: './img/img3.png',
  4: './img/img4.png',
};
function switchToStateFromURLHash() {
  let URLHash = window.location.hash;
  let stateStr = URLHash.substr(1);
  if (stateStr != '') {
    SPAState = { pagename: stateStr };
  } else SPAState = { pagename: 'Main' };

  let page = document.getElementById('IPage');
  page.innerHTML = '';
  switch (SPAState.pagename) {
    case 'Main':
      page.innerHTML = addHtml();
      addListener();
      addEventMouseEnter();
      if (!start) {
        startMain();
      } else {
        canvas = document.getElementById('cnv');
        cnt = canvas.getContext('2d');
        resize(canvas);
        createTopMenu();
        reDraw();
      }
      break;
    case 'About':
      page.innerHTML = `<div class="about_text"><h3>Application description</h3><p>
       The application allows you to create an individual plan of a suburban area
       indicating the boundaries of the site (fence), the arrangement of capital
        structures (house, bathhouse, garage, outbuildings, pool, gazebo, etc.). 
        Allows you to break down the territory of the site into functional areas 
        (barbecue area, recreation area, work area, sanitary area, etc.). To design the
         form and type of pavement, walkway, car race, lawn zone, garden zone with the area
          of ​​each zone and when choosing the coating material (paving slabs, stone, asphalt,
             concrete, lawn, etc.), its required consumption. Arrange the trees and shrubs
              with the calculation of their quantity required for this site.
        If necessary, the site plan and created elements can be displayed in jpeg format
       for easy storage and printing on paper if necessary.
      The calculation results are summarized in tabular form with a brief description
       (area, type of coating, volume of material, etc.).</p></div>`;
      count = 1;
      showPictures();
      break;
  }
}

function switchToState(newState) {
  let stateStr = newState.pagename;
  location.hash = stateStr;
}
function switchToMainPage() {
  switchToState({ pagename: 'Main' });
}
function switchToAboutPage() {
  switchToState({ pagename: 'About' });
}

switchToStateFromURLHash();

function showPictures() {
  setTimeout(() => show(count), 2000);
}
function show(key) {
  if (SPAState.pagename !== 'About') return;
  count++;
  let page = document.getElementById('IPage');
  page.innerHTML += `<img class="picture${key}" src=${pictures[key]}  />`;

  if (key > 1) {
    let picture = document.querySelector(`.picture${key - 1}`);
    picture.style.animation = 'my-animation1';
  }
  if (count > Object.keys(pictures).length) {
    return;
  } else showPictures();
}
