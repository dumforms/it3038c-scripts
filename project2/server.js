// Check production or dev environment and use appropriate variables
if (process.env.NODE_ENV !== "produciton") {
    require("dotenv").config()
}

// Require modules
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

const initializePassport = require("./passport-config")
const { request } = require("express")
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// Placeholder users list; would be a database in production software
const users = []

// Tell the server to use various modules
app.set("view-engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

// Homepage Route (routes www.sitename.com/ to index.ejs)
app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name:req.user.name})
})
// Login Route (routes www.sitename.com/login to login.ejs)
app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs", {})
})
// Register Route (routes www.sitename.com/register to register.ejs)
app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs", {})
})

// POST routes
// If an unauthenticated user submits the /register form, try to add them to the user list and redirect them to /login
// In the event of an error, refresh the /register page
app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }
    console.log(users)
})
// If an unauthenticated user submits the /login form, try to create a local passport session for that user and redirect them to the homepage
// If login fails, flash an error message and refresh the /login page
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// If a user clicks the logout button, end the passport session(?) and redirect them to /login
app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/login")
    })
})

// Allow authenticated users to continue, otherwise redirect them to /login
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}
// Allow unauthenticated users to continue, otherwise redirect them to the homepage
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

// Set listening port
app.listen(3000)