// Test user login system using node.js
// Code from https://blog.udemy.com/node-js-project-ideas/

// Module imports
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const passsport = require("passport")
const flash = require("connect-flash")
const session = require("express-session")
const app = express()

// Passport Setup
require("./config/passport")(passport)

// Database Setup
const db = requrie("./config/keys").mongoURI

// MongoDB Connection
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
	.then(() => console.log("Connected to MongoDB."))
	.catch(err => console.log(err))

// Express.js Setup
app.use(expressLayouts)
app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))

app.use(session({secret:"secret", resave:true, saveUnitialized:true}))

// Passport Setup
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg")
	res.locals.error_msg = req.flash("error_msg")
	res.locals.error = req.flash("error")
	next()
})

// Routes
app.use("/", require("./routes/index.js"))
app.use("/users", require("./routes/users.js"))
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}.`))
