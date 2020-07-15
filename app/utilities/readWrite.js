const fs = require('fs');

function readJson(path) {
  return fs.readFileSync(
    path,
    {
      encoding: 'utf8',
    },
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
}

const writeJson = (path, payload) => {
  fs.writeFile(path, JSON.stringify(payload, null, 2), 'utf-8', function (err) {
    if (err) throw err;
  });
};

module.exports.readJson = readJson;
module.exports.writeJson = writeJson;
