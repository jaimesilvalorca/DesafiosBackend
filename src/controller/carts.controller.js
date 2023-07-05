import cartModel from "../dao/models/carts.models.js";

export const getCart = async(req,res)=>{
    const carts = await cartModel.find().lean().exec()
    res.json({carts})
}

export const getCartById = async(req,res)=>{
    const id = req.params.id
    const cart = await cartModel.findOne({_id:id})
    res.json({cart})
}

export const addCart = async(req,res)=>{
    const newCart = await cartModel.create({})
    res.json({status:'Success',newCart})
}

export const addProductToCart = async(req,res)=>{
    const cartID = req.params.cid
    const productID = req.params.pid
    const quantity = req.body.quantity || 1
    const cart = await cartModel.findById(cartID)
    let found = false
    for (let i = 0; i < cart.products.length; i++) {
        if(cart.products[i].id == productID){
            cart.products[i].quantity++
            found = true
            break
        }
    }
    if(found == false){
        cart.products.push({id:productID,quantity})
    }
    await cart.save()
    res.json({status:"Carrito Actualizado!",cart})
}

export const cartDelete = async(req,res)=>{
    const cartID = req.params.cid
    const productID = req.params.pid
    const cart = await cartModel.findById(cartID)
    if(!cart) return res.status(404).json({status: "error",error:"cart not found"})
    const productIDX = cart.products.findIndex(p=p.id == productID)
    if(productIDX <=0) return res.status(404).json({status:"error",error:'Product Not Found on Cart'})
    cart.products = cart.products.splice(productIDX,1)
    await cart.save()
    res.json({status:'Success',cart})
}
