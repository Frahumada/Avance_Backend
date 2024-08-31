import { Router } from "express";
const productRouter = Router();

import { __dirname } from "../path.js";
console.log(__dirname);

import ProductManager from "../managers/product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/productos.json`);
console.log(`${__dirname}/db/productos.json`);

import { producValidator } from "../middlewares/productValidator.js";

productRouter.get("/", async (req, res, next) => {
  try {
    //Obtengo todos los productos
    const products = await productManager.getProducts();
    //Obtengo el limite del endpoint con req.query
    const { limit } = req.query;
    //Si el limite no existe devuelvo todos los productos
    if (!limit) {
      res.status(200).json(products);
    } else {
      //Paso el limite a numero entero
      const parsedLimit = parseInt(limit, 10);
      //Si da error (porque no es un numero), devuelvo error con mensaje de limite invalido
      if (isNaN(parsedLimit)) {
        return res.status(404).json({ error: "Invalid limit" });
      } else {
        //Guardo en array cantidad de productos a mostrar segun limite recibido por parametro
        const cantProducts = await products.slice(0, parsedLimit);
        //Validar si existe algun producto en cantProducts
        if (!cantProducts) res.json({ error: "Product not found" });
        else res.json(cantProducts);
      }
    }
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:idproduct", async (req, res) => {
  try {
    const { idproduct } = req.params;
    const product = await productManager.getProductsById(idproduct);
    if (!product) res.status(404).json({msg: "Product not found"});
    else res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

productRouter.post('/', producValidator, async(req,res) =>{
  try {
    const product = req.body;
    const newProduct = await productManager.createProduct(product);  
    res.json(newProduct)
  } catch (error) {
    res.status(404).json({ msg: error.message });    
  }
})


productRouter.put('/:pid',  async(req,res) =>{
  try {
    const {pid} = req.params; //guardo id recibido por params
    const prodToUpdate = await productManager.updateProduct(req.body, pid);
    return prodToUpdate;
  } catch (error) {
    res.status(404).json({ msg: error.message }); 
  }
});

export default productRouter;
