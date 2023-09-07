const { DataTypes } = require("sequelize");
const connessione = require("../config/connessioneUserDetail");
const bcrypt = require("bcrypt");

const UserDetails = connessione.define(
  "userDetail",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const check = /([a-zA-Z]+\s)+[a-zA-Z]+/;
        if (!check.test(value)) {
          throw new Error("Validation is on name failed");
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      },
    },
  },
  //aggiungo gli indici
  { indexes: [{ fields: ["email"], unique: true }] }
);

module.exports = Users;
