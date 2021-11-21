// Third party imports
const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

// Database module
require('./db/mongoose')

// Custom modules
const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

// Create the server app and designate the port
const app = express()
const port = process.env.port || 5000

// Register middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware that adds ability to process requests for images
// general (app.use() type) middleware. 
// Static serving just return a file without executing anything 
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

// Register individual custom routers
app.use('/api/places', placesRoutes) // This url triggers placesRoutes
app.use('/api/users', usersRoutes) // This url triggers userRoutes

// Handling errors for unsupported routes
app.use((req, res, next) => {     // After urls above, all else triggers error (because there is not url but app.use --> works for every url) 
    const error = new HttpError('Route not found', 404)
    throw error // Since this is synchronous, we can use throw format
})


// Register error handling middleware (GENERAL ERROR HANDLER. WHEREVER THE ERRORS MAY ORIGINATE)
// If middleware function has 4 parameters, express will recognize it as a special 
// ERROR handling middleware meaning it will only be executed
// On requests that throw (contain) errors
app.use((error, req, res, next) => {
    // If there is a validation error, image file creation will be rolled back
    if (req.file) { // if there is an error, and file got created, we needn't that useless file 
        fs.unlink(req.file.path, (error) => {
            console.log(error)
        }) // deletes the image file
    }
    // if response has been sent
    if (res.headerSent) {
        return next(error)
    }
    // otherwise and if error object exists, it may have status code in it or default to 500
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred' })
})

// Start the server
app.listen(port, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log(`Server running on port: ${port}`)
})