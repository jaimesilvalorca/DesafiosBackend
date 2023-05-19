// const { Router } = require('express')
// const fs = require ('fs')
import { Router } from 'express'
import fs from 'fs'
import cartsModel from '../dao/models/carts.models.js'

// const filename = './productManager.json'
const router = Router()

router.get('/', async (req, res) => {
    const carts = await cartsModel.find().lean().exec()
    console.log(carts)
    res.send(carts)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const carts = await cartsModel.findOne({ id }).lean().exec()
    res.send(carts)
})

router.post('/', async (req, res) => {
    const cartNew = req.body
    const cartGenerated = new cartsModel(cartNew)
    await cartGenerated.save()
})


router.post('/:id/product/:pid', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const pid = req.params.pid
    console.log(pid)
    const cart = await cartsModel.findOneAndUpdate({ id }).lean().exec()
    console.log(cart)
    console.log(cart.products)
    const existingProduct = cart.products.find((product) => product.product === pid);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }
    console.log(cart)

    await cart.save()

    res.send('carrito actualizado')
})









// router.post('/', (req,res) =>{
//     const cart = {title:"producto prueba 4", description:"nuevo producto prueba 4", price:"Profe awesome10", thumbnail:"sin imagen",code:"123123123", stock:"111"}
//     const content = fs.readFileSync(filename,'utf-8')
//     const cartJ = JSON.parse(content)
//     cartJ.push(cart)
//     res.status(201).send('OK!')})

// router.put('/',(req,res)=>{
//     const cart = req.body
//     const content = fs.readFileSync(filename,'utf-8')
//     const cartJ = JSON.parse(content)
//     cartJ = cartJ.filter(item => item.id === id)
//     cartJ.push(cart)

// })

// router.delete('/:id',(req,res)=>{
//     const id = req.params.id
//     const content = fs.readFileSync(filename,'uft-8')
//     const cartJ = JSON.parse(content)
//     cartJ = cartJ.filter(item => item.id === id)
//     res.send(cartJ)
// })

// router.post('/',(req,res)=>{
//     const newProduct = req.body
//     const content = fs.readFileSync(filename,'utf-8')
//     const cartJ = JSON.parse(content)
//     cartJ.push(newProduct)
//     res.status(201).send('Ok!!!')
//     fs.writeFileSync(filename,JSON.stringify(cartJ,null,'\t'))
// })

export default router