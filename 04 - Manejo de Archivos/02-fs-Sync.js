const fs = require('fs');

const path = "./file.txt";

if (fs.existsSync(path)) {
    const info = fs.readFileSync(path, 'utf8');
    console.log(info);
    fs.appendFileSync(path, " Nos vimos en disney");

} else {
    fs.writeFileSync("./file.txt","Hola mundo!!!!");
    
}



