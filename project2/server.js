// Check production or dev environment and use appropriate variables
if (process.env.NODE_ENV !== "produciton") {
    require("dotenv").config()
}

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

const users = []

// Tell the server to use EJS
app.set("view-engine", "ejs")

// Tell the server to use various libraries
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

// Set routes
// Homepage Route
app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name:req.user.name})
})
// Login Route
app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs", {})
})
// Register Route
app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs", {})
})

// POST routes
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
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/login")
    })
})

// Redirect unauthed users to login
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect("/login")
}
// Redirect authed users to home page
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }

    next()
}

app.listen(3000)