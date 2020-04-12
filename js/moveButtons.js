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
