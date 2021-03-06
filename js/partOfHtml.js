export function addHtml() {
    let tegs = `<div class="buttons">
    <div class="button">
      <img class="btn_img" src="./img/tree.png" alt="plants" />
      <span>PLANTS</span>
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/tree.png" alt="tree" />
          <span>Trees</span>
          <div class="sub" id="trees"> </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/shrub.png" alt="shrub" />
          <span>Shrubs</span>
          <div class="sub" id="shrubs"> </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/flower.png" alt="flower" />
          <span>Flowers</span>
          <div class="sub" id="flowers"> </div>
        </div>
             </div>
    </div>
    <div class="button">
      <img class="btn_img" src="./img/stone.png" alt="stone" />
      <span>STONES</span>
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/smooth.png" alt="stone" />
          <span>Smooth</span>
          <div class="sub" id="smooth">
          </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/angular/2.png" alt="stone" />
          <span>Angular</span>
          <div class="sub" id="angular">
          </div>
        </div>
      </div>
    </div>
    <div class="button">
      <img class="btn_img" src="./img/paving.png" alt="paving" />
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/pathWay.png" alt="path" />
          <span>Pathway</span>
          <div class="sub" id="pathway"> </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/pavement.png" alt="pavement" />
          <span>Pavement</span>
          <div class="sub" id="pavement"> </div>
        </div>
      </div>
      <span>PAVING</span>
    </div>
    <div class="button">
      <img class="btn_img" src="./img/ponds.png" alt="ponds" />
      <span>PONDS</span>
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/ponds.png" alt="ponds" />
          <span>Ponds</span>
          <div class="sub" id="ponds"> </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/pools.png" alt="pools" />
          <span>Pools</span>
          <div class="sub" id="pools"> </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/fountains.png" alt="fountains" />
          <span>Fountains</span>
          <div class="sub" id="fountains"> </div>
        </div>
      </div>
    </div>
    <div class="button">
      <img class="btn_img" src="./img/furniture.png" alt="furniture" />
      <span>LEISURE</span>
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/furniture.png" alt="cars" />
          <span>Furniture</span>
          <div class="sub" id="furniture"> </div>
        </div>
      </div>
    </div>
    <div class="button">
      <img class="btn_img" src="./img/cars.png" alt="cars" />
      <span>VEHICLES</span>
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/cars.png" alt="cars" />
          <span>Cars</span>
          <div class="sub" id="cars"> </div>
        </div>
        <div class="catalog">
          <img class="btn_img" src="./img/scooters.png" alt="scooters" />
          <span>Scooters</span>
          <div class="sub" id="scooters"> </div>
        </div>
      </div>
    </div>
    <div class="button">
      <img class="btn_img" src="./img/house.png" alt="house" />
      <span>HOUSE</span>
      <div class="submenu">
        <div class="catalog">
          <img class="btn_img" src="./img/house.png" alt="houses" />
          <span>Houses</span>
          <div class="sub" id="houses"> </div>
        </div>
             </div>
    </div>
  </div>
  <canvas id="cnv"></canvas>
  <div id="prompt-form-container">
    <form id="prompt-form">
      <div id="prompt-message">Enter the sizes of your plot:</div>
      <div>
        <label for="width">length:</label>
        <label>
          <input id="width" name="width" type="text" autocomplete="off" />
          (m)</label>
      </div>
      <div>
        <label for="height">width:</label>
        <label><input id="height" name="height" type="text" autocomplete="off" />
          (m)</label>
      </div>
      <input type="submit" value=" OK " />
      <input type="button" name="cancel" value=" Cancel " />
    </form>
  </div>`;
    return tegs;
  }