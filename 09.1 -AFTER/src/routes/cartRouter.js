import { Router } from "express";
const cartRouter = Router();

import cartManager from "../managers/cart.manager.js";
import { __dirname } from "../path.js";






cartRouter.get("/", async (req, res) => {
    try {
      const products = await userManager.getProduct();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
//   cartRouter.post("/", async (req, res) => {
//     try {
//       const user = await userManager.createUser(req.body);
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   });
  
//   cartRouter.get("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const user = await userManager.getUsersById(id);
//       if (!user) res.status(404).json({ msg: "User not found" });
//       else res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   });
  
//   cartRouter.put("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const userUpd = await userManager.updateUser(req.body, id);
//       if (!userUpd) res.status(404).json({ msg: "Error updating user" });
//       else res.status(200).json(userUpd);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   });
  
//   cartRouter.delete("/:id", async (req, res) => {
//     try {
//       const { id } = req.params; //Obtengo id a buscar desde el endpoint
//       const delUser = await userManager.deleteUser(id);
//       console.log(delUser);
//       if (!delUser) res.status(404).json({ msg: "Error delete user" });
//       else res.status(200).json({ msg: `User id: ${id} deleted successfully` });
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   });


  export default cartRouter;