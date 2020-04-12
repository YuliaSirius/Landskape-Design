import { addImage } from './landscape.js';
import { canvas } from './landscape.js';
import { plot } from './plotsSizes.js';
import { cnt } from './landscape.js';
import { reDraw } from './landscape.js';

export let image = {
  smooth: { quantity: 4, added: false, width: 40, height: 40 },
  angular: { quantity: 12, added: false, width: 40, height: 40 },
  trees: { quantity: 19, added: false, width: 60, height: 60 },
  shrubs: { quantity: 14, added: false, width: 40, height: 40 },
  grass: { quantity: 5, added: false, width: 40, height: 40 },
  flowers: { quantity: 6, added: false, width: 60, height: 60 },
  cars: { quantity: 4, added: false, width: 122.5, height: 55 },
  furniture: { quantity: 4, added: false, width: 100, height: 100 },
  scooters: { quantity: 2, added: false, width: 50, height: 30 },
  paving: { quantity: 10, added: false, width: 100, height: 100 },
  pathway: { quantity: 12, added: false, width: 100, height: 100 },
  pavement: { quantity: 12, added: false, width: 100, height: 100 },
  ponds: { quantity: 3, added: false, width: 120, height: 120 },
  pools: { quantity: 1, added: false, width: 120, height: 120 },
  fountains: { quantity: 4, added: false, width: 80, height: 80 },
  houses: { quantity: 2, added: false, width: 172, height: 136 },
  stairs: { quantity: 1, added: false, width: 100, height: 100 },
};

function createElem(sub, key) {
  if (!image[key].added) {
    for (let i = 0; i < image[key].quantity; i++) {
      let div = document.createElement('div');
      let img = document.createElement('img');
      div.className = 'catalog';
      img.className = 'btnImg';
      img.src = `./img/${key}/${i + 1}.png`;
      img.alt = key;
      img.style.maxWidth = '90%';
      img.style.maxHeight = '90%';
      sub.append(div);
      div.append(img);
      image[key].added = true;
    }
    sub.addEventListener('mousedown', mouseDownImage);
  }
}

let mouseDownImage = function (e) {
  if (e.target.className === 'catalog' || e.target.className === 'btnImg') {
    let arr = [...this.children];
    let number;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].children[0] === e.target || arr[i] === e.target) {
        number = i + 1;
      }
    }
    let angle = 0;
    let X = 0.5;
    let Y = 0.5;
    let W = image[this.id].width / plot.scale;
    let H = image[this.id].height / plot.scale;
    if (this.id === 'pathway') {
      drawPathWay(number);
    } else addImage(this.id, number, X, Y, W, H, angle);
  }
};

export function addEventMouseEnter() {
  let buttons = [...document.querySelectorAll('.button')];
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', mouseEnter);
  }
}

function mouseEnter() {
  let s = this.querySelector('.submenu');
  s.style.display = 'block';
  this.addEventListener('mouseleave', mouseLeave);
  mouseEnterSub(s);
}

function mouseEnterSub(s) {
  let arr = [...s.querySelectorAll('.catalog')];
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('mouseenter', function () {
      let sub = arr[i].querySelector('.sub');
      if (!sub) return;
      createElem(sub, sub.id);

      sub.style.display = 'flex';
      arr[i].addEventListener('mouseleave', function () {
        sub.style.display = 'none';
      });
    });
  }
}

function mouseLeave() {
  let s = this.querySelector('.submenu');
  s.style.display = 'none';
}

export let ways = [];
let path = {};

function drawPathWay(number) {
  path.pattern = new Image();
  path.pattern.onload = function () {
    drawP(path);
  };
  path.pattern.src = `./img/pathway/${number}.png`;
  path.number = number;
  path.coord = [];
  path.downCoord = [];
}

function drawP() {
  canvas.addEventListener('click', startdraw);
}

function startdraw(e) {
  let x = (e.clientX - plot.X * canvas.width) / (plot.W * plot.scale);
  let y = (e.clientY - plot.Y * canvas.height) / (plot.H * plot.scale);
  path.coord.push([x, y]);
  path.downCoord.push([x, y]);
  if (path.coord.length >= 2) {
    draw();
    canvas.removeEventListener('click', startdraw);
  }
}

function draw() {
  drawPath(path);
  ways.push(path);
  path = {};
}
let currentPath = null;

export function drawPath(obj) {
  cnt.fillStyle = 'rgba(0,0,0,0)';
  obj.way = new Path2D();
  let patt = cnt.createPattern(obj.pattern, 'repeat');
  cnt.fillStyle = patt;
  let X1 = obj.coord[0][0] * (plot.W * plot.scale) + plot.X * canvas.width;
  let X2 = obj.coord[1][0] * (plot.W * plot.scale) + plot.X * canvas.width;
  let Y1 = obj.coord[0][1] * (plot.H * plot.scale) + plot.Y * canvas.height;
  let Y2 = obj.coord[1][1] * (plot.H * plot.scale) + plot.Y * canvas.height;
  function getAngle() {
    let x = X2 - X1;
    let y = Y2 - Y1;
    if (x === 0) return y > 0 ? Math.PI : 0;
    let a = (Math.atan(y / x) * 180) / Math.PI;
    a = x >= 0 ? a + 90 : a + 270;
    return (Math.PI * a) / 180;
  }
  let angle = getAngle();
  if (angle >= Math.PI && angle <= Math.PI * 1.5) {
    cnt.beginPath();
    obj.way.moveTo(
      X1 - Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y1 + Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.lineTo(
      X2 - Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y2 + Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.lineTo(
      X2 + Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y2 - Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.lineTo(
      X1 + Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y1 - Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.closePath();
    cnt.fill(obj.way);
  } else if (angle >= 0 && angle <= Math.PI * 0.5) {
    cnt.beginPath();
    obj.way.moveTo(
      X1 - Math.cos(getAngle()) * (plot.scale / 2),
      Y1 - Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.lineTo(
      X2 - Math.cos(getAngle()) * (plot.scale / 2),
      Y2 - Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.lineTo(
      X2 + Math.cos(getAngle()) * (plot.scale / 2),
      Y2 + Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.lineTo(
      X1 + Math.cos(getAngle()) * (plot.scale / 2),
      Y1 + Math.sin(getAngle()) * (plot.scale / 2)
    );
    obj.way.closePath();
    cnt.fill(obj.way);
  } else {
    cnt.beginPath();
    obj.way.moveTo(
      X1 - Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y1 + Math.abs(Math.sin(getAngle()) * (plot.scale / 2))
    );
    obj.way.lineTo(
      X2 - Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y2 + Math.abs(Math.sin(getAngle()) * (plot.scale / 2))
    );
    obj.way.lineTo(
      X2 + Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y2 - Math.abs(Math.sin(getAngle()) * (plot.scale / 2))
    );
    obj.way.lineTo(
      X1 + Math.abs(Math.cos(getAngle()) * (plot.scale / 2)),
      Y1 - Math.abs(Math.sin(getAngle()) * (plot.scale / 2))
    );
    obj.way.closePath();
    cnt.fill(obj.way);
  }
  canvas.addEventListener('mousedown', getPath);
  canvas.addEventListener('mouseup', letGoPath);
}

function drawSel(coord) {
  for (let item of coord) {
    cnt.lineWidth = 1;
    cnt.beginPath();
    cnt.arc(
      item[0] * (plot.W * plot.scale) + plot.X * canvas.width,
      item[1] * (plot.H * plot.scale) + plot.Y * canvas.height,
      7,
      0,
      2 * Math.PI
    );
    cnt.fill();
    cnt.stroke();
  }
}

let down = [];
export let addedPath;
function getPath(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  down = [x, y];
  currentPath = null;
  addedPath = null;
  for (let item of ways) {
    if (cnt.isPointInPath(item.way, x, y)) {
      currentPath = item;
      addedPath = item;
      cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
      cnt.strokeStyle = 'rgb(68, 109, 245)';
      drawSel(currentPath.coord);
    }
  }
  canvas.addEventListener('mousemove', movePath);
}

function movePath(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  if (!currentPath) {
    return;
  }
  currentPath.coord[0][0] =
    (currentPath.downCoord[0][0] * (plot.W * plot.scale) + (x - down[0])) /
    (plot.W * plot.scale);
  currentPath.coord[0][1] =
    (currentPath.downCoord[0][1] * (plot.H * plot.scale) + (y - down[1])) /
    (plot.H * plot.scale);
  currentPath.coord[1][0] =
    (currentPath.downCoord[1][0] * (plot.W * plot.scale) + (x - down[0])) /
    (plot.W * plot.scale);
  currentPath.coord[1][1] =
    (currentPath.downCoord[1][1] * (plot.H * plot.scale) + (y - down[1])) /
    (plot.H * plot.scale);
  reDraw();
  cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
  cnt.strokeStyle = 'rgb(68, 109, 245)';
  drawSel(currentPath.coord);
}

function letGoPath() {
  if (currentPath) {
    cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
    cnt.strokeStyle = 'rgb(68, 109, 245)';
    currentPath.downCoord[0][0] = currentPath.coord[0][0];
    currentPath.downCoord[0][1] = currentPath.coord[0][1];
    currentPath.downCoord[1][0] = currentPath.coord[1][0];
    currentPath.downCoord[1][1] = currentPath.coord[1][1];
    drawSel(currentPath.coord);
  }
  currentPath = null;
  canvas.removeEventListener('mousemove', movePath);
}
