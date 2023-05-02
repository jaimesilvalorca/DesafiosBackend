const {Router} = require('express')
const fs = require ('fs')
const filename = './productManager.json'

const router = Router()


router.get ('/',(request,response)=>{
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

router.get('/:pid',(request,response)=>{
    const content = fs.readFileSync(filename,'utf-8')
    const products = JSON.parse(content)
    const pid = request.query.pid
    if(pid){
        const result = products.find(item =>item.id == pid)
        response.send({result})
    }else{
        response.send('No se encontró el ID seleccionado')
    }
})

router.get('/',(req,res)=>{
    const content = fs.readFileSync(filename,'utf-8')
    const products = JSON.parse(content)
    res.render('home',products)
})


module.exports = router