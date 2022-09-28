class productosDTO {
    constructor(nombre, precio, foto, id){
        this.nombre = nombre
        this.precio = precio
        this.foto = foto
        this.id = id
    }
}

function asDTO(productos){
    if (Array.isArray(productos))
        return productos.map(p => new productosDTO(p))
    else 
        return new productosDTO(productos)
}

module.exports = { productosDTO, asDTO } 