import { canvas } from './landscape.js';
import { reDraw } from './landscape.js';

export let plot = {
  W: 0,
  H: 0,
  X: 0,
  Y: 0,
  ratio: 0.65,
 };
export function getPlot() {
  if (!plot.W) {
    getPlotSizes();
  } else {
    let redraw = confirm('Do you want to redraw?');
    if (redraw) {
      getPlotSizes();
    }
  }
}
function getPlotSizes() {
  let plotsWidth;
  let plotsHeight;
  let form = document.getElementById('prompt-form');
  let container = document.getElementById('prompt-form-container');
  showCover();
  container.style.display = 'block';
  form.elements.width.focus();
  form.width.value = '';
  form.height.value = '';
  form.onsubmit = function () {
    plotsWidth = form.width.value;
    plotsHeight = form.height.value;
    if (plotsWidth === '' || plotsHeight === '') return false;
    if (plotsWidth < plotsHeight) {
      plot.W = plotsHeight;
      plot.H = plotsWidth;
    } else {
      plot.W = plotsWidth;
      plot.H = plotsHeight;
    }
    plot.scale = Math.floor(
      Math.min(
        (canvas.width * plot.ratio) / plot.W,
        (canvas.height * plot.ratio) / plot.H
      )
    );
    plot.X =
    Math.floor(
      ((canvas.width - plot.W * plot.scale) / 2 / canvas.width) * 1000
    ) / 1000;
  plot.Y =
    Math.floor(
      ((canvas.height - plot.H * plot.scale) / 2 / canvas.height) * 1000
    ) / 1000;
      complete();
    return false;
  };
  function complete() {
    container.style.display = 'none';
    document.onkeydown = null;
    hideCover();
    reDraw();
  }
  form.cancel.onclick = function () {
    complete();
  };
  document.onkeydown = function (e) {
    if (e.key === 'Escape') {
      complete();
    }
  };
  let lastElem = form.elements[form.elements.length - 1];
  let firstElem = form.elements[0];
  lastElem.onkeydown = function (e) {
    if (e.key == 'Tab' && !e.shiftKey) {
      firstElem.focus();
      return false;
    }
  };
  firstElem.onkeydown = function (e) {
    if (e.key == 'Tab' && e.shiftKey) {
      lastElem.focus();
      return false;
    }
  };
}
function showCover() {
  let divHtml = document.getElementById('IPage');
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';
  divHtml.append(coverDiv);
}
function hideCover() {
  document.getElementById('cover-div').remove();
}
