// Check for dev environment & load dev-only modules
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Require modules
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Require route files
const indexRouter = require('./routes')
const userRouter = require('./routes/users')

// Set view and view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')  // Server views here
app.set('layout', 'layouts/layout')     // HTML layout templates here
app.use(express.static('public'))       // Public views here

// Use Modules
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', userRouter)

// Set listening port
app.listen(process.env.PORT || 3000)