import express from "express";
import userRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import {dirname} from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);



const app = express();

app.use(express.static(__dirname + '/static/public'));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users',userRouter);
app.use('/pets',petsRouter);


const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
