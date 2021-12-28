const express = require('express')
const { check } = require('express-validator')

const usersControllers = require('../controllers/users-controller')
const fileUpload = require('../middleware/file-upload')

// Initializing the router object
const router = express.Router()

// List all users
router.get('/', usersControllers.getUsers)

// Signup a new user
router.post(
    '/signup',
    fileUpload.single('image'),
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail() // toLowercase()
            .isEmail(),
        check('password')
            .isLength({ min: 8 })
    ],
    usersControllers.signup
)

// Login an existing user
router.post('/login', usersControllers.login)

// delete a user
router.delete('/delete/:userId', usersControllers.deleteUserById)

module.exports = router
