const fs = require('fs');
const path = require('path');

module.exports = function (filename, dirname,params) {
  const imports = []
  const basename = path.basename(filename)
  fs
    .readdirSync(dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const repo = require(path.join(dirname, file))
      imports.push(repo);
    });
  return imports
}