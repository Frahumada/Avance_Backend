import mongoose from "mongoose";

const connectionString = 'mongodb://localhost:27017/coderBackend'

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Se concetó a la db ", connectionString);
    } catch (error) {
        console.log("Entro por el error...");

        console.log(error);
    }
};


initMongoDB()
