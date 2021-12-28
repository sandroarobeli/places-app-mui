// Creating custom Error class to standardize and avoid duplication
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message) // Add a message property in addition to what it inherits
        this.code = errorCode // Adds a code property to HttpError class
    }
}

module.exports = HttpError;
