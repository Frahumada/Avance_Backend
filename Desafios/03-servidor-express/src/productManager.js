import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
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
  
    addProduct = async (title, description, price, thumbnail, code, stock) => {
      const product = {
        id: uuidv4(),
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
        const nuevo = await this.#getPrductByCode(product.code);
        if (!nuevo) {
          products.push(product);
  
          //guardo productos actualizado
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 4)
          );
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
    };

    getPrductById = async (productId) => {
        const products = await this.getProducts();
        const prodExists = products.find((product) => product.id === productId);
        if (prodExists) {
          return prodExists;
        } else {
          console.log("Error! product not found");
          return null;
        }
    };

    updateProduct = async (productId, field, content) => {
        const products = await this.getProducts();
        const productToUpdate = products.find((product) => product.id === productId);
        let flag = false;
        if (field.toLowerCase() == "title") {
          productToUpdate.title = content;
          flag = true;
        } else if (field.toLowerCase() == "description") {
          productToUpdate.description = content;
          flag = true;
        } else if (field.toLowerCase() == "price") {
          productToUpdate.price = content;
          flag = true;
        } else if (field.toLowerCase() == "thumbnail") {
          productToUpdate.thumbnail = content;
          flag = true;
        } else if (field.toLowerCase() == "code") {
          productToUpdate.code = content;
          flag = true;
        } else if (field.toLowerCase() == "stock") {
          productToUpdate.stock = content;
          flag = true;
        } else {
          console.log("NO HAY CAMPOS PARA ACTUALIZAR");
        }
        if (flag) {
          // await products.push(productToUpdate);
          // await this.deletePrductByCode(productToUpdate.code);
          await fs.promises.writeFile(this.path, JSON.stringify(products));
          console.log("PRODUCTO MODIFICADO (" + productToUpdate.code + ")");
        }
      };

    deletePrductById = async (id) => {
        const products = await this.getProducts();
        let productToDelete = await this.getPrductById(id);
        console.log(productToDelete);
        let indexToDelete = -1;
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === id) {
            indexToDelete = i;
            break
          }
        }
        if (productToDelete) {
          products.splice(indexToDelete, 1);
          await fs.promises.writeFile(this.path, JSON.stringify(products));
          console.log("PRODUCTO ELIMINADO (" + productToDelete.code + ")");
        } else {
          console.log("Error! This code (" + code + ") is not added");
        }
    };
  
    deletePrductByCode = async (code) => {
      const products = await this.getProducts();
      let productToDelete = await this.#getPrductByCode(code);
      console.log(productToDelete);
      let indexToDelete = -1;
      for (let i = 0; i < products.length; i++) {
        if (products[i].code === code) {
          indexToDelete = i;
          break
        }
      }
      if (productToDelete) {
        products.splice(indexToDelete, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log("PRODUCTO ELIMINADO (" + productToDelete.code + ")");
      } else {
        console.log("Error! This code (" + code + ") is not added");
      }
    };
  
    #getPrductByCode = async (productCode) => {
      const products = await this.getProducts();
      if (products.find((product) => product.code === productCode)) {
        return products.find((product) => product.code === productCode);
      } else {
        return false;
      }
    };
  
    #getMaxId = async () => {
      const products = await this.getProducts();
      let maxId = 0;
      products.map((product) => {
        if (product.id > maxId) {
          maxId = product.id;
        }
      });
      return maxId;
    };
  

  }
  