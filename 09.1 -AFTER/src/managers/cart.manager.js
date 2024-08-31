import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import productManager from "./product.manager.js";

export default class CartManager {
    constructor(path) {
        this.path = path;
    }
    
    async getCart() {
        try {
            
        }
        catch (error) {
            console.log(error);            
        }
    }



}
