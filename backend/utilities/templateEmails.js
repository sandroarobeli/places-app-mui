const sgMail = require('@sendgrid/mail')
require("dotenv").config();

const HttpError = require('../models/http-error')

// Initializing sendGridMail object with API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Generate welcome email upon creating a new user
const sendWelcomeEmail = (name, email) => {
    sgMail.send({
            to: email,
            from: 'sandroarobelibusiness@gmail.com',
            subject: `Welcome to Places App ${name}`,
            text: `Welcome to Places App ${name}\nUsing this app, you can add, edit and remove places you find memorable.\nEnjoy!\nPlaces-App team`
    }).then(() => console.log(`Email to ${name} has been sent`)).catch((error) => new HttpError(`Email sending failed: ${error.message}`, 500))
}

// Generate follow up email upon deleting a user
const sendPartingEmail = (name, email) => {
    sgMail.send({
            to: email,
            from: 'sandroarobelibusiness@gmail.com',
            subject: `Sorry to see you go ${name}`,
            text: `We are sorry to see you delete your account at Places-App.\nWe would welcome your feedback with suggestions on how we can improve your user experience.\nFeel free to sign up again in the future.\nPlaces-App team`
    }).then(() => console.log(`Email to ${name} has been sent`)).catch((error) => new HttpError(`Email sending failed: ${error.message}`, 500))
}

exports.sendWelcomeEmail = sendWelcomeEmail
exports.sendPartingEmail = sendPartingEmail;
