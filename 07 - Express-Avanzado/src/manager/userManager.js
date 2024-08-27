import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class UserManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(users);
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createUser(obj) {
    try {
      const user = {
        id: uuidv4(),
        ...obj,
      };
      const users = await this.getUsers();
      const userExist = users.find((u) => u.username === user.username);
      if (userExist) return "User exits";
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users));
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  // async deleteFile() {
  //   try {
  //     await fs.promises.unlinkSync(this.path);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async getUsersById(id) {
    try {
      const users = await this.getUsers();
      const userExist = users.find((u) => u.id === id);
      if (!userExist) return null;
      return userExist;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(obj, id) {
    try {
      const users = await this.getUsers(); //Obtengo usuarios
      let userExist = await this.getUsersById(id); //Busco user por ID
      if (!userExist) return null; //Si no existe retorno null
      userExist = { ...userExist, ...obj }; //Reemplazamos el user encontrado por el objeto a modificar (parametro obj) y el resto del user esxistente
      const newArray = users.filter((u) => u.id !== id); //Creo nuevo array sin el user original
      newArray.push(userExist); // Le paso el user modificado al array nuevo
      await fs.promises.writeFile(this.path, JSON.stringify(newArray)); //Piso el user.json con el nuevo array
      return userExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id) {
    const users = await this.getUsers(); //Obtengo usuarios
    if (users.length > 0) {
      //Si hay usuarios hago lo siguiente
      let userToDelete = await this.getUsersById(id); //Busco user por ID
      if (!userToDelete) return null; //Si no encuentro user devuelvo null
      else {
        //Si lo encuentro hago lo siguiente
        const newArray = users.filter((u) => u.id !== id); //Creo un nuevo array filtrando el user encontrado
        await fs.promises.writeFile(this.path, JSON.stringify(newArray)); //piso el user.json con el nuevo array modificado
        return userToDelete; //Retorno el user a borrar
      }
    }
  }
}
