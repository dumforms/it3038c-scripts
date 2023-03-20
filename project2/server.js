const express = require("express")
const app = express()

// Tell the server to use EJS
app.set("view-engine", "ejs")

// Set routes
// Homepage
app.get("/", (req, res) => {
    res.render("index.ejs", {name:"Matt"})
})
// Login
app.get("/login", (req, res) => {
    res.render("login.ejs", {})
})
// Register
app.get("/register", (req, res) => {
    res.render("register.ejs", {})
})

// POST routes
app.post("/register", (req, res) => {
    //TODO
})

app.listen(3000)