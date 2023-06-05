import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import productModel from "../dao/models/products.models.js";

const router = Router()

router.get('/register', (req, res) => {
    res.render('sessions/register')
})

router.post('/register',async(req, res) => {
    const userNew = req.body
    const user = new UserModel(userNew)
    await user.save()
    res.redirect('/session/login')
})

router.get('/login', (req, res) => {
    res.render('sessions/login')
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.findOne({email,password}).lean().exec()
    if(!user){
        return res.status(401).render('errors/base',{
            error: 'Error en el email o contraseña'
        })
    }
    req.session.user = user.email
    req.session.user = user.password
    req.session.user = user.role
    req.session.user = res.redirect('/api/productsview')
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            res.status(500).render('errors/base')
        }else{
            res.redirect('/session/login')
        }
    })
})


export default router