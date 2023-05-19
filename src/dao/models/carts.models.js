import mongoose from "mongoose";

const cartsCollection = 'Carts'

const CartSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    products: Array
})

const CartsModel = mongoose.model(cartsCollection, CartSchema)

export default CartsModel