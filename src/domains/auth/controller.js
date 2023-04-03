const User = require ("../auth/model");
const Student= require ("../student/model")
const Entreprise = require("../entreprise/model")
// register 
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
  
    try {
      // Vérifie si les mots de passe correspondent
      if (password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
  
      let messageBienvenue = 'welcome User';

      const hashedPassword = await bcrypt.hash(password, 10);
      const confirmPasswordHash = await bcrypt.hash(confirmPassword, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        confirmPassword:confirmPasswordHash,
        Role: "student"
      })

      const saved= await newUser.save();
      if (saved) {
        return res.status(200).send(newUser)
      }

    } catch (err) {
      return next(err.message);
    }
  };

const registerCompany = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Vérifie si les mots de passe correspondent
    if (password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    let messageBienvenue = 'welcome company';

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmPassword, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      confirmPassword:confirmPasswordHash,
      Role: "company"
    })

    const saved= await newUser.save();
    if (saved) {
      return res.status(200).send(newUser)
    }

  } catch (err) {
    return next(err.message);
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
  
  module.exports = { registerUser,signInUser,registerCompany };