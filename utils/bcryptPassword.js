const bcrypt = require('bcrypt-nodejs')

const comparePass = ( p1, p2) => {
    return bcrypt.compareSync(p1, p2)
}

module.exports = comparePass