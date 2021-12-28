const jwt  = require('jsonwebtoken')
require("dotenv").config();

const HttpError = require('../models/http-error')

// This middleware function checks if we have a token and if so,
// Whether it's valid or not
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {  // Just an extra precaution
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Format -> authorization: 'Bearer TOKEN'
        // There is NO token object received with request.header
        if (!token) {
            throw new Error('Authentication failed') // redundancy measure. catch below does it too
        }
        // There IS a token object, we validate it: verify returns an object, not boolean
        // If this fails to verify, it goes directly to catch block below
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        // decodedToken has all the props we assigned, when created it. Namely: userId & email
        req.userData = { userId: decodedToken.userId } // Adding new property on the fly
        next() // calling next() without an error allows request to continue it's journey!
    } catch (error) {
        // General catch
        return next(new HttpError(`Authentication failed\n${error.message}`, 403))
    }
};
