console.log("Se ejecuta desde handlebars");
const socketClient = io();

socketClient.on('saludoDesdeBack', (message)=> {
    console.log(message);

    socketClient.emit('respuestaDesdeFront', "Muchas gracias!!!");
})


const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const products = document.getElementById('productsTableRows');
const button = document.getElementById('button');

buttonSend.onclick = (e) => {
    e.preventDefault();
    console.log("ENTRO AL SEND");
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    };
    socketClient.emit('addProduct', product);
}
buttonDelete.onclick = (e) => {
    e.preventDefault();
    console.log("ENTRO AL DELETE");
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    };
    socketClient.emit('deleteProduct', product);
}

socketClient.on('products', (prods) => {
    let addToproducts = '';
    prods.map((prod) => {
        addToproducts += `<tr>
            <th scope="row">1</th>
            <td>${prod.name}</td>
            <td>$${prod.price}</td>
        </tr>`
        });
    console.log(addToproducts);
    products.innerHTML = addToproducts;
    });
    

