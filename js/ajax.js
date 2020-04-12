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
//         '1': ['pavement', 5, 0.585, 0.203, 1.96, 1.96, 1, 1, 0],
//         '2': ['pavement', 5, 0.585, 0.329, 1.96, 1.96, 1, 1, 0],
//         '3': ['pavement', 5, 0.66, 0.329, 1.96, 1.96, 1, 1, 0],
//         '4': ['pavement', 5, 0.66, 0.203, 1.96, 1.96, 1, 1, 0],
//         '5': ['trees', 3, 0.241, 0.369, 1.17, 1.17, 1, 1, 0],
//         '6': ['trees', 3, 0.235, 0.505, 1.17, 1.17, 1, 1, 0],
//         '7': ['trees', 3, 0.243, 0.234, 1.17, 1.17, 1, 1, 0],
//         '8': ['angular', 5, 0.282, 0.751, 0.78, 0.78, 1.08, 1.08, 0],
//         '9': ['angular', 5, 0.257, 0.699, 0.78, 0.78, 1, 1, 0],
//         '10': ['angular', 5, 0.247, 0.635, 0.78, 0.78, 1, 1, 0],
//         '11': ['cars', 2, 0.642, 0.272, 2.4, 1.07, 1, 1, 0],
//         '12': ['pools', 1, 0.417, 0.449, 2.35, 2.35, 1, 1, 0],
//         '13': ['furniture', 2, 0.32, 0.477, 1.96, 1.96, 1, 1, 0],
//         '14': ['ponds', 2, 0.286, 0.611, 2.35, 2.35, 1, 1, 0],
//         '15': ['flowers', 2, 0.709, 0.66, 1.17, 1.17, 1, 1, 0],
//         '16': ['flowers', 2, 0.706, 0.468, 1.17, 1.17, 1, 1, 0],
//         '17': ['flowers', 2, 0.709, 0.56, 1.17, 1.17, 1, 1, 0],
//         '18': ['houses', 1, 0.481, 0.647, 3.37, 2.66, 0.67, 0.67, 0],
//         '19': ['houses', 1, 0.331, 0.254, 3.37, 2.66, 1.32, 1, 0],
//         '20': ['houses', 1, 0.568, 0.631, 3.37, 2.66, 0.81, 0.81, 0],
//         pl: { W: '15', H: '10', X: 0.204, Y: 0.176, ratio: 0.65, scale: 51 },
//         path: [
//           {
//             pattern: {},
//             number: 5,
//             coord: [
//               [760, 283],
//               [663, 280],
//             ],
//             downCoord: [
//               [760, 283],
//               [663, 280],
//             ],
//             way: {},
//           },
//         ],
//       },

