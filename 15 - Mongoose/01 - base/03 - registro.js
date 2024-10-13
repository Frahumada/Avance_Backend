import { initMongoDB } from "./01 - conexion.js";
import { userModel } from "./02 - schema.js";

const createUser = async (user) => {
    try {
        console.log("Creating user");
        await userModel.create(user);
    } catch (error) {
        console.log("Error creating user");
    }

};

const test = async () => {
  // Conexion a db
  await initMongoDB();

  const newUser = {
    firstName: "Rodrigo",
    lastName: "Ahumada",
    email: "rodrigoNumero3@gmail.com",
    userName: "RodrigoUsuario",
    password: "UnaClave",
    age: 30,
  };

  console.log(newUser);

  await createUser(newUser);
  console.log("Usuario creado");
};

test();