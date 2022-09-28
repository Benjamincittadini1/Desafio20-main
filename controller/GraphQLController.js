const productos = require('../api/productos.js')

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
    input ProductoInput {
        nombre: String,
        precio: Number,
        foto: String
    }

    type Producto {
        id: ID!,
        nombre: String,
        precio: Number,
        foto: String
    }

    type Query {
        getProductos: [Productos],
    }

    type Mutation {
        createProductos(datos: ProductoInput): Producto 
        deletedProductos: [Producto],
    }
`)

export default class GraphQLController {
    constructor() {
        const api = new productos()
        return graphqlHTTP({
            schema: schema,
            rootValue:{
                getProductos: api.getProductos,
                createProductos: api.createProductos, 
                deleteProductos: api.deleteProductos
            },
            graphiql: true,
        })
    }
}