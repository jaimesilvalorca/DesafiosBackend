const express = require('express')
const fs = require ('fs')
const filename = './productManager.json'

const app = express()

app.get('/', (request,response)=>{
    response.send('Desafio 03!')
})



app.get ('/products',(request,response)=>{
    const content = fs.readFileSync(filename,'utf-8')
    const products = JSON.parse(content)
    const limit = request.query.limit
    if(limit){
        const result = products.slice(0, limit)
        const count = result.length
        if(count > 0){
            response.json({result})
        }else if(count === 0){
            response.send('Numero de limite invalido')

        }     
    }else{
        response.send({products})
    }
})

app.get('/products/:pid',(request,response)=>{
    const content = fs.readFileSync(filename,'utf-8')
    const products = JSON.parse(content)
    const pid = request.query.pid
    if(pid){
        const result = products.fin(item =>item.id == pid)
        response.send({result})
    }else{
        response.send('No se encontró el ID seleccionado')
    }
})



app.listen(8080, ()=> console.log('Server Up'))


//comment