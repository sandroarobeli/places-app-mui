// Third party modules
const { validationResult } = require('express-validator')
const fs = require('fs')

// Custom modules
const HttpError = require('../models/http-error')
const User = require('../models/user-model')
const templateEmails = require('../utilities/templateEmails')

// List all users
const getUsers = async (req, res, next) => {
    try {
        const AllUsers = await User.find({}, 'name email image places') // only shows name, email, image & places properties
        if (AllUsers.length === 0) {
            return next(new HttpError('No users found', 404))
        }
        res.status(200).json({ users: AllUsers.map(user => user.toObject({ getters: true }))})
    } catch (error) {
        return next(new HttpError(`Fetching users failed: ${error.message}`, 500))
    }
}

// Signup a new user
const signup = async (req, res, next) => {
    // Middleware registered in the routes gets invoked here
    // If returned errors object isn't empty, error is passed down the chain via next() 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('BACKEND ERRORS:')
        console.log(errors.errors)//test
        return next(new HttpError('Invalid inputs entered. Please check your data', 422)) 
    }

    // Getting manually entered properties from the user request
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return next(new HttpError('This email already exists. Please choose another email', 422))
        }
    } catch (error) {
        return next(new HttpError(`Signup failed: ${error.message}`, 500))
    }
    
    // combining all of above to create a new user
    const createdUser = new User({
        name,
        email,
        password,
        image: req.file.path +  '.' + req.file.mimetype.match(/\/([\s\S]*)$/)[1], // attaches extension 
        places: []
    })
    // THIS TRY-CATCH ENSURES PROPER NETWORK PROTOCOL EXCHANGE
    try {
        console.log('created User:')
        console.log(createdUser)
        console.log('req.file')
        console.log(req.file)
        // Change image name in uploads/images dir to exactly how I create it in database!!!.
        fs.rename(req.file.path, req.file.path + '.' + req.file.mimetype.match(/\/([\s\S]*)$/)[1], (error) => {
            if (error) {
                throw error;    
            }
            console.log('Renaming complete!');
        })
        await createdUser.save()
        // Send Welcome email (DOESN'T NEED ASYNC AWAIT, WHEN A USER GETS IT IS NOT IMPORTANT)
        templateEmails.sendWelcomeEmail(name, email)        
        res.status(201).json({ user: createdUser.toObject({ getters: true })})
    } catch (error) {
        return next(new HttpError(`Creating User failed: ${error.message}`, 500))
    }
}

// Login an existing user
const login = async (req, res, next) => {
    const { email, password } = req.body

    // Checking if email already exists
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return next(new HttpError('The email not found. Please enter a valid email or proceed to signup.', 422))
        } else if (existingUser.password !== password) {
            return next(new HttpError('Invalid credentials entered. Please check your credentials and try again', 401))
        }
        res.status(200).json({ 
            message: `Login successful, welcome ${existingUser.name}!`,
            user: existingUser.toObject({ getters: true })
        })
    } catch (error) {
        return next(new HttpError(`Login failed: ${error.message}`, 500))
    }
}

// Delete a user along with all its own places (Done through user-model module)
const deleteUserById = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const deletedUser = await User.findById(userId) 
        if (!deletedUser) {
            return next(new HttpError(`User with ID: ${userId} not found`, 404))
        }
        await deletedUser.remove() // I use .REMOVE here so schema.pre('remove') can match it!
        // Send Parting email (DOESN'T NEED ASYNC AWAIT, WHEN A USER GETS IT IS NOT IMPORTANT)
        templateEmails.sendPartingEmail(deletedUser.name, deletedUser.email)
        res.status(200).json({ message: `User ${deletedUser.name} has been successfully deleted` })
    } catch (error) {
        return next(new HttpError(`Deleting User failed: ${error.message}`, 500))
    }
}


exports.getUsers = getUsers
exports.signup = signup
exports.login = login
exports.deleteUserById = deleteUserById