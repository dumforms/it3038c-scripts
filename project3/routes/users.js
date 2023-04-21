const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const bcrypt = require('bcrypt')

// Show all users route
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

// Show specific user route
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/show', {
            user: user
        })
    } catch {
        res.redirect('/')
    }
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
        res.redirect(`/users/${newUser.id}`)
    } catch (err) {
        res.render('users/new', {
            user: user
        })
        console.log(err)
    }
})

// Edit user route
router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', { user: user})
    } catch {
        res.redirect('/users')
    }
})

// Update user route
router.put('/:id', async (req, res) => {
    let user
    const newName = req.body.name
    const newEmail = req.body.email
    const newPass = req.body.password
    try {
        user = await User.findById(req.params.id)
        if (newName != '') {
            user.name = newName
        }
        if (newEmail != '') {
            user.email = newEmail
        }
        if (newPass != '') {
            user.passwordHash = await bcrypt.hash(newPass, 10)
        }
        await user.save()
        res.redirect(`/users/${user.id}`)
    } catch (err) {
        if (user == null) { // try failed to find user with specified ID
            res.redirect('/')
        } else {
            res.render('users/edit', { // try failed to save user
                user: user,
                errorMessage: 'Error updating user'
            })
        }
    }
})

// Delete user route
router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await User.deleteOne({ _id: req.params.id})
        res.redirect('/users')
    } catch (e) {
        console.log(e)
        if (user == null) { // try failed to find user with specified ID
            res.redirect('/')
        } else {
            res.redirect(`/users/${user.id}`)
        }
    }
})

module.exports = router