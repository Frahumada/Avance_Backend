//Desafio hasta 04-Manejo de archivos
// FS promesas async await

const fs = require('fs');

class ManagerUsers {
    constructor(path) {
        this.path = path;
    }

    async getUsers() {
        try {
            if(fs.existsSync(this.path)) {
                const users = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(users);
            } else {
                return [];
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    async createUser(user) {
        try {
            const users = await this.getUsers();
            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));
        } catch (err) {
            console.error(err);
        }

    }

}


//generar una instancia de  ManagerUsers
const manager = new ManagerUsers("./users.json");

const userA = {
    "firstName": "Rodrigo",
    "lastName": "Ceballos",
    "age": 29
}

const userB = {
    "firstName": "Franco",
    "lastName": "Ahumada",
    "age": 17
}

const test = async() => {
    console.log(await manager.getUsers());
    await manager.createUser(userA);
    await manager.createUser(userB);
    console.log(await manager.getUsers());
}

test ()

