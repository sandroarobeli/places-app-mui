// Third party modules
const express = require('express')
const { check } = require('express-validator')

// Custom modules
const placesControllers = require('../controllers/places-controller')
const fileUpload = require('../middleware/file-upload')
const checkAuthorization = require('../middleware/check-authorization')

// Initializing the router object
const router = express.Router()


// List the place by its ID
router.get('/:placeId', placesControllers.getPlaceById)

// List all places created by a given user
router.get('/user/:userId', placesControllers.getPlacesByUserId)

// List all places created by a given user II (ALTERNATIVE VERSION)
router.get('/user/alt/:userId', placesControllers.getPlacesByUserId2)

// One way of doing things. general middleware .use() function. 
// Fires on any method after it, so privileged routes are places after it.
router.use(checkAuthorization)

// Create a new Place (PRIVILEGED, AUTHORIZATION REQUIRED)
router.post(
    '/',
    fileUpload.single('image'),
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

// Update place (PRIVILEGED, AUTHORIZATION REQUIRED)
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

// delete Place (PRIVILEGED, AUTHORIZATION REQUIRED)
router.delete('/:placeId', placesControllers.deletePlaceById)

module.exports = router