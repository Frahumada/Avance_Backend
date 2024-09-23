console.log("Se ejecuta desde handlebars");
const socketClient = io();

socketClient.on('saludoDesdeElServidor', (message)=> {
    console.log(message);

    socketClient.emit('respuestaDesdeFront', "Muchas gracias!!!");
})


const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputQuantity = document.getElementById('quantity');
const products = document.getElementById('productsTableRows');
const button = document.getElementById('button');

buttonSend.onclick = (e) => {
    e.preventDefault();
    const title = inputName.value;
    const quantity = inputQuantity.value;
    const product = {
        title: title,
        quantity: parseInt(quantity)
    };
    socketClient.emit('addProduct', product);
}
buttonDelete.onclick = (e) => {
    e.preventDefault();
    console.log("ENTRO AL DELETE");
    const title = inputName.value;
    const quantity = inputQuantity.value;
    const product = {
        title: title,
        quantity: parseInt(quantity)
    };
    socketClient.emit('deleteProduct', product);
}

socketClient.on('arrayProductsToShow', (productos) => {
    let addToproducts = '';
    productos.map((productos) => {
        addToproducts += `<tr>
            <th scope="row">1</th>
            <td>${productos.title}</td>
            <td>$${productos.price}</td>
            <td>${productos.quantity}</td>
            <td>$${productos.finalPrice}</td>
        </tr>`
        });
    console.log(addToproducts);
    products.innerHTML = addToproducts;
    });
    

