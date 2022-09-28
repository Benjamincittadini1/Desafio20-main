const { text } = require('express')
const fs = require('fs')
const { asDTO } = require('../DTO/productoDTO.js')

class productosFile{
    constructor(ruta){
        this.ruta = ruta
        this.productos = []
    }

    async #leerArchivo(){
        const texto = await fs.promises.readFile(this.ruta, 'utf-8')
        this.productos = JSON.parse(texto)
    }

    async #escribirArchivo(){
        const texto = JSON.stringify(this.productos, null, 2)
        await fs.promises.writeFile(this.ruta, texto)
    }

    #getIndex(id){
        return this.productos.findIndex(productos => this.productos.id === id)
    }

    async getAll(){
        await this.#leerArchivo()
        return asDTO(this.productos)
    }

    async getById(id){
        await this.#leerArchivo()
        return asDTO(this.productos[ this.#getIndex(idBuscado) ])  
    }

    async save(productoNuevo){
        await this.#leerArchivo()
        this.productos.push(productoNuevo)
        await this.#leerArchivo()
        return asDTO(productoNuevo)
    }

    async deleteById(idParaBorrar){
        await this.#leerArchivo()
        const [ borrada ] = this.productos.splice(this.#getIndex(idParaBorrar), 1)
        await this.#escribirArchivo()
        return asDTO(borrada)
    }

    async deleteAll(){
        this.productos = []
        await this.#escribirArchivo()
    }

    async updateById(idParaRemplazar, productoNuevo){
        await this.#leerArchivo()
        const index = this.#getIndex(idParaRemplazar)
        const actualizada = { ...this.productos[ index ], ...productoNuevo }
        this.productos.splice(index, 1, actualizada)
        await this.#escribirArchivo()
        return asDTO(actualizada)
    }
}