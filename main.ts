const fs = require('fs');
const folder = './docs/';
var commentCount = 0;
var moverCount = 0;
var shakerCount = 0;
var questionMarks = 0;
var spam = 0;

fs.readdir(folder, (err, files) => {
  files.forEach(function(i, idx, file) {
    fs.readFile(folder + i, 'utf8', function (ferr, data) {

      for (const line of data.split(/[\r\n]+/)) {
        line.length < 15 ? commentCount++ : '';
        line.match(/Mover/gi) ? moverCount++ : '';
        line.match(/Shaker/gi) ? shakerCount++ : '';
        line.match(/\?/g) ? questionMarks++ : '';
        line.match(/(http(s)?:)(\/\/)?((\.)?(\w)+){1,}(\.(\w{2,}))((:(\d+)?){1})?((\/|\?).+)?/gi) ? spam++ : '';
      }
      
      idx === file.length - 1 ? analyze([{val: commentCount, key: 'SHORTER_THAN_15'}, {val: moverCount, key: 'MOVER_MENTIONS'}, {val: shakerCount, key: 'SHAKER_MENTIONS'}, {val: questionMarks, key: 'QUESTION_MENTIONS'}, {val: spam, key: 'SPAM'}], file) : '';
    });
  });
})


function analyze(data, file) {
  console.log("RESULTS\n=======");
  return data.forEach((k) => console.log(k.key + " : " + k.val));
}
