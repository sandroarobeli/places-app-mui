// Third party modules
const { validationResult } = require('express-validator')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();

// Custom modules
const HttpError = require('../models/http-error')
const User = require('../models/user-model')
const templateEmails = require('../utilities/templateEmails')

// List all users
const getUsers = async (req, res, next) => {
    try {
        const AllUsers = await User.find({}, 'name email image places') // only shows name, email, image & places properties
        if (AllUsers.length === 0) {
           // return next(new HttpError('No users found', 404))
           // Having no users is NOT an error, thus should't throw an ErrorModal
           console.log('No Users Found') 
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

    // Hashing plain text password before saving it in DB
    let hashedPassword   // second argument is number of cascades used to encrypt it
    try {
     hashedPassword = await bcrypt.hash(password, 8)   
    } catch (error) {
        return next(new HttpError('Creating User failed. Please try again', 500))
    }
    
    // combining all of above to create a new user
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        image: req.file.path +  '.' + req.file.mimetype.match(/\/([\s\S]*)$/)[1], // attaches extension 
        places: []
    })
    // THIS TRY-CATCH ENSURES PROPER NETWORK PROTOCOL EXCHANGE
    try {
        console.log('req.file') // test
        console.log(req.file) // test
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
        
        
        // Create token, so we can send it back as proof of authorization.
        // We get to decide what data we encode. This time it's userId & email 
        // This way, frontend will attach this token to the requests going to routes that 
        // REQUIRE AUTHORIZATION
        let token
        try {
            token = jwt.sign(
                {userId: createdUser.id, email: createdUser.email},
                process.env.JWT_PRIVATE_KEY //,
                //{ expiresIn: '1h'}
            )
        } catch (error) {
            return next(new HttpError('Creating User failed. Please try again', 500))
        }
        // Plus, we get to decide what props we send back to the frontend (Need to send Token!)
        res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token })
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
            return next(new HttpError('The email not found. Please enter a valid email or proceed to signup.', 403))
        }
        
        // Check if existingUser.password matches hashed version of newly entered plaintext password
        let isValidPassword = false
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password)
        } catch (error) {
            return next(new HttpError(`Login failed. Please try again later.\n${error.message}`, 500))
        }
        // Catch block right above deals with connection etc. type errors
        // isValidPassword = false is a valid result and gets addressed below
        if (!isValidPassword) {
            return next(new HttpError('Invalid credentials entered. Please check your credentials and try again', 403))
        }

        // After we ensure user(its email) exists, and the passwords match,
        // We can generate the Token
        // This way, frontend will attach this token to the requests going to routes that 
        // REQUIRE AUTHORIZATION
        let token
        try {
            token = jwt.sign(
                {userId: existingUser.id, email: existingUser.email},
                process.env.JWT_PRIVATE_KEY //,
              //  { expiresIn: '1h'}
            )
        } catch (error) {
            return next(new HttpError('Login failed. Please try again', 500))
        }
        
        res.status(200).json({
            userId: existingUser.id,
            email: existingUser.email,
            token: token
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