'use strict';
import { drawnObjects } from './landscape.js';
import { addImage } from './landscape.js';
import { reDraw } from './landscape.js';
import { drawPath } from './leftButtons.js';
import { plot } from './plotsSizes.js';
// import { currentUser } from './topButtons.js';
import { currentUser } from './topButtons.js';
import { ways } from './leftButtons.js';

let ajaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';
let updatePassword;

let stringName = 'MIASNIKOVA_LANDSKAPE_OBJECTS';

// let stringName = 'MIASNIKOVA_LANDSKAPE_TEMPLATES';

// export function storeInfo() {
//   updatePassword = Math.random();
//   $.ajax({
//     url: ajaxHandlerScript,
//     type: 'POST',
//     cache: false,
//     dataType: 'json',
//     data: { f: 'LOCKGET', n: stringName, p: updatePassword },
//     success: lockGetReady,
//     error: errorHandler,
//   });
// }

// function lockGetReady(callresult) {
//   if (callresult.error != undefined) alert(callresult.error);
//   else {
//     let templates = {
//       templ1: 
//         {
//           '1': ['houses', 1, 509, 173.5, 227.04000000000005, 133.28, 0],
//           '2': ['pools', 1, 393, 185.5, 120, 120, 0],
//           '3': ['trees', 2, 358, 292.5, 68.4, 68.4, 0],
//           '4': ['trees', 2, 451, 151.5, 60, 60, 0],
//           '5': ['trees', 2, 359, 150.5, 60, 60, 0],
//           '6': ['furniture', 2, 422, 296.5, 100, 100, 1.2249803973515843],
//           '7': [
//             'pavement',
//             3,
//             783,
//             240.5,
//             85.99999999999999,
//             85.99999999999999,
//             0,
//           ],
//           '8': [
//             'pavement',
//             3,
//             783,
//             157.5,
//             85.99999999999999,
//             85.99999999999999,
//             0,
//           ],
//           '9': ['cars', 2, 771, 207.5, 122, 55, 1.5707963267948966],
//           '10': ['angular', 8, 530, 339.5, 40, 40, 0],
//           '11': ['angular', 10, 505, 380.5, 40, 40, 0],
//           '12': ['angular', 14, 456, 394.5, 44, 45.60000000000001, 0],
//           '13': ['angular', 15, 415, 386.5, 40, 40, 0],
//           '14': ['angular', 12, 380, 366.5, 40, 40, 0],
//           '15': ['flowers', 2, 815, 441.5, 60, 60, 0],
//           '16': ['flowers', 2, 811, 380.5, 60, 60, 0],
//           '17': ['flowers', 2, 812, 324.5, 60, 60, 0],
//           '18': ['shrubs', 14, 469, 437.5, 40, 40, 0],
//           '19': ['shrubs', 14, 424, 429.5, 40, 40, 0],
//           '20': ['shrubs', 14, 380, 414.5, 40, 40, 0],
//           '21': ['shrubs', 14, 574, 350.5, 40, 40, 0],
//           '22': ['shrubs', 14, 550, 390.5, 40, 40, 0],
//           '23': ['shrubs', 14, 514, 424.5, 40, 40, 0],
//           '24': [
//             'houses',
//             1,
//             516,
//             523.5,
//             137.59999999999997,
//             108.79999999999998,
//             0,
//           ],
//           '25': ['houses', 1, 648, 505.5, 172, 136, 0],
//           '26': [
//             'ponds',
//             2,
//             382,
//             558.5,
//             83.99999999999997,
//             83.99999999999997,
//             0,
//           ],
//           '27': ['trees', 6, 457, 602.5, 60, 60, 0],
//           '28': ['trees', 6, 358, 605.5, 60, 60, 0],
//           '29': ['flowers', 3, 658, 427.5, 60, 60, 0],
//           '30': ['flowers', 3, 720, 428.5, 60, 60, 0],
//           '31': ['flowers', 3, 596, 428.5, 60, 60, 0],
//           pl: {
//             W: '30',
//             H: '30',
//             X: 358.99500000000006,
//             Y: 153.85500000000002,
//             ratio: 0.65,
//             scale: 17.095000000000002,
//           },
//           path: [
//             {
//               pattern: {},
//               number: 3,
//               coord: [
//                 [735, 206],
//                 [783, 207],
//               ],
//               downCoord: [
//                 [735, 206],
//                 [783, 207],
//               ],
//               way: {},
//             },
//             {
//               pattern: {},
//               number: 3,
//               coord: [
//                 [785, 319],
//                 [538, 328],
//               ],
//               downCoord: [
//                 [785, 319],
//                 [538, 328],
//               ],
//               way: {},
//             },
//             {
//               pattern: {},
//               number: 3,
//               coord: [
//                 [791, 325],
//                 [786, 499],
//               ],
//               downCoord: [
//                 [791, 325],
//                 [786, 499],
//               ],
//               way: {},
//             },
//             {
//               pattern: {},
//               number: 3,
//               coord: [
//                 [787, 491],
//                 [522, 494],
//               ],
//               downCoord: [
//                 [787, 491],
//                 [522, 494],
//               ],
//               way: {},
//             },
//             {
//               pattern: {},
//               number: 3,
//               coord: [
//                 [525, 494],
//                 [459, 559],
//               ],
//               downCoord: [
//                 [525, 494],
//                 [459, 559],
//               ],
//               way: {},
//             },
//           ],
//         },
      
