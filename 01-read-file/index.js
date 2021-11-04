const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname,'text.txt');
const stream = fs.createReadStream(pathToFile, 'utf-8');
stream.on('data', partData => console.log(partData));
stream.on('error', error => console.log(`Error = ${error.message}`));
