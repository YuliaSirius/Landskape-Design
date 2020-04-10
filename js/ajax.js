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
//       templ1: {
//         '1': [
//           'pavement',
//           2,
//           0.6375291375291376,
//           0.3010139416983525,
//           100,
//           100,
//           0,
//         ],
//         '2': [
//           'pavement',
//           2,
//           0.6367521367521367,
//           0.17680608365019013,
//           100,
//           100,
//           0,
//         ],
//         '3': [
//           'cars',
//           2,
//           0.635975135975136,
//           0.25158428390367554,
//           122,
//           55,
//           1.4891071752024199,
//         ],
//         '4': [
//           'houses',
//           2,
//           0.44405594405594406,
//           0.21356147021546262,
//           199.52000000000004,
//           157.76000000000002,
//           0,
//         ],
//         '5': ['pools', 1, 0.35392385392385395, 0.2376425855513308, 120, 120, 0],
//         '6': ['trees', 1, 0.3220668220668221, 0.5190114068441065, 60, 60, 0],
//         '7': ['trees', 1, 0.3197358197358197, 0.2946768060836502, 60, 60, 0],
//         '8': ['trees', 1, 0.3787878787878788, 0.17046894803548795, 60, 60, 0],
//         '9': ['trees', 1, 0.32051282051282054, 0.17427122940430925, 60, 60, 0],
//         pl: {
//           W: '10',
//           H: '10',
//           X: 410.475,
//           Y: 134.13,
//           ratio: 0.65,
//           scale: 51.285000000000004,
//         },
//         path: [
//           {
//             pattern: {},
//             number: 2,
//             coord: [
//               [822, 258],
//               [769, 257],
//             ],
//             downCoord: [
//               [822, 258],
//               [769, 257],
//             ],
//             way: {},
//           },
//         ],
//       },

//       templ2: {},
//       templ3: {},
//       templ4: {},
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
          item.Xshare,
          item.Yshare,
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
