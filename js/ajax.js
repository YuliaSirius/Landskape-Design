'use strict';
import { drawnObjects } from './landscape.js';
import { addImage } from './landscape.js';
import { reDraw } from './landscape.js';
import { drawPath } from './leftButtons.js';
import { plot } from './plotsSizes.js';
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
//           0.7058823529411765,
//           0.20000000000000007,
//           2.941,
//           2.941,
//           1,
//           1,
//           0,
//         ],
//         '2': [
//           'pavement',
//           2,
//           0.8485294117647058,
//           0.20196078431372555,
//           2.941,
//           2.941,
//           1,
//           1,
//           0,
//         ],
//         '3': [
//           'pavement',
//           2,
//           0.7058823529411765,
//           0.007843137254902016,
//           2.941,
//           2.941,
//           1,
//           1,
//           0,
//         ],
//         '4': [
//           'pavement',
//           2,
//           0.8485294117647059,
//           0.007843137254902016,
//           2.941,
//           2.941,
//           1,
//           1,
//           0,
//         ],
//         '5': [
//           'cars',
//           2,
//           0.8279411764705882,
//           0.13529411764705887,
//           3.602,
//           1.617,
//           1,
//           1,
//           1.566727935346614,
//         ],
//         '6': [
//           'houses',
//           1,
//           0.13529411764705881,
//           0.10392156862745104,
//           5.058,
//           4,
//           1.2000000000000002,
//           1,
//           0,
//         ],
//         '7': [
//           'trees',
//           3,
//           0.03676470588235294,
//           0.023529411764705938,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '8': [
//           'trees',
//           3,
//           0.3897058823529412,
//           -0.011764705882352886,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '9': [
//           'trees',
//           3,
//           0.27794117647058825,
//           -0.0019607843137254347,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '10': [
//           'trees',
//           3,
//           0.1588235294117647,
//           0.007843137254902016,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '11': [
//           'ponds',
//           2,
//           0.06323529411764706,
//           0.5470588235294118,
//           3.529,
//           3.529,
//           1.3600000000000003,
//           1.3600000000000003,
//           0,
//         ],
//         '12': [
//           'angular',
//           2,
//           0.19264705882352942,
//           0.9137254901960784,
//           1.176,
//           1.176,
//           1,
//           1,
//           0,
//         ],
//         '13': [
//           'angular',
//           2,
//           0.1161764705882353,
//           0.9098039215686274,
//           1.176,
//           1.176,
//           1,
//           1,
//           0,
//         ],
//         '14': [
//           'angular',
//           2,
//           0.04264705882352941,
//           0.8764705882352941,
//           1.176,
//           1.176,
//           1,
//           1,
//           0,
//         ],
//         '15': [
//           'furniture',
//           2,
//           0.2235294117647059,
//           0.37647058823529417,
//           2.941,
//           2.941,
//           1,
//           1,
//           -1.3911579038448663,
//         ],
//         '16': [
//           'trees',
//           2,
//           0.010294117647058823,
//           0.5019607843137255,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '17': [
//           'trees',
//           2,
//           0.03235294117647059,
//           0.3450980392156863,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '18': [
//           'trees',
//           2,
//           0.030882352941176472,
//           0.1901960784313726,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '19': [
//           'houses',
//           2,
//           0.663235294117647,
//           0.7098039215686275,
//           5.058,
//           4,
//           0.8799999999999999,
//           0.8799999999999999,
//           0,
//         ],
//         '20': [
//           'houses',
//           2,
//           0.5279411764705882,
//           0.7607843137254899,
//           5.058,
//           4,
//           0.5599999999999996,
//           0.5599999999999996,
//           0,
//         ],
//         '21': [
//           'flowers',
//           2,
//           0.5044117647058823,
//           0.5000000000000001,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '22': [
//           'flowers',
//           2,
//           0.3941176470588235,
//           0.5058823529411764,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '23': [
//           'flowers',
//           2,
//           0.7705882352941177,
//           0.5274509803921569,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         '24': [
//           'flowers',
//           2,
//           0.7705882352941177,
//           0.40196078431372556,
//           1.764,
//           1.764,
//           1,
//           1,
//           0,
//         ],
//         pl: { W: '20', H: '15', X: 0.228, Y: 0.176, ratio: 0.65, scale: 34 },
//         path: [
//           {
//             pattern: {},
//             number: 2,
//             coord: [
//               [0.43774509803921574, 0.23752156862745097],
//               [0.7102941176470587, 0.24340392156862745],
//             ],
//             downCoord: [
//               [0.43774509803921574, 0.23752156862745097],
//               [0.7102941176470587, 0.24340392156862745],
//             ],
//             way: {},
//           },
//           {
//             pattern: {},
//             number: 2,
//             coord: [
//               [0.7338235294117647, 0.3885019607843137],
//               [0.7279411764705882, 0.6865411764705882],
//             ],
//             downCoord: [
//               [0.7338235294117647, 0.3885019607843137],
//               [0.7279411764705882, 0.6865411764705882],
//             ],
//             way: {},
//           },
//           {
//             pattern: {},
//             number: 2,
//             coord: [
//               [0.7073529411764705, 0.6551686274509804],
//               [0.3220588235294117, 0.6610509803921568],
//             ],
//             downCoord: [
//               [0.7073529411764705, 0.6551686274509804],
//               [0.3220588235294117, 0.6610509803921568],
//             ],
//             way: {},
//           },
//         ],
//       },
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
      let info = {};
      info.pl = plot;
      info.path = ways;
      for (let item of drawnObjects) {
        info[i] = [
          item.s,
          item.num,
          item.Xshare,
          item.Yshare,
          item.widthShare,
          item.heightShare,
          item.selectX,
          item.selectY,
          item.angle,
        ];
        i++;
      }
      let user = { userData: currentUser, userInfo: info };

      let is = true;
      if (!savedLast[0]) {
        allUsers.push(user);
      } else {
        for (let item of allUsers) {
          if (JSON.stringify(item.userData) !== JSON.stringify(currentUser)) {
            is = false;
          } else {
            item.userInfo = user.userInfo;
            is = true;
          }
        }
        addNewUser();
      }

      function addNewUser() {
        if (!is) {
          allUsers.push(user);
        }
      }

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
              drawnObject[key][6],
              drawnObject[key][7],
              drawnObject[key][8]
            );
          }
        }
      }
    }
  }
  reDraw();
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
}
