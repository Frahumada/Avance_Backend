const { log } = require("console"); // no hace falta
const fs = require("fs");

class ProductManager {
constructor(path) {
  this.products = path;

  //te falta inicializar this.path
  //this.products deberia ser = a [] no a la ubicacion del archivo
}

addProduct = async (title, description, price, thumbnail, code, stock) => {
  const product = {
    id: this.#getMaxId() + 1, // falta el await
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };

  try {
    //Obtener productos
    const products = await this.getProducts();

    //Valido que no este repetido el producto
    if (!this.#getPrductByCode(product.code)) { //falta el await
      products.push(product);

      //guardo productos actualizado
      await fs.promises.writeFile(this.path, JSON.stringify(products)); //agregar a stringify los parametros null, 4 JSON.stringify(products, null, 4)
      console.log("PRODUCTO AGREGADO (" + product.code + ")");
    } else {
      console.log(
        "Error! This code (" + product.code + ") is already exists"
      );
    }

    //Valido que los campos esten completos
    if (
      Object.values(products).includes("") ||
      Object.values(products).includes(null)
    ) {
      console.log("Los campos no deben estar vacios");
    }
  } catch (error) {
    console.log(error);
  }
}

deletePrductByCode = async (code) => {

  const products = await this.getProducts();
  let productToDelete = this.#getPrductByCode(code);
  let indexToDelete = products.indexOf(productToDelete);
  if (productToDelete) {
    products.splice(indexToDelete, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    console.log("PRODUCTO ELIMINADO (" + productToDelete.code + ")");
  } else {
    console.log("Error! This code (" + code + ") is not added");
  }
}

getProducts = async () => {
  try {
    if (fs.existsSync(this.path)) {
      const products = await fs.promises.readFile(this.path, "utf8");
      return JSON.parse(products);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

getPrductById = async (productId) => {
  const products = await this.getProducts();
  if (products.find((product) => product.id === productId)) {
    return products.find((product) => product.id === productId);
  } else {
    console.log("Error! product not found");
    return false;
  }
};

#getPrductByCode = async (productCode) => {
  const products = await this.getProducts();
  if (products.find((product) => product.code === productCode)) {
    return products.find((product) => product.code === productCode);
  } else {
    return false;
  }
}

#getMaxId = async () => {
  const products = await this.getProducts();
  let maxId = 0;
  products.map((product) => {
    if (product.id > maxId) {
      maxId = product.id;
    }
    return maxId; //el return debe ir por fuera del if, sino, da null o 0
  });
}

// el updateProduct no funciona bien, duplica el producto y en el archivo queda asi:
// {
//   "id": 3,
//   "title": "Celular",
//   "description": "Articulo de tecnologia",
//   "price": 100000,
//   "thumbnail": "htttp://www.google.com",
//   "code": 124,
//   "stock": 5
// }
// {
//   "id": 3,
//   "title": "SE CAMBIO LA DESCRIPCION DEL PRODUCTO CON ID = 3",
//   "description": "Articulo de tecnologia",
//   "price": 100000,
//   "thumbnail": "htttp://www.google.com",
//   "code": 124,
//   "stock": 5
// }
updateProduct = async (
  productId,
  title = "",
  description = "",
  price = false,
  thumbnail = "",
  code = false,
  stock = false
) => {
  const products = await this.getProducts();
  const productToUpdate = this.getPrductById(productId); // falta el await
  if (title) {
    productToUpdate.title = title;
  } else if (description) {
    productToUpdate.description = description;
  } else if (price) {
    productToUpdate.price = price;
  } else if (thumbnail) {
    productToUpdate.thumbnail = thumbnail;
  } else if (code) {
    productToUpdate.code = code;
  } else if (stock) {
    productToUpdate.stock = stock;
  } else {
    console.log("NO HAY CAMPOS PARA ACTUALIZAR");
  }
  products.push(productToUpdate);
  await fs.promises.writeFile(this.path, JSON.stringify(products));
  console.log("PRODUCTO MODIFICADO (" + productToUpdate.code + ")");
}
};


function showTitle(title) {
const large = title.length;
const maxCharacter = 70;

if (large > maxCharacter) {
  console.log("* " + title + " *");
} else {
  const tab = Math.round((maxCharacter - large) / 2);
  const equalLine = "=".repeat(maxCharacter);
  const spaceLine = " ".repeat(tab);

  console.log(equalLine);
  console.log(spaceLine + title + spaceLine);
  console.log(equalLine);
}
}

//create a new productManager
const productManager = new ProductManager("./products.json");


const test = async () => {

//create a empty archive of the product
await fs.promises.writeFile("./products.json", "[]");

//call "getProducts" to get an empty array
showTitle("get an empty array");
emptyList = await productManager.getProducts();
console.log(emptyList);

//add new product
showTitle("Add new product");

//listing products

await productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
await productManager.addProduct(
  "Tablet",
  "Articulo de tecnologia",
  150000,
  "htttp://www.google.com",
  123,
  11
);
await productManager.addProduct(
  "Celular",
  "Articulo de tecnologia",
  100000,
  "htttp://www.google.com",
  124,
  5
);
await productManager.addProduct(
  "SmartWatch",
  "Articulo de tecnologia",
  88000,
  "htttp://www.google.com",
  125,
  15
);
await productManager.addProduct(
  "Cartucho",
  "Articulo de impresion",
  12000,
  "htttp://www.google.com",
  126,
  10
);

//listing products
showTitle("Show products");
const lista = await productManager.getProducts();
console.log(lista);

//get a product by ID
showTitle("Get an existing product by ID");
const traerProductoPorId = await productManager.getPrductById(2);
console.log(traerProductoPorId);

showTitle("Get an unexisting product by ID");
const traerSegundoProductoPorId = await productManager.getPrductById(9999);
console.log(traerSegundoProductoPorId);

//Update a product
showTitle("Update a product");
// await productManager.updateProduct(
//   3,
//   (desciption = "SE CAMBIO LA DESCRIPCION DEL PRODUCTO CON ID = 3")
// );

//Delete an unexisting product and an existing product
showTitle("Delete an unexisting product");
await productManager.deletePrductByCode(111);

showTitle("Delete an existing product");
await productManager.deletePrductByCode(125);

//Add an existing product
showTitle("Add an existing product");
await productManager.addProduct(
  "Cartucho",
  "Articulo de impresion",
  12000,
  "htttp://www.google.com",
  126,
  10
);

//show the product list
showTitle("Show products");
console.log(lista);

//show the product list
showTitle("Show products");
console.log(lista);

}

test();
