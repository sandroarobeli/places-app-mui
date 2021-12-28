const multer = require('multer')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

// File upload middleware generator configuration
const fileUpload = multer({
    limits: 1000000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads/images')
        },
    }),
    fileFilter: (req, file, callback) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]  // convert undefined to false or true
        let error = isValid ? null : new Error('Invalid image format') // if format isn't
        callback(error, isValid)              // png jpeg or jpg, callback throws an error
    }
})

module.exports = fileUpload;
