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
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.get('/', (request,response)=>{
    response.send('Desafio 03!')
})

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/api/productsview',productViewRouter) 

mongoose.set('strictQuery',false)



try {
    await mongoose.connect(url)
    console.log('Conectado')
    app.listen(8080,()=>console.log('Server up'))
    console.log(url)
} catch (error) {
    console.log('No es posible conectarse a la base de datos')
}

// const socketServer = new Server(httpServer)
// const httpServer = app.listen(8080, ()=> console.log('Server Up'))

//comment