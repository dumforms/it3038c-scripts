const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// All users route
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.render('users/index', { users: users })
    } catch {
        res.redirect('/')
    }
    
})

// New user route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() })
})

// Create user route
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hashedPassword,
            darkMode: false
        })
        const newUser = await user.save()
        res.redirect(`users/`)
    } catch (err) {
        res.render('users/new', {
            user: user
        })
        console.log(err)
    }
})

module.exports = router