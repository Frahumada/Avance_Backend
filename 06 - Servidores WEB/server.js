import express from 'express';
import {products} from './products.js';

const app = express();

const port = 8081

app.get('/error', (req, res) => {
    //res.send("<h1>Hola mundo!</h1>")
    //res.json(products)
    //res.redirect('/home')
    //res.render()
    res.status(404).json({msg:"404 Not Found"})
})

app.get('/productos', (req, res) => {
    res.json(products)
    //console.log(req);
    //query
            // const { value } = req.query // const value = req.query.value
            // console.log(value);
            // const productFilter = products.filter(product => product.price > parseInt(value));
            // res.json(productFilter)
            //! PRECIO MAYOR A: 15 |BUSCAR| --> GET localhost:port/productos?value=15
    //params
            

    //body
})

app.get('/productos/:id', (req, res) => {
   //params
   const { id } = req.params; //const id = req.params.id;
   const prodFilter = products.filter(p => p.id === parseInt(id));
   if (!prodFilter) res.json({ error:"Product not found"});
   else res.json(prodFilter);
   


})

app.listen(port, ()=> console.log(`listening on ${port}`));