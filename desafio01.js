class ProductManager {
    constructor() {
        this.products = []
        this.index = 0
        this.path = filePath
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        this.index++
        const id = this.index
        const product = { id, title, description, price, thumbnail, code, stock }
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Faltan Datos")
        } else {
            this.products.push(product)
        }
    }
    getProduct = () => {
        return this.products
    }
    getProductById = (id) => {
        const product = this.products.find((product) => product.id === id)
        if (product) {
            console.log("id encontrado")
        } else {
            console.log('Not Found')
        }
    }
    updateProduct = (id, campos) => {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
        }
        const product = this.products[productIndex]
        const { title, description, price, thumbnail, code, stock } = campos

        if (title !== undefined) {
            product.title = title
        }
        if (description !== undefined) {
            product.description = description
        }
        if (price !== undefined) {
            product.price = price
        }
        if (thumbnail !== undefined) {
            product.thumbnail = thumbnail
        }
        if (code !== undefined) {
            product.code = code
        }
        if (stock !== undefined) {
            product.stock = stock
        }

        console.log('Se actualizo el campo')
    }

    deleteProduct = (id) => {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log('Id no encontrado')
        }
        this.products.splice(productIndex, 1)
        console.log('Se elimino el producto correctamente')
    }

}

const producto = new ProductManager()
producto.addProduct('producto prueba', 'Este es un producto prueba', '200', 'Sin imagen', 'abc123', '25')
console.log(producto.products)