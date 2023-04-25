const express = require('express')
const productRouter = require('./router/products.router.js')

const app = express()

app.get('/', (request,response)=>{
    response.send('Desafio 03!')
})

app.use('/api/products',productRouter)

app.listen(8080, ()=> console.log('Server Up'))


//comment