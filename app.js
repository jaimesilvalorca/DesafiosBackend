const express = require('express')
const productRouter = require('./router/products.router.js')
const cartRouter = require('./router/carts.router.js')

const app = express()

app.get('/', (request,response)=>{
    response.send('Desafio 03!')
})

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter) 

app.listen(8080, ()=> console.log('Server Up'))


//comment