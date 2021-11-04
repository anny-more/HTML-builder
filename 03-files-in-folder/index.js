const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname,'/secret-folder');

fs.readdir(pathToFile, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    
    for (const file of files) {
        if (file.isFile()) {
            fs.stat(`${pathToFile}/${file.name}`, (err, stats) => {
                if (err) throw err;
                console.log(`${file.name} - ${file.name.split('.')[1]} - ${stats.size}`);
            });
        }
    }
});

