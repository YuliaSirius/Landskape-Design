import { canvas } from './landscape.js';
import { cnt } from './landscape.js';
import { reDraw } from './landscape.js';

export function addOnWheel(elem, handler) {
  if (elem.addEventListener) {
    if ('onwheel' in document) {
      elem.addEventListener('wheel', handler);
    } else if ('onmousewheel' in document) {
      elem.addEventListener('mousewheel', handler);
    } else {
      elem.addEventListener('MozMousePixelScroll', handler);
    }
  } else {
    elem.attachEvent('onmousewheel', handler);
  }
}

export let zoom = 1;
export let zoomStep = 1.03;
export let offX;
export let offY;
// let commonOffsetX = 0;
// addOnWheel(document, function(e) {
//   let delta = e.deltaY || e.detail || e.wheelDelta;

//   if (delta < 0) {
//     let X = e.clientX;
//     let Y = e.clientY;
//     offX = X * zoomStep - X;
//     offY = Y * zoomStep - Y;
//     cnt.clearRect(0, 0, canvas.width, canvas.height);
//     canvas.width /=zoomStep;
//     canvas.height /=zoomStep;
//     // cnt.transform(1 * zoomStep, 0, 0, 1 * zoomStep, -offX, -offY);
//     ++zoom;
//      commonOffsetX +=offX
//     console.log(commonOffsetX)
//   }
//   if (delta > 0) {
//     let X = e.pageX;
//     let Y = e.pageY;
//     offX = X - X / zoomStep;
//     offY = Y - Y / zoomStep;
//         commonOffsetX -=offX
//     cnt.clearRect(0, 0, canvas.width, canvas.height);
//     canvas.width *=zoomStep;
//     canvas.height *=zoomStep;
//     // cnt.transform(1 / zoomStep, 0, 0, 1 / zoomStep, offX, offY);
//     --zoom;

//     console.log(commonOffsetX)
//   }

//   reDraw();
// });

document.addEventListener('mousedown', mouseDown);
let mouseX;
let mouseY;
function mouseDown() {
  if (event.target.tagName === 'CANVAS') {
    // if (zoom > 1) {

    mouseX = event.pageX + offX;
    mouseY = event.pageY + offY;
    // document.addEventListener('mousemove', mouseMove);
    event.target.ondragstart = function () {
      return false;
    };
    // }
  }
}

let a = 0;
let b = 0;

function mouseMove() {
  cnt.clearRect(0, 0, canvas.width, canvas.height);
  let X = event.pageX + offX - mouseX;
  let Y = event.pageY + offY - mouseY;

  cnt.transform(1, 0, 0, 1, X - a, Y - b);
  reDraw();
  // cnt.transform(1, 0, 0, 1, -X, -Y);
  // cnt.resetTransform();
  // cnt.restore()
  a = X;
  b = Y;
}

document.addEventListener('mouseup', mouseUp);
function mouseUp() {
  document.removeEventListener('mousemove', mouseMove);
}

// move main buttons
let mainButtons

export function addListener() {
  mainButtons = document.querySelector('.buttons');
mainButtons.addEventListener('mousedown', getButtons);
}
let elemLeft;
let elemTop;
let sizeLeft = 0;
let sizeTop = 88;

function getButtons(e) {
  if (e.target.className !== 'buttons') return;
  elemLeft = event.pageX - sizeLeft;
  elemTop = event.pageY - sizeTop;
  document.addEventListener('mousemove', moveButtons);
  event.target.ondragstart = function () {
    return false;
  };
}

function moveButtons() {
  sizeLeft = event.pageX - elemLeft;
  sizeTop = event.pageY - elemTop;
  mainButtons.style.left = sizeLeft + 'px';
  mainButtons.style.top = sizeTop + 'px';
  if (sizeLeft < 20) {
    mainButtons.style.left = '0px';
  }
  if (
    sizeLeft + mainButtons.clientWidth >
    document.documentElement.clientWidth - 20
  ) {
    mainButtons.style.left =
      document.documentElement.clientWidth - mainButtons.clientWidth + 'px';
  }
  if (sizeTop < 20) {
    mainButtons.style.top = '0px';
  }

  if (
    sizeTop + mainButtons.clientHeight >
    document.documentElement.clientHeight - 20
  ) {
    mainButtons.style.top =
      document.documentElement.clientHeight - mainButtons.clientHeight + 'px';
  }

  let submenu = [...document.querySelectorAll('.submenu')];
  for (let item of submenu) {
    if (sizeLeft > document.documentElement.clientWidth / 2) {
      item.style.left = '-6.3vmax';
    } else item.style.left = '3.7vmax;';
  }

  let sub = [...document.querySelectorAll('.sub')];
  for (let item of sub) {
    if (sizeLeft > document.documentElement.clientWidth / 2) {
      item.style.left = '-212px';
    } else item.style.left = '3.7vmax';
  }
}

document.addEventListener('mouseup', putButtons);
function putButtons() {
  document.removeEventListener('mousemove', moveButtons);
}
