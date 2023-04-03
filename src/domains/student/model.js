const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

const Student = sequelize.define('students', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  Name: {
    type:DataTypes.STRING,
    allowNull:false
  },

  Email:{type:DataTypes.STRING,
  allowNull:false},

  Password:{ type:DataTypes.STRING,
  allowNull:false},
  ConfirmPassword:{ type:DataTypes.STRING,
    allowNull:false,
  },

   
 
  },{
  timestamps: false // Option pour désactiver les timestamps
});

 
 


module.exports = Student;