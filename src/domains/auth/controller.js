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
  
      let messageBienvenue = 'welcome User';


      
      
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
  // sign in
const signInUser = async (req, res, next) => {
  const { Email, Password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const user = await User.findOne({ Email });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérifier si le mot de passe correspond
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);

    if (!isPasswordMatch) {
      throw new Error('Mot de passe incorrect');
    }

    // Envoi d'une réponse réussie si l'utilisateur est authentifié avec succès
    return res.status(200).json({
      id: user.id,
      message: 'Connecté avec succès'
    });
  } catch (err) {
    return next(err);
  }
};
  
  module.exports = { registerUser,signInUser };