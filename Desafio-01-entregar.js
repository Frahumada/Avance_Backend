
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
    let auxProducts = [];
    console.log("INDEX: " + indexToDelete + " (" + productToDelete.code + ")");
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
      return true;
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

  #validateCode(codeProduct) {
    if (!this.products.find((product) => product.code === codeProduct)) {
      return codeProduct;
    } else {
      return false;
    }
  }
}

//create a new productManager
const productManager = new ProductManager();

//add new products 
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
const lista = productManager.getProducts();
console.log(lista);

//Add an existing product
productManager.addProduct(
  "Cartucho",
  "Articulo de impresion",
  12000,
  "htttp://www.google.com",
  126,
  10
);

//show the product list
console.log("=============================================");
console.log(lista);

//Delete an unexisting product and an existing product
productManager.deletePrductByCode(111);
productManager.deletePrductByCode(125);

console.log(lista);
