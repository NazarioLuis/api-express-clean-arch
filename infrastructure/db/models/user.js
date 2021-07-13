'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nick: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};