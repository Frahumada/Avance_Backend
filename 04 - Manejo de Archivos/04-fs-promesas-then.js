const { log } = require("console");
const fs = require("fs");

const path = "./file-CallBack-2.txt";

if (fs.existsSync(path)) {
  fs.promises
    .readFile(path, "utf8")
    .then((info) => {
      console.log(info);
      return fs.promises.appendFile(path, "EL archivo existe!!");
    })
    .then(() => console.log("info agregada exitosamente!"))
    .catch((err) => {
      console.log(err);
    });
} else {
  fs.promises
    .writeFile(path, "Primer texto")
    .then(() => console.log("Archivo creado con exito!"))
    .catch((err) => console.log(err));
}

/*----------------------------------------------------------------*/

const products = [
  {
    name: "teclado",
    price: 5000,
    stock: 15,
  },
  {
    name: "Mouse",
    price: 2500,
    stock: 12,
  },
  {
    name: "Monitor",
    price: 8200,
    stock: 8,
  },
  {
    name: "Cable de red",
    price: 1200,
    stock: 21,
  },
];

const pathJSON = "file3.json";

// Crear archivo con products como contenido
fs.writeFileSync(pathJSON, JSON.stringify(products));

// Paso a formato JSON
const info = fs.readFileSync(pathJSON, "utf8");

// Paso a formato JAVASCRIPT
const infoJs = JSON.parse(info);

console.log(infoJs.filter((x) => x.stock > 12));
