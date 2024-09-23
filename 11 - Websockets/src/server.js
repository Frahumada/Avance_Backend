import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js';
import { Server } from 'socket.io';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/',viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, ()=>console.log(`listening on port'${PORT}`));

const socketServer = new Server(httpServer);

const arrayProducts = [];

socketServer.on('connection',(socket)=>{
    console.log(socket.toString());
    console.log(socket.id, ' Se conecto');
    
    socket.on('disconnect', ()=>{
        console.log(socket.id, ' Se DESconecto');
        
    })

    socket.emit('saludoDesdeBack',"Bienvenidos a WEBSOCKET")

    socket.on('respuestaDesdeFront', (res)=>{
        console.log(res.toString());
    })

    socket.on('addProduct', (product)=>{
        arrayProducts.push(product);
        socket.emit('products', arrayProducts);
    });

    socket.on('deleteProduct', (product)=>{
        arrayProducts.pop();
        socket.emit('products', arrayProducts);
    });
});


