import { initMongoDB } from "./01 - conexion.js";
import  { userModel } from "./02 - schema.js";

function mostrarUsers(users) {
    for (var i = 0; i < users.length; i++) {
        console.log("Nombre : ",users[i].firstName);
        console.log("Edad : ",users[i].age);
        console.log("              -              ");
    }
}

const actualizar = async () => {
    await initMongoDB();
    const id = '670c311ddc03cfcf42505e23'

    console.log(await userModel.findOneAndUpdate({_id: '670c311ddc03cfcf42505e23'}, {role: 'adminTest'}, {new: true}));

}

actualizar()



