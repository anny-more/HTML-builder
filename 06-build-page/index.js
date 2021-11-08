const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

fsPromises.mkdir(path.join(__dirname, 'project-dist'), {recursive : true});
fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive : true});


let string = '';


fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), string, {flag: 'a+'},
function(err){
if (err) throw err;
});
fsPromises.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));

    
getTem();

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

async function getTem() {
fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', function (err, data) {
  if (err)
    return console.log(err);

  for (let i = 0; i < arr.length; i++) {
    fs.readFile(path.join(__dirname, 'components', `${arr[i]}.html`), 'utf-8', (err, dat) => {
      if(err) throw err;
      let replaceItem = new RegExp(`{{${arr[i]}}}`, 'g');
      console.log(replaceItem);
      data = data.replace(replaceItem, dat);
      fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, function (err) {
        if (err) throw err;});
    });
  }
});
};