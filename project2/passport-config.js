const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

// Creates a login session for an authenticated user that persists across site pages
function initialize(passport, getUserByEmail, getUserById) {
    /**
     * 
     * @param {*} email an email submitted to the login form
     * @param {*} password a password submitted to the login form
     * @param {*} done the return object
     * @returns the user object if the user exists and is correctly authenticated, otherwise returns an error message
     */
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        // Checks if the sumbitted email matches an existing user
        if (user == null) {
            return done(null, false, {message:"No user found with that email."})
        }

        // Checks hash of submitted password against the stored hash for the user with that email
        try {
            if (await bcrypt.compare(password, user.password)) {
                // User is correctly authenticated
                return done(null, user)
            } else {
                // User password does not match the password associated with that email
                return done(null, false, {message:"Password incorrect."})
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password" //already the default value
        },
        authenticateUser
    ))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize