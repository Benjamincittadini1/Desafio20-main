export default class GraphProductosDao {
    constructor(){
        this.productos = []
    }

    getProductos() { 
        return this.productos 
    }

    createProductos(producto){
        this.productos.push(producto)
    }

    deleteProductos(id){
        let i = 0
        const deleted = []
        while(i < this.productos.length){
            if(this.productos[i].id == id) {
                deleted.push(this.productos.splice(i, 1)[ 0 ])
            } else {
                i ++ 
            }
        }
        return deleted
    }
}