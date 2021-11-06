const fs = require('fs');
const readline = require('readline');
const path = require('path');
const pathToFile = path.join(__dirname,'text.txt');
const { stdin, stdout } = require('process');
const rl = readline.createInterface({
  input: stdin,
  output: stdout
});


fs.writeFile(pathToFile, '', (err) => {
  if(err) throw err;
  console.log('Hello! Do not be shine. Tipe smth!');
});

rl.on('line', line => {
  if(line == 'exit') {
    rl.close();
  } else {
    fs.appendFile(pathToFile, `${line}\n`, (err) => {
      if(err) throw err;
      //console.log('Data has been added!'););
    });
  }});
rl.on('close', () => {
  stdout.write('Bye! I will be missing!');
});
