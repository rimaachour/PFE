const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const User = require('../auth/model');

// Créer un transporteur de messagerie pour envoyer l'e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourEmail@gmail.com',
    pass: 'yourEmailPassword',
  },
});

// Fonction pour envoyer l'e-mail
async function sendEmail(user) {
  const mailOptions = {
    from: 'yourEmail@gmail.com',
    to: User.Email,
    subject: 'Welcome to my app!',
    text: `Hello ${User.name}, welcome to my app!`,
  };

  await transporter.sendMail(mailOptions);
}

// Fonction pour envoyer l'e-mail en fonction du rôle de l'utilisateur
async function sendWelcomeEmail(req, res) {
  try {
    const { Role } = req.body;
    const users = await User.findAll({
      where: {
        role: {
          [Op.eq]: Role,
        },
      },
    });
    users.forEach((user) => {
      sendEmail(user);
    });
    res.status(200).json({ message: 'E-mail sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  sendWelcomeEmail,
};
