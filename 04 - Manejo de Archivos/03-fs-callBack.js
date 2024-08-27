const fs = require('fs');

const path = './file-CallBack.txt';

if (fs.existsSync(path)) {
    fs.readFileSync(path, 'utf8', (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
} 
fs.appendFile(path,"segundo texto!", (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
    fs.readFileSync(path, 'utf8', (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
