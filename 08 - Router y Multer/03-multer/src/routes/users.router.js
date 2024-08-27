// import express from 'express';
// express.Router()

import { Router } from "express";
const router = Router();

import UserManager from "../manager/userManager.js";
import { userValidator } from "../middlewares/user.validator.js";
import { bodyValidator } from "../middlewares/body.validator.js";
import { uploader } from "../middlewares/multer.js";
const userManager = new UserManager("./src/data/users.json");


router.get("/", async (req, res) => {
    try {
      const users = await userManager.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
  router.post("/", [userValidator, bodyValidator] ,async (req, res) => {
    try {
      const user = await userManager.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

  router.post('/profile', uploader.single('profile'), async (req, res) => {
    try {
      console.log(req.file);
      const user = req.body;
      user.profile = req.file.path;
      const userCreated = await userManager.createUser(user);
      res.json(userCreated);
    } catch (error) {
      res.json(error.message);
    }
  })
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userManager.getUsersById(id);
      if (!user) res.status(404).json({ msg: "User not found" });
      else res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const userUpd = await userManager.updateUser(req.body, id);
      if (!userUpd) res.status(404).json({ msg: "Error updating user" });
      else res.status(200).json(userUpd);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params; //Obtengo id a buscar desde el endpoint
      const delUser = await userManager.deleteUser(id);
      console.log(delUser);
      if (!delUser) res.status(404).json({ msg: "Error delete user" });
      else res.status(200).json({ msg: `User id: ${id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });


  export default router;