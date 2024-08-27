// const http = require('http');
import http from 'http';
import {products} from './products.js';

const server = http.createServer((req, res) => {
    // request --> info que viene del cliente
    // response --> se utiliza para la respuesta
    // res.end("Mi primer servidor con HTTP")
    console.log(req.url);

    if (req.url === "/products") {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(products));

    }
    else {
        res.end("OSART")
    }
});

server.listen(8080, ()=>{console.log('listening on port 8080');})
