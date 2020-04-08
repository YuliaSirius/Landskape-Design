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
let angle;
let scaleX;
let scaleY;
function start() {
  requestAnimationFrame(tick);
  offsetX = 0;
  offsetY = 0;
  angle = 0;
  scaleX = 1;
  scaleY = 1;
}

function tick() {
  scaleX += 0.03;
  scaleY += 0.03;
  offsetX += 6;
  offsetY += 2.8;
  //   angle += 5;
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
  let img1 = document.querySelector('.imgDemo1');
  img1.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${offsetX},${offsetY})`;
  // img1.style.transform = `rotate(${angle}deg)`;
  let img2 = document.querySelector('.imgDemo2');
  img2.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${-offsetX},${offsetY})`;
  // img2.style.transform = `rotate(${angle}deg)`;
  let img3 = document.querySelector('.imgDemo3');
  img3.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${-offsetX},${-offsetY})`;
  // img3.style.transform = `rotate(${angle}deg)`;
  let img4 = document.querySelector('.imgDemo4');
  img4.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY},${offsetX},${-offsetY})`;
  // img4.style.transform = `rotate(${angle}deg)`;
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

function showReadme() {
  let readme = document.querySelector('.readme');
  readme.style.display = 'flex';
  document.addEventListener('click', chooseTemplate)
}

function hideReadme() {
  let readme = document.querySelector('.readme');
  readme.remove();
  // readme.style.display = 'none';
  for (let i = 1; i < 5; i++) {
    let img = document.querySelector(`.imgDemo${i}`);
    img.remove();
  }
  addedDemo = false;
  document.onkeydown = null;
}

function chooseTemplate() {


}
