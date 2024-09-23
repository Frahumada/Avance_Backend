import express from "express";
import cartRouter from "./routes/cartRouter.js";
import productRouter from "./routes/productsRouters.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import morgan from "morgan";
import { __dirname } from "./path.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import ProductManager from "./managers/product.manager.js";

const pm = new ProductManager(`${__dirname}/db/products.json`);

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/carts/", cartRouter);
app.use("/api/products/", productRouter);
app.use("/api/", viewRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewRouter);

app.use(errorHandler);

const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(socket.toString());
  console.log(socket.id + " connected");
  const arrayProducts = [];

  socket.on("disconnect", () => {
    console.log(socket.id, " Se DESconecto");
  });

  socket.emit("saludoDesdeElServidor", "SALUDO DESDE EL SERVIDOR");

  socket.on("respuestaDesdeFront", (res) => {
    console.log(res.toString());
  });

  socket.on("addProduct", async (product) => {
    try {
      const producto = await pm.getProductsByTitle(product.title);
      const prodToShow = {
        title: producto.title,
        price: producto.price,
        quantity: parseInt(product.quantity),
        finalPrice: producto.price * product.quantity,
      };

      if (!producto) {
        console.log("Product not found");
        console.log(producto);
      } else if (arrayProducts.length == 0) {
        arrayProducts.push(prodToShow);
      } else {
        const exist = arrayProducts.find(
          (prod) => prod.title == prodToShow.title
        );
        if (exist) {
          const pos = arrayProducts.findIndex(
            (prod) => prod.title === prodToShow.title
          );
          prodToShow.quantity += arrayProducts[pos].quantity;
          prodToShow.finalPrice = prodToShow.quantity * prodToShow.price;
          arrayProducts.splice(pos, 1, prodToShow);
        } else {
          arrayProducts.push(prodToShow);
        }
      }
      socket.emit("arrayProductsToShow", arrayProducts);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("deleteProduct", async (product) => {
    try {
         if (arrayProducts.length == 0) {
        console.log("Producto NO agregado");
      } else {
        const exist = arrayProducts.find((p) => p.title === product.title);
        console.log("Producto - ",exist);
        if (!exist) {
        console.log("Producto NO agregado");
        } else {
            const prodToShow = {
                title: exist.title,
                price: exist.price,
                quantity: parseInt(product.quantity),
                finalPrice: 0,
              };
          const pos = arrayProducts.findIndex(
            (prod) => prod.title === prodToShow.title
          );
          prodToShow.quantity = arrayProducts[pos].quantity - prodToShow.quantity;
          console.log(prodToShow);
          prodToShow.finalPrice = prodToShow.quantity * exist.price;
          console.log(prodToShow);
          arrayProducts.splice(pos, 1, prodToShow);
        }
      }
      socket.emit("arrayProductsToShow", arrayProducts);
    } catch (error) {
      console.error(error);
    }
  });
});
