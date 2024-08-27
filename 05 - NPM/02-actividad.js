const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    if (fs.existsSync(this.path)) {
      const userFile = await fs.promises.readFile(this.path, "utf8");
      const users = JSON.parse(userFile);
      return users;
    } else return [];
  }

  async createUser(user) {
    const usersFile = await this.getUsers();
    const userExist = usersFile.find((usr) => usr.userName === user.userName);
    if (userExist) return 'Usuario existente'
    else {user.salt = crypto.randomBytes(32).toString();
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
    usersFile.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(usersFile));}
    
  }

  async validateUser(userName, password) {
    const usersFile = await this.getUsers();
    const user = usersFile.find((usr) => usr.userName === userName);
    if (!user) return "Error: user o password incorrecto!";
    const nuevaCrypto = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");
    if (user.password === nuevaCrypto) return "Login OK!";
    else return "Error: user o password incorrecto!";
  }
}

const manager = new UserManager("./Users.json");

const user1 = {
  firsName: "Juan",
  lastName: "Gomez",
  userName: "Usuario1",
  password: "Password1",
};
const user2 = {
  firsName: "Rodrigo",
  lastName: "Ceballos",
  userName: "Usuario2",
  password: "Password2",
};
const user3 = {
  firsName: "Franco",
  lastName: "Ahumada",
  userName: "Usuario3",
  password: "Password3",
};

const test = async () => {
  await manager.createUser(user1);
  await manager.createUser(user2);
  await manager.createUser(user3);

  console.log(await manager.validateUser("Usuario2", "123"));
  console.log(await manager.validateUser("Usuario2", "Password2"));
};

test();
