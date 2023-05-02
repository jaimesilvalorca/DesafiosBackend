const express = require('express')
const productRouter = require('./router/products.router.js')
const cartRouter = require('./router/carts.router.js')
const {Server} = require('socket.io')
const productViewRouter = require('./router/productsView.js')
const handlebars = require('express-handlebars')



const app = express()

app.use(express.static('public'))
app.engine('handlebars', handlebars.engine())
app.set('views', '/views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (request,response)=>{
    response.send('Desafio 03!')
})

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/api/productsView',productViewRouter) 

const httpServer = app.listen(8080, ()=> console.log('Server Up'))

const socketServer = new Server(httpServer)




//comment