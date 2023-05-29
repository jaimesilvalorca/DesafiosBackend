// const {Router} = require('express')
// const fs = require ('fs')
import { Router } from 'express'
import fs from 'fs'
import productsModel from '../dao/models/products.models.js'

const filename = './productManager.json'
const router = Router()

router.get('/', async (req, res) => {
    const products = await productsModel.find().lean().exec()
    console.log(products)
    res.render('home',
        { products }
    )
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await productsModel.findOne({ id }).lean().exec()
    res.send({ product })
})

router.post('/', async (req, res) => {
    const productNew = req.body
    const productGenerated = new productsModel(productNew)
    await productGenerated.save()
})

router.put('/:pid', async (req, res) => {
    const _id = req.params.pid
    
    const update = req.body
    const product = await productsModel.findOneAndUpdate({_id }, update).lean().exec()
    res.send({ product })
})

router.delete('/:pid', async (req, res) => {
    const _id = req.params.pid
    const product = await productsModel.deleteOne({_id})
    res.send("Producto Eliminado")
})






// router.get ('/',(request,response)=>{
//     const content = fs.readFileSync(filename,'utf-8')
//     const products = JSON.parse(content)
//     const limit = request.query.limit
//     if(limit){
//         const result = products.slice(0, limit)
//         const count = result.length
//         if(count > 0){
//             response.json({result})
//         }else if(count === 0){
//             response.send('Numero de limite invalido')

//         }     
//     }else{
//         response.send({products})
//     }
// })

// router.get('/:pid',(request,response)=>{
//     const content = fs.readFileSync(filename,'utf-8')
//     const products = JSON.parse(content)
//     const pid = request.query.pid
//     if(pid){
//         const result = products.find(item =>item.id == pid)
//         response.send({result})
//     }else{
//         response.send('No se encontró el ID seleccionado')
//     }
// })

// router.get('/',(req,res)=>{
//     const content = fs.readFileSync(filename,'utf-8')
//     const products = JSON.parse(content)
//     res.render('home',products)
// })


export default router

