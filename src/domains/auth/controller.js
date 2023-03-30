const User = require ("../auth/model");
const Student= require ("../student/model")
const Entreprise = require("../entreprise/model")
// register 
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    const { Name, Email, Password, ConfirmPassword, Role } = req.body;
  
    try {
      // Vérifie si les mots de passe correspondent
      if (Password !== ConfirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
  
      let messageBienvenue = '';


      
      
      const hashedPassword = await bcrypt.hash(Password, 10);
      const user = await User.create({
        Name,
        Email,
        Password: hashedPassword,
        Role,
        ConfirmPassword
      });
  
      return res.status(201).json({
        messageBienvenue,
        id: user.id
      });
    } catch (err) {
      return next(err);
    }
  };
  
  module.exports = { registerUser };