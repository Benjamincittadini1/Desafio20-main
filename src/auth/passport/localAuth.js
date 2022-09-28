/* Autenticación local */
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

/* Usuario de mongo */
const User = require('../../../models/user.models.js')

/* Chequeo passwords*/
const comparePass = require('../../../utils/bcryptPassword')

passport.use('local-register',
    new LocalStrategy({
        usernameField: "mail",
        passwordField: "password",
        passReqToCallback: true,

    }, 
    async (req, mail, password, done) => {
        const checkUserExists = await User.findOne({ mail })
        if (checkUserExists){
            done(null, false, {message: 'Usuario con email ya registrado'})
        } else {
            const newUser = new User({ nombre, apellido, mail })
            newUser.password = newUser.encryptPass(password)
            const savedUser = await newUser.save() // se guarda en la base de datos
            done(null, savedUser._id)
        }
    })
)

passport.use('local-login', new LocalStrategy({
    usernameField: "mail",
    passwordField: "password",
    passReqToCallback: true,  
}, async (_, mail, password, done) => {
        const user = await User.findOne({ mail })
        if (!user){
            return done(null, false, {message: 'El usuario no existe'})
        }
        if (!comparePass(password, user.password)){
            return done(null, false, {message: 'Las contraseñas no coinciden'})
        }
        done(null, user, {message: 'Usuario ok'})
    })
)

passport.serializeUser((userId, done) => {
    done(null, userId)
})

passport.deserializeUser(async(userId, done) => {
    const user = await User.findById(userId)
    done(null, user)
})