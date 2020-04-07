import { addImage } from './landscape.js';
import { canvas } from './landscape.js';
import { plot } from './plotsSizes.js';
import { cnt } from './landscape.js';
import { reDraw } from './landscape.js';

export let image = {
  smooth: { quantity: 8, added: false, width: 40, height: 40 },
  angular: { quantity: 18, added: false, width: 40, height: 40 },
  trees: { quantity: 25, added: false, width: 60, height: 60 },
  shrubs: { quantity: 16, added: false, width: 40, height: 40 },
  grass: { quantity: 5, added: false, width: 40, height: 40 },
  flowers: { quantity: 6, added: false, width: 60, height: 60 },
  cars: { quantity: 3, added: false, width: 122.5, height: 55 },
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
    let X = canvas.width / 2;
    let Y = canvas.height / 2;
    let W = image[this.id].width;
    let H = image[this.id].height;

    if (this.id === 'pathway') {
      drawPathWay(number);
    } 
    else
     addImage(this.id, number, X, Y, W, H, angle);
  }
};

let buttons = [...document.querySelectorAll('.button')];

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mouseenter', mouseEnter);
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

export let pathWays = [];
export let pathCoord = [];
let downCoord = [];
let pattern;
export let ways = [];
let path;

export function drawPathWay(number) {

















  
  canvas.addEventListener('click', startDraw);

  function startDraw(e) {
    let x = e.clientX;
    let y = e.clientY;
    cnt.fillStyle = 'white';
    cnt.beginPath();
    cnt.arc(x, y, 8, 0, 2 * Math.PI);
    cnt.fill();
    pathCoord.push([x, y]);
    downCoord.push([x, y]);
    canvas.addEventListener('contextmenu', finishDrawing);
  }

  function finishDrawing(e) {
    e.preventDefault();
    cnt.lineJoin = 'bevel';
    cnt.lineCap = 'butt';
    pattern = new Image();
    pattern.onload = drawPattern();

    function drawPattern() {
      pattern.src = `/img/pathway/${number}.png`;
      path = new Path2D();
      let patt = cnt.createPattern(pattern, 'repeat');
      // cnt.fillStyle = 'black';
      // for (let i of pathCoord) {
      //   // var p = new Path2D('M10 10 h 80 v 80 h -80 Z');
      //   // ctx.fill(p);
      //   path.rect(i[0], i[1], i + (1)[0] - i[0], i + (1)[1] - i[1]);
      // }
      // cnt.fill(path);

      cnt.lineWidth = plot.scale;
      cnt.strokeStyle = patt;
      // cnt.strokeStyle = 'rgba(0, 0, 0, 0)';
      path.moveTo(pathCoord[0][0], pathCoord[0][1]);
      for (let i of pathCoord) {
        path.lineTo(i[0], i[1]);
      }
      cnt.stroke(path);

      // cnt.fillStyle = 'black';
      // // cnt.lineWidth = 1;
      // cnt.strokeStyle = 'black';
      // path.template = new Path2D();

      // path.template.moveTo(pathCoord[0][0], pathCoord[0][1]);
      // console.log(pathCoord);
      // for (let i of pathCoord) {
      //   // path.template.rect(i[0], i[1], 100,plot.scale);
      //   // }
      //   path.template.lineTo(i[0], i[1]);
      //   // path.template.lineTo(XY[0], XY[1]);

      //   // path.template.lineTo(XY[0], XY[1]);
      // }
      // // path.template.closePath();
      // cnt.stroke(path.template);

      // let shiftX = [];
      // let shiftY = [];
      // for (let item of pathCoord) {
      //   shiftX.push(item[0]);
      //   shiftY.push(item[1]);
      // }
      // path.X = Math.min(...shiftX);
      // path.Y = Math.min(...shiftY);
      path.coord = pathCoord;
      path.number = number;
      pathWays.push([pathCoord, number]);
      drawSel(pathCoord);
    }
    ways.push(path);
    canvas.addEventListener('mousedown', getPath);
    canvas.removeEventListener('click', startDraw);
    canvas.removeEventListener('contextmenu', finishDrawing);
  }
  pathCoord = [];
}

function drawSel(coord) {
  cnt.fillStyle = 'rgba(255, 255, 255, 0.6)';
  cnt.strokeStyle = 'rgb(68, 109, 245)';
  for (let item of coord) {
    cnt.lineWidth = 1;
    cnt.beginPath();
    cnt.arc(item[0], item[1], 7, 0, 2 * Math.PI);
    cnt.fill();
    cnt.stroke();
  }
}
let pathNumber;
let down;
export let addedPath
function getPath(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  addedPath = null;
  down = [x, y];
  for (let item of ways) {
    if (cnt.isPointInPath(item, x, y)) {
       // addedPath = true;
      console.log(1);
      drawSel(item.coord);
      for (let it of pathWays) {
        if (it[1] === item.number) {
          pathNumber = it[1];
          addedPath = it
          // it.added = true
        }
      }
    } else return;
  }
  // canvas.addEventListener('mousemove', movePath);
  canvas.addEventListener('mouseup', letGoPath);
}

function movePath(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  for (let it of pathWays) {
    if (it[1] === pathNumber) {
      for (let i = 0; i < it[0].length; i++) {
        it[0][i][0] = downCoord[i][0] + (x - down[0]);
        it[0][i][1] = downCoord[i][1] + (y - down[1]);
        // it[0][i][0] = ways.coord
        // it[0][i][1]
      }
     
      // for (let i = 0; i < ways.length; i++) {
      //   console.log(ways[i].coord)
      //   console.log( pathWays[i][0])
      //   ways[i].coord = pathWays[i][0];
      // }


      ////////////// теперь у ways другие координаты
      // path.coord = pathCoord;
      // path.number = number;
      // pathWays.push([pathCoord, number]);
      reDraw();
      drawSel(it[0]);
    }

    console.log(pathWays);
    console.log(ways[0].coord);
  }
}

function letGoPath() {
  pathNumber = null;
  ways = [];
  canvas.removeEventListener('mousemove', movePath);
  reDraw();
}