//       templ2: [],
//       templ3: [],
//       templ4: [],
//     };
//     $.ajax({
//       url: ajaxHandlerScript,
//       type: 'POST',
//       cache: false,
//       dataType: 'json',
//       data: {
//         f: 'UPDATE',
//         n: stringName,
//         v: JSON.stringify(templates),
//         p: updatePassword,
//       },
//       success: updateReady,
//       error: errorHandler,
//     });
//   }
// }

// function updateReady(callresult) {
//   if (callresult.error != undefined) alert(callresult.error);
// }

// ///////////////////////////////////////////

let savedLast;
let allUsers = [];

export function storeInfo() {
  updatePassword = Math.random();
  $.ajax({
    url: ajaxHandlerScript,
    type: 'POST',
    cache: false,
    dataType: 'json',
    data: { f: 'LOCKGET', n: stringName, p: updatePassword },
    success: lockGetReady,
    error: errorHandler,
  });
}

function lockGetReady(callresult) {
  if (callresult.error != undefined) alert(callresult.error);
  else {
    $.ajax({
      url: ajaxHandlerScript,
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: { f: 'READ', n: stringName },
      success: read,
      error: errorHandler,
    });

    function read() {
      if (callresult.error != undefined) alert(callresult.error);
      else if (callresult.result != '') {
        savedLast = JSON.parse(callresult.result);
        allUsers = savedLast;
        // allUsers = [];
        updateData();
      }
    }

    function updateData() {
      let i = 1;
      let info = { pl: {} };
      info.pl = plot;
      info.path = ways;
      for (let item of drawnObjects) {
        info[i] = [
          item.s,
          item.num,
          item.X,
          item.Y,
          item.W,
          item.H,
          item.angle,
        ];
        i++;
      }
      let user = { userData: currentUser, userInfo: info };

      let is = true;
      if (!savedLast[0]) {
        allUsers.push(user);
        console.log('строка пустая');
      } else {
        for (let item of allUsers) {
          console.log(item.userData);
          if (JSON.stringify(item.userData) === JSON.stringify(currentUser)) {
            item.userInfo = user.userInfo;
            is = true;
          } else {
            is = false;
          }
        }
      }
      ggg();
      function ggg() {
        if (!is) {
          allUsers.push(user);
        }
      }

      // }

      $.ajax({
        url: ajaxHandlerScript,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
          f: 'UPDATE',
          n: stringName,
          v: JSON.stringify(allUsers),
          p: updatePassword,
        },
        success: updateReady,
        error: errorHandler,
      });
    }
  }
}
function updateReady(callresult) {
  if (callresult.error != undefined) alert(callresult.error);
}

let savedObjects = [];

export function restoreInfo() {
    $.ajax({
      url: ajaxHandlerScript,
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: { f: 'READ', n: stringName },
      success: readReady,
      error: errorHandler,
    });
}

function readReady(callresult) {
  if (callresult.error != undefined) alert(callresult.error);
  else if (callresult.result != '') {
    savedObjects = JSON.parse(callresult.result);
    for (let item of savedObjects) {
      if (JSON.stringify(item.userData) === JSON.stringify(currentUser)) {
        let drawnObject = item.userInfo;
        for (let key in drawnObject) {
          if (key === 'pl') {
            plot.X = drawnObject[key].X;
            plot.Y = drawnObject[key].Y;
            plot.W = drawnObject[key].W;
            plot.H = drawnObject[key].H;
            plot.ratio = drawnObject[key].ratio;
            plot.scale = drawnObject[key].scale;
          } else if (key === 'path') {
            for (let item of drawnObject[key]) {
              item.pattern = new Image();
              item.pattern.onload = function () {
                drawPath(item);
              };
              item.pattern.src = `./img/pathway/${item.number}.png`;
              ways.push(item);
            }
          } else {
            addImage(
              drawnObject[key][0],
              drawnObject[key][1],
              drawnObject[key][2],
              drawnObject[key][3],
              drawnObject[key][4],
              drawnObject[key][5],
              drawnObject[key][6]
            );
          }
        }
        // console.log('объекты пользователя нарисованы');
      }
    }
  }
  reDraw();
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
}
