import { Router } from 'express'
import fs from 'fs'
// const {Router} = require('express')
// const fs = require ('fs')


const filename = './productManager.json'
 
const router = Router()


router.get('/',(req,res)=>{
    const content = fs.readFileSync(filename,'utf-8')
    const products = JSON.parse(content)
    res.render('home',{products})
})

export default router