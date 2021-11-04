const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

fsPromises.mkdir(path.join(__dirname, '/files-copy'), {recursive: true});

fs.readdir(path.join(__dirname, '/files'), (err, files) => {
    if (err) throw err;
    
    for (const file of files) {
            fsPromises.copyFile(path.join(__dirname, '/files',file), path.join(__dirname, '/files-copy', file));
        }
    });

