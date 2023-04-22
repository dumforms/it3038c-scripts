const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const passport = require('passport')

// GET /users/ (show list of all users; dev env only)
router.get('/', async (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        try {
            const users = await User.find({})
            res.render('users/index', { users: users })
        } catch {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
})

// GET /users/home
router.get('/home', requireAuthentication, (req, res) => {
    res.render('users/home', { user: req.user})
})

// GET /users/register
router.get('/register', requireNoAuthentication, (req, res) => {
    res.render('users/register', {})
})

// Get /users/login
router.get('/login', requireNoAuthentication, (req, res) => {
    res.render('users/login')
})

// GET /users/*id_of_user* (renders that user's homepage)
router.get('/:id', requireAuthentication, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/home', {
            user: user
        })
    } catch {
        res.redirect('/')
    }
})

// GET /users/*id_of_user*/edit (render /edit view for that user)
router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', { user: user})
    } catch {
        res.redirect('/users')
    }
})

// POST /users/register form (add user to database)
router.post('/register', requireNoAuthentication, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hashedPassword,
            darkMode: false
        })
        const newUser = await user.save()
        res.redirect('login')
    } catch (err) {
        res.redirect('register')
        console.log(err)
    }
})

// POST /users/login (create passport session)
router.post('/login', requireNoAuthentication, passport.authenticate('local', {
    successRedirect: '/users/home',
    failureRedirect: '/users/login',
    failureFlash: true
}))

// PUT /user/*id_of_user* (update saved user)
router.put('/:id', async (req, res) => {
    let user
    const newName = req.body.name
    const newEmail = req.body.email
    const newPass = req.body.password
    try {
        // If params are empty, do not update user object
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
        if (user == null) { // Failed to find user with specified ID
            res.redirect('/')
        } else {
            res.render('users/edit', { user: user}) // Failed to save user
        }
    }
})

// DELETE /users/*id_of_user* (remove user from database)
router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await User.deleteOne({ _id: req.params.id})
        res.redirect('/')
    } catch (e) {
        console.log(e)
        if (user == null) { // Failed to find user with specified ID
            res.redirect('/')
        } else {
            res.redirect(`/users/${user.id}`)
        }
    }
})

// DELETE /users/logout (hijack DELETE method to log out user, redirect to /login)
router.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/login")
    })
})

// Middleware to check authentication before proceeding, if not redirect to site homepage
function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

// Middleware to force no authentication before proceeding, if authenticated redirect to user homepage
function requireNoAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/home')
    }
    next()
}

module.exports = router