// Third party modules
const express = require('express')
const { check } = require('express-validator')

// Custom modules
const placesControllers = require('../controllers/places-controller')

// Initializing the router object
const router = express.Router()


// List the place by its ID
router.get('/:placeId', placesControllers.getPlaceById)

// List all places created by a given user
router.get('/user/:userId', placesControllers.getPlacesByUserId)

// List all places created by a given user II (ALTERNATIVE VERSION)
router.get('/user/alt/:userId', placesControllers.getPlacesByUserId2)

// Create a new Place
router.post(
    '/', 
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({ min: 5 }),
        check('address')
            .not()
            .isEmpty()        
    ], 
    placesControllers.createPlace
) 

// Update place
router.patch(
    '/:placeId',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({ min: 5})    
    ],
    placesControllers.updatePlaceById)

// delete Place
router.delete('/:placeId', placesControllers.deletePlaceById)

module.exports = router