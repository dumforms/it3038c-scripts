const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/user_model')

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        let users
        try {
            users = await User.find({ email: email })
            if (users.length == 0) {
                return done(null, false, { message: 'No user with that email.' })
            }
        } catch {
            return done(null, false, { message: 'Error searching existing users.' })
        }

        try {
            let user
            for (let index = 0; index < users.length; index ++) {
                user = users[index]
                if (await bcrypt.compare(password, user.passwordHash)) {
                    // User is correctly authenticated
                    return done(null, user)
                }
            }
            return done(null, false, { message: 'Wrong password!'})
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        authenticateUser
    ))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
}

module.exports = initialize