const fs = require('fs');
const path = require('path');

let wstream = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) == '.css') {
      let rstream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      rstream.pipe(wstream);
    }
  }
});