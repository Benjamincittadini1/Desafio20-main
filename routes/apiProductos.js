const express = require('express')
const controllerProductos = require('../controller/productos')

const api = express.Router()

class apiProductos {
    #controller

    constructor(){
        this.#controller = new controllerProductos()
    }

    get api() {
        api.get('/api/productos', this.#controller.getAll)
        api.post('/api/productos', this.#controller.save)
        api.put('/api/productos/:id', this.#controller.UpdateById)
        api.delete('/api/productos/:id', this.#controller.DeleteById)

        return api
    }
}

module.exports = apiProductos