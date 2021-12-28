const mongoose = require('mongoose')

// Define Place Schema
const placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        lng: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// Define Place class per its Schema (Blueprint)
const Place = mongoose.model('Place', placeSchema)

module.exports = Place;