//       templ2: {
//         '1': ['houses', 2, 0.377, 0.359, 10.117, 8, 1, 1, 0],
//         '2': ['pavement', 6, 0.303, 0.376, 5.882, 5.882, 1, 1, 0],
//         '3': [
//           'cars',
//           2,
//           0.312,
//           0.421,
//           7.205,
//           3.235,
//           0.5399999999999996,
//           0.5399999999999996,
//           0,
//         ],
//         '4': [
//           'trees',
//           5,
//           0.291,
//           0.204,
//           3.529,
//           3.529,
//           2.6000000000000014,
//           2.6000000000000014,
//           0,
//         ],
//         '5': ['shrubs', 13, 0.445, 0.741, 2.352, 2.352, 1, 1, 0],
//         '6': ['shrubs', 13, 0.445, 0.677, 2.352, 2.352, 1, 1, 0],
//         '7': [
//           'shrubs',
//           13,
//           0.444,
//           0.61,
//           2.352,
//           2.352,
//           1,
//           1,
//           0.44514990510687147,
//         ],
//         '8': ['shrubs', 13, 0.398, 0.744, 2.352, 2.352, 1, 1, 0],
//         '9': [
//           'shrubs',
//           13,
//           0.397,
//           0.674,
//           2.352,
//           2.352,
//           1,
//           1,
//           3.0966516225575402,
//         ],
//         '10': ['shrubs', 13, 0.397, 0.611, 2.352, 2.352, 0.96, 0.96, 0],
//         '11': [
//           'trees',
//           11,
//           0.493,
//           0.586,
//           3.529,
//           3.529,
//           0.6199999999999997,
//           0.6199999999999997,
//           0,
//         ],
//         '12': [
//           'trees',
//           11,
//           0.495,
//           0.638,
//           3.529,
//           3.529,
//           0.5799999999999996,
//           0.5799999999999996,
//           0,
//         ],
//         '13': [
//           'trees',
//           11,
//           0.495,
//           0.746,
//           3.529,
//           3.529,
//           0.6599999999999997,
//           0.6599999999999997,
//           0,
//         ],
//         '14': [
//           'trees',
//           11,
//           0.495,
//           0.689,
//           3.529,
//           3.529,
//           0.6199999999999997,
//           0.5999999999999996,
//           3.0894778619204057,
//         ],
//         '15': ['flowers', 1, 0.565, 0.641, 3.529, 3.529, 1, 1, 0],
//         '16': ['flowers', 1, 0.529, 0.643, 3.529, 3.529, 1, 1, 0],
//         '17': ['flowers', 1, 0.635, 0.613, 3.529, 3.529, 1, 1, 0],
//         '18': ['flowers', 1, 0.6, 0.612, 3.529, 3.529, 1, 1, 0],
//         '19': ['flowers', 1, 0.565, 0.614, 3.529, 3.529, 1, 1, 0],
//         '20': ['flowers', 1, 0.531, 0.614, 3.529, 3.529, 1, 1, 0],
//         '21': ['flowers', 1, 0.566, 0.743, 3.529, 3.529, 1, 1, 0],
//         '22': ['flowers', 1, 0.531, 0.747, 3.529, 3.529, 1, 1, 0],
//         '23': ['flowers', 1, 0.633, 0.711, 3.529, 3.529, 1, 1, 0],
//         '24': ['flowers', 1, 0.597, 0.709, 3.529, 3.529, 1, 1, 0],
//         '25': ['flowers', 1, 0.565, 0.709, 3.529, 3.529, 1, 1, 0],
//         '26': ['flowers', 1, 0.529, 0.711, 3.529, 3.529, 1, 1, 0],
//         '27': ['flowers', 1, 0.634, 0.675, 3.529, 3.529, 1, 1, 0],
//         '28': ['flowers', 1, 0.6, 0.675, 3.529, 3.529, 1, 1, 0],
//         '29': ['flowers', 1, 0.566, 0.673, 3.529, 3.529, 1, 1, 0],
//         '30': ['flowers', 1, 0.529, 0.675, 3.529, 3.529, 1, 1, 0],
//         '31': ['flowers', 1, 0.628, 0.571, 3.529, 3.529, 1, 1, 0],
//         '32': ['flowers', 1, 0.596, 0.572, 3.529, 3.529, 1, 1, 0],
//         '33': ['flowers', 1, 0.563, 0.574, 3.529, 3.529, 1, 1, 0],
//         '34': ['flowers', 1, 0.528, 0.574, 3.529, 3.529, 1, 1, 0],
//         '35': [
//           'flowers',
//           1,
//           0.634,
//           0.643,
//           3.529,
//           3.529,
//           1,
//           0.96,
//           0.012000234919467001,
//         ],
//         '36': ['flowers', 1, 0.6, 0.643, 3.529, 3.529, 1, 1, 0],
//         '37': ['flowers', 1, 0.633, 0.743, 3.529, 3.529, 1, 1, 0],
//         '38': ['flowers', 1, 0.597, 0.745, 3.529, 3.529, 1, 1, 0],
//         '39': ['trees', 1, 0.606, 0.327, 3.529, 3.529, 0.98, 1, 0],
//         '40': ['trees', 1, 0.618, 0.451, 3.529, 3.529, 1, 1, 0],
//         '41': ['trees', 1, 0.518, 0.413, 3.529, 3.529, 1.06, 1.06, 0],
//         '42': ['trees', 1, 0.524, 0.245, 3.529, 3.529, 1, 1, 0],
//         '43': ['trees', 4, 0.631, 0.206, 3.529, 3.529, 1, 1, 0],
//         '44': ['trees', 4, 0.31, 0.723, 3.529, 3.529, 1, 1, 0],
//         '45': ['trees', 4, 0.306, 0.579, 3.529, 3.529, 1, 1, 0],
//         '46': ['pavement', 11, 0.429, 0.232, 5.882, 5.882, 1, 1, 0],
//         '47': ['shrubs', 1, 0.398, 0.193, 2.352, 2.352, 1, 1, 0],
//         '48': ['shrubs', 1, 0.587, 0.479, 2.352, 2.352, 1, 1, 0],
//         '49': ['shrubs', 1, 0.314, 0.504, 2.352, 2.352, 1, 1, 0],
//         '50': ['shrubs', 1, 0.569, 0.31, 2.352, 2.352, 1, 1, 0],
//         '51': ['shrubs', 1, 0.524, 0.366, 2.352, 2.352, 1, 1, 0],
//         '52': ['shrubs', 1, 0.501, 0.188, 2.352, 2.352, 1, 1, 0],
//         '53': ['shrubs', 1, 0.374, 0.574, 2.352, 2.352, 1, 1, 0],
//         '54': ['shrubs', 1, 0.316, 0.661, 2.352, 2.352, 1, 1, 0],
//         '55': [
//           'flowers',
//           2,
//           0.592,
//           0.404,
//           3.529,
//           3.529,
//           0.6399999999999997,
//           0.6399999999999997,
//           0,
//         ],
//         '56': [
//           'flowers',
//           2,
//           0.539,
//           0.512,
//           3.529,
//           3.529,
//           0.5999999999999996,
//           0.5999999999999996,
//           0,
//         ],
//         '57': [
//           'flowers',
//           2,
//           0.505,
//           0.286,
//           3.529,
//           3.529,
//           0.5399999999999996,
//           0.5399999999999996,
//           0,
//         ],
//         '58': [
//           'flowers',
//           2,
//           0.408,
//           0.263,
//           3.529,
//           3.529,
//           0.5199999999999996,
//           0.5199999999999996,
//           0,
//         ],
//         '59': [
//           'flowers',
//           2,
//           0.358,
//           0.713,
//           3.529,
//           3.529,
//           0.6199999999999997,
//           0.6199999999999997,
//           0,
//         ],
//         '60': [
//           'furniture',
//           3,
//           0.444,
//           0.26,
//           5.882,
//           5.882,
//           0.5799999999999996,
//           0.5799999999999996,
//           0.7121175517824453,
//         ],
//         pl: { W: '30', H: '30', X: 0.302, Y: 0.176, ratio: 0.65, scale: 17 },
//         path: [
//           {
//             pattern: {},
//             number: 6,
//             coord: [
//               [472, 394],
//               [473, 565],
//             ],
//             downCoord: [
//               [472, 394],
//               [473, 565],
//             ],
//             way: {},
//           },
//           {
//             pattern: {},
//             number: 6,
//             coord: [
//               [474, 443],
//               [898, 444],
//             ],
//             downCoord: [
//               [474, 443],
//               [898, 444],
//             ],
//             way: {},
//           },
//           {
//             pattern: {},
//             number: 6,
//             coord: [
//               [740, 439],
//               [764, 350],
//             ],
//             downCoord: [
//               [740, 439],
//               [764, 350],
//             ],
//             way: {},
//           },
//           {
//             pattern: {},
//             number: 6,
//             coord: [
//               [767, 362],
//               [720, 289],
//             ],
//             downCoord: [
//               [767, 362],
//               [720, 289],
//             ],
//             way: {},
//           },
//           {
//             pattern: {},
//             number: 6,
//             coord: [
//               [719, 290],
//               [653, 259],
//             ],
//             downCoord: [
//               [719, 290],
//               [653, 259],
//             ],
//             way: {},
//           },
//         ],
//       },
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
      let info = {};
      info.pl = plot;
      info.path = ways;
      for (let item of drawnObjects) {
        info[i] = [
          item.s,
          item.num,
          item.Xshare,
          item.Yshare,
          item.widthShare ,
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
            break;
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
