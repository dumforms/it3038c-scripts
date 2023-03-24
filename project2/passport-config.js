const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

// Creates a login session for an authenticated user that persists across site pages
function initialize(passport, getUserByEmail, getUserById, log) {
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
            log("AUTH", `Authentication attempt failed - no user found with email ${email}.`)
            return done(null, false, {message:"Email or password incorrect."})
        }

        // Checks hash of submitted password against the stored hash for the user with that email
        try {
            if (await bcrypt.compare(password, user.password)) {
                // User is correctly authenticated
                log("AUTH", `User ${user.name} successfully authenticated.`)
                return done(null, user)
            } else {
                // User password does not match the password associated with that email
                log("AUTH", `Authentication attempt failed - wrong password for the user with email ${user.email}.`)
                return done(null, false, {message:"Email or password incorrect."})
            }
        } catch (err) {
            log("ERROR", `Failed to complete authentication process.`)
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