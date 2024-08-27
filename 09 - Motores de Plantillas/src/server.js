import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/',viewsRouter);

const PORT = 8080;




app.listen(PORT, ()=>console.log(`listening on port'${PORT}`));

