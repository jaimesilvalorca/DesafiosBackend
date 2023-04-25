const { Router } = require('express')
const fs = require ('fs')
const filename = '../productManager.json'

const router = Router()

app.post('/cart', (req,res) =>{
    const cart = {title:"producto prueba 4", description:"nuevo producto prueba 4", price:"Profe awesome10", thumbnail:"sin imagen",code:"123123123", stock:"111"}
    const content = fs.readFileSync(filename,'utf-8')
    const cartJ = JSON.parse(content)
    cartJ.push(cart)
    res.status(201).send('OK!')})

app.put('/cart',(req,res)=>{
    const cart = req.body
    const content = fs.readFileSync(filename,'utf-8')
    const cartJ = JSON.parse(content)
    cartJ.push(cart)

})

app.delete('/cart/:id',(req,res)=>{
    const id = req.params.id
    const content = fs.readFileSync(filename,'uft-8')
    const cartJ = JSON.parse(content)
    cartJ = cartJ.filter(item => item.id === id)
    res.send(cartJ)
})

module.exports = router