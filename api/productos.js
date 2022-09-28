const GraphProductosDao = require('../DAO/GraphProductos.js')
const GraphProductosModel = require('../models/Graphproductos.js')
const crypto = require('crypto')

export default class productos {
    constructor(){
        this.dao = new GraphProductosDao()
    }

    getProductos = () => { 
        return this.dao.getProductos()
    }

    createProductos( {datos }){
        const id = crypto.randomBytes(10).toString('hex')
        const nuevoProducto = new GraphProductosModel(id, datos)
        this.dao.createProductos(nuevoProducto)
        return nuevoProducto
    }

    deleteProductos = () => {
        const deleted = this.dao.deleteProductos(id)
        return deleted
    }
}