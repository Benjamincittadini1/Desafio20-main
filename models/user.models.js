const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    mail: String,
    password: String,
})

userSchema.methods.encryptPass = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports = model('Usuarios', userSchema)