'use strict';
const {encryptPassword} = require('../helper/bcrypt.js')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model{

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `your email format is wrong`
        }
      }
    },
    password: DataTypes.STRING
  },{
    sequelize, 
    hooks: {
      beforeCreate(User, options) {
        User.password = encryptPassword(User.password)
      }
    },
    modelName: 'User'
  })
  User.associate = function(models) {
    // associations can be defined heres
    User.hasMany(models.Todo, {foreignKey: 'UserId'})
  };
  return User;
};