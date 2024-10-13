import { initMongoDB } from "./01 - conexion.js";
import  { userModel } from "./02 - schema.js";

function mostrarUsers(users) {
    for (var i = 0; i < users.length; i++) {
        console.log("Nombre : ",users[i].firstName);
        console.log("Edad : ",users[i].age);
        console.log("              -              ");
    }
}

const consultas = async () => {
    await initMongoDB();

    const todos = await userModel.find();
    mostrarUsers(todos);
    console.log ("__________________________________________________")
    const may29 = await userModel.find({ age : {$gt: 29}}); 
    mostrarUsers(may29);
    console.log ("__________________________________________________")
    const ascUsers = await userModel.find().sort({ age : 1});
    mostrarUsers(ascUsers);
    console.log ("__________________________________________________")
    const ascMay29Users = await userModel.find({ age : {$gt: 29}}).sort({ age : 1});
    mostrarUsers(ascMay29Users);
}

consultas()