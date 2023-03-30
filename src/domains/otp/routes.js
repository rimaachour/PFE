const express = require("express");
const router = express.Router();



const { sendWelcomeEmail } = require('../otp/controller');




router.post('/send-welcome-email', sendWelcomeEmail);
















module.exports = router;

