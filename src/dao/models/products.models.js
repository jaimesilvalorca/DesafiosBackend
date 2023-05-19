import mongoose from "mongoose";

const productsCollection = 'Products'

const ProductsSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true 
    },
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array
})

const productsModel = mongoose.model(productsCollection, ProductsSchema)

export default productsModel