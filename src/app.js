// const express = require('express')
// const productRouter = require('./router/products.router.js')
// const cartRouter = require('./router/carts.router.js')
// const {Server} = require('socket.io')
// const productViewRouter = require('./router/productsView.js')
// const handlebars = require('express-handlebars')
import express from "express"
import { Server } from "socket.io"
import productRouter from "./router/products.router.js"
import cartRouter from "./router/carts.router.js"
import productViewRouter from "./router/productsView.js"
import handlebars from "express-handlebars"
import mongoose from "mongoose"

const url = 'mongodb+srv://coder:coder@cluster0.cmvdrrk.mongodb.net/ecommerce'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.get('/', (request, response) => {
    response.send('Desafio 03!')
})

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/productsview', productViewRouter)

mongoose.set('strictQuery', false)

try {
    await mongoose.connect(url);
    console.log("DB conected");
    const httpServer = app.listen(8080, () => {
        console.log("Server UP");
    });

    const socketServer = new Server(httpServer);

    socketServer.on("connection", (socketClient) => {
        console.log("User conected");
        socketClient.on("deleteProd", (prodId) => {
            const result = prod.deleteProduct(prodId);
            if (result.error) {
                socketClient.emit("error", result);
            } else {
                socketServer.emit("products", prod.getProducts());
                socketClient.emit("result", "Producto eliminado");
            }
        });
        socketClient.on("addProd", (product) => {
            const producto = JSON.parse(product);
            const result = prod.addProduct(producto);
            if (result.error) {
                socketClient.emit("error", result);
            } else {
                socketServer.emit("products", prod.getProducts());
                socketClient.emit("result", "Producto agregado");
            }
        });
        socketClient.on("newMessage", async (message) => {
            try {
                console.log(message);
                let newMessage = await messageModel.create({
                    user: message.email.value,
                    message: message.message,
                });
                console.log("app", newMessage);
                socketServer.emit("emitMessage", newMessage);
            } catch (error) {
                console.log(error);
                socketClient.emit("error", error);
            }
        });
    });
} catch (error) {
    console.log(error);
}