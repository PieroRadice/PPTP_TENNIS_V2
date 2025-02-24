"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tournament.init(
    {
      name: DataTypes.STRING,
      href: DataTypes.STRING,
      category: DataTypes.STRING,
      location: DataTypes.STRING,
      country: DataTypes.STRING,
      surface: DataTypes.STRING,
      prizeMoney: DataTypes.INTEGER,
      dataInizio: DataTypes.DATE,
      dataFine: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );
  return Tournament;
};
