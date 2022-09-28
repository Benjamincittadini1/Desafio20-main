const { asDTO } = require('../DTO/productoDTO.js')

class productosMem {
    constructor(){
        this.productos = []
    }

    #getIndex(id){
        return this.productos.findIndex(productos => this.productos.id === id)
    }

    getAll(){
        return this.productos
    }

    getById(idBuscado){
        return this.productos[ this.#getIndex(idBuscado) ]
    }

    save(nuevoProducto){
        this.productos.push(nuevoProducto)
        return nuevoProducto
    }

    deleteById(idParaBorrar){
        const [ borrada ] = this.productos.splice(this.#getIndex(idParaBorrar), 1)
        return borrada
    }

    deleteAll() {
        this.productos = []
    }

    updateById(idParaRemplazar, nuevoProducto){
        const index = this.#getIndex(idParaRemplazar)
        const actualizado = { ...this.productos[ index ], ...nuevoProducto }
        this.productos.splice(index, 1, actualizado)
        return actualizado
    }
}


module.exports = productosMem