// Third party modules
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Custom modules
const Place = require('./place-model')


// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    places: [{ 
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Place'
    }]
})

// Ensures no two users are created with the same email. Also, speeds up querying
// userSchema.plugin(uniqueValidator) // INVESTIGATE LATER, CAUSES PROBLEMS

// Delete all user places when user is removed (Requires ES-5 function, Needs THIS binding)
userSchema.pre('remove', async function (next) {
    const user = this
    await Place.deleteMany({ creator: user._id })
    next()
}) 

// Define User class per its Schema (Blueprint)
const User = mongoose.model('User', userSchema)

module.exports = User