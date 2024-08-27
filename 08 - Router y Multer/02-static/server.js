import express from "express";
import {dirname} from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
