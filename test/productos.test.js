const supertest = require('supertest')
const chai = require('chai')
const faker = require('@faker-js/faker')

const request = supertest('http:localhost:8080/')
const expect = chai.expect
faker.locale = 'es'

describe('Test: Productos', () => {
    before(() => { console.log('*************** Comienzo TOTAL de Test ********' ) }) 
    after(() => { console.log('*************** Fin TOTAL de Test ********' ) }) 
    beforeEach(() => { console.log('*************** Comienzo de Test ********' ) })
    afterEach(() => { console.log('*************** Fin de Test ********' ) })

    it('Testeo ruta GET: Lista de productos', async () => {
        let resp = await request.get('/home')
        resp = resp._body
        expect(resp.length).greaterThan(0)
    })

    
    it('Testeo POST: Agregar producto', async () => {
        const producto = {
            nombre: 'Lapicera', 
            precio: 25,
            foto: 'https://districomp.com.uy/files/tmp/compressed/normal/6shkdt5mzv7xw9pm988k.jpg'
        }
        const resp = await request.post('apiProductos/productos').send(producto)
        expect(resp.ok).true      
    })

    it('Testeo PUT: Modificar producto', async () => {
        const producto = {
            id: 1,
            nombre: 'Goma de borrar', 
            precio: 25,
            foto: 'https://serviciopapelero.com.uy/6621-large_default/goma-de-borrar-maped-softy-un-producto-ineludible-la-goma-blanca-que-se-adapta-a-sus-necesidades-confort-de-borrado-gracias-a-su.jpg'
        }
        const resp = await request.put('apiProductos/productos/:id').send(producto)
        expect(resp.ok).true      
    })

    it('Testeo DELETE: Borrar producto', async () => {
        const id = 1
        const resp = await request.delete(`apiProductos/productos/${id}`)
        expect(resp.ok).true      
    })
})