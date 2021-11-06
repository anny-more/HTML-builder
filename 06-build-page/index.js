const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

fsPromises.mkdir(path.join(__dirname, 'project-dist'), {recursive : true});
fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive : true});

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, dirs) => {
  if (err) throw err;
  
  for (let dir of dirs) {
    if (dir.isDirectory()) {
      fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets', dir.name), {recursive : true});
      fs.readdir(path.join(__dirname, 'assets', dir.name), {withFileTypes: true}, (err, files) => {
        if (err) throw err;
          
        for (let file of files) {
          if (file.isFile()) {
            fsPromises.copyFile(path.join(__dirname, 'assets', dir.name, file.name), path.join(__dirname, 'project-dist', 'assets', dir.name, file.name));
          }
        }
      });
    }
  }
});

let wstream = fs.createWriteStream(path.join(__dirname, 'project-dist','style.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) == '.css') {
      let rstream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      rstream.pipe(wstream);
    }
  }
});

const arr = [];
fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    if (file.isFile() && path.extname(path.join(__dirname, 'components', file.name)) == '.html') {
      arr.push(file.name.split('.')[0]);
    }
  }
});

fsPromises.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));


fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', function (err, data) {
  if (err)
    return console.log(err);

  console.log("File content before replace:");
  //console.log(data);

  for (let i = 0; i < arr.length; i++) {
    fs.readFile(path.join(__dirname, 'components', `${arr[i]}.html`), 'utf-8', (err, dat) => {
      if(err) throw err;
      console.log(arr[i], dat);
      let replaceItem = `{{${arr[i]}}}`;
      data = data.replace(replaceItem, dat);
    });
    //fs.createReadStream(path.join(__dirname, 'components', `${arr[i]}.html`), 'utf-8');
    
  }

  console.log("File content after replace:");
  console.log(data);
  fs.close(path.join(__dirname, 'project-dist', 'index.html'));
});