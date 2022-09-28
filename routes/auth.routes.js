/* Autenticación  de usuarios */
const { Router } = require('express')
const routerAuth = Router()
const passport = require('passport')

// Rutas estaticas
routerAuth.get('/login', (req, res) => {
    res.render('./auth/login')
})

routerAuth.post('/login', (req, res) => {
    passport.authenticate('local-login', (error, user, options) => {
        if (user) {
            req.logIn(user, () => {
                return res.json(user)
            })
        } else if (options) {
            return res.json(options)
        }
    })(req, res)
})

routerAuth.get('/registrarse', (req, res) => {
    res.render('./auth/registrarse')
})

routerAuth.post('/registrarse', 
    passport.authenticate('local-register', {
        successRedirect: '/', 
        failureRedirect: '/error', 
        passReqToCallback: true,
    })
)

routerAuth.get('/error', (req, res) => {
     res.render('./error')
})

module.exports = routerAuth