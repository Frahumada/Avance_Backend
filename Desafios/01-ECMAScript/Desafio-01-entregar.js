



class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.#getMaxId() + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (!this.#getPrductByCode(product.code)) {
      this.products.push(product);
      console.log("PRODUCTO AGREGADO (" + product.code + ")");
    } else {
      console.log("Error! This code (" + product.code + ") is already exists");
    }
  }

  deletePrductByCode(code) {
    let productToDelete = this.#getPrductByCode(code);
    let indexToDelete = this.products.indexOf(productToDelete);
    if (productToDelete) {
        this.products.splice(indexToDelete, 1);
      console.log("PRODUCTO ELIMINADO (" + productToDelete.code + ")");
    } else {
      console.log("Error! This code (" + code + ") is not added");
    }
  }

  getProducts() {
    return this.products;
  }

  getPrductById(productId) {
    if (this.products.find((product) => product.id === productId)) {
      return this.products.find((product) => product.id === productId)
    } else {
      console.log("Error! product not found");
      return false;
    }
  }

  #getPrductByCode(productCode) {
    if (this.products.find((product) => product.code === productCode)) {
      return this.products.find((product) => product.code === productCode);
    } else {
      return false;
    }
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) {
        maxId = product.id;
      }
    });
    return maxId;
  }
}


function showTitle(title) {
  const large = title.length;
  const maxCharacter = 70;

  if (large > maxCharacter) {
    console.log("* " + title + " *");
  } else {
    const tab = Math.round((maxCharacter - large) / 2);
    const equalLine = '='.repeat(maxCharacter);
    const spaceLine = ' '.repeat(tab);
    
    console.log(equalLine);
    console.log(spaceLine + title + spaceLine);
    console.log(equalLine);
  }
}

//create a new productManager
const productManager = new ProductManager();

//add new products 
showTitle("Add new products")

productManager.addProduct(
  "Tablet",
  "Articulo de tecnologia",
  150000,
  "htttp://www.google.com",
  123,
  11
);
productManager.addProduct(
  "Celular",
  "Articulo de tecnologia",
  100000,
  "htttp://www.google.com",
  124,
  5
);
productManager.addProduct(
  "SmartWatch",
  "Articulo de tecnologia",
  88000,
  "htttp://www.google.com",
  125,
  15
);
productManager.addProduct(
  "Cartucho",
  "Articulo de impresion",
  12000,
  "htttp://www.google.com",
  126,
  10
);

//listing products
showTitle("Show products");
const lista = productManager.getProducts();
console.log(lista);

//Add an existing product
showTitle("Add an existing product")
productManager.addProduct(
  "Cartucho",
  "Articulo de impresion",
  12000,
  "htttp://www.google.com",
  126,
  10
);

//show the product list
showTitle("Show products")
console.log(lista);

//Delete an unexisting product and an existing product
showTitle("Delete an unexisting product")
productManager.deletePrductByCode(111);

showTitle("Delete an existing product")
productManager.deletePrductByCode(125);


//get a product by ID
showTitle("Get an existing product by ID")
const traerProductoPorId = productManager.getPrductById(2)
console.log(traerProductoPorId)

showTitle("Get an unexisting product by ID")
const traerSegundoProductoPorId = productManager.getPrductById(7)
console.log(traerSegundoProductoPorId)

//show the product list
showTitle("Show products")
console.log(lista);

