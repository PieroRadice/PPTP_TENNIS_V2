const { DataTypes } = require("sequelize");
const connessione = require("../config/connessione");
const bcrypt = require("bcrypt");

const Users = connessione.define(
  "user",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        //dobbiamo validare il valore immesso dall'utente in questa fase, utilizzando una regex in validate andremmo a validare il risultato di bcrypt e non il valore immesso dall'utente
        const check =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!check.test(value)) {
          throw new Error("Validation is on password failed");
        }
        this.setDataValue(
          "password",
          bcrypt.hashSync(value, bcrypt.genSaltSync())
        );
        //per recuperare la password invece occorre decriptarla per poterla confrontare con il valore immesso da parte dell'utente
      },
    },
  },
  //aggiungo gli indici
  { indexes: [{ fields: ["email"], unique: true }] }
);

module.exports = Users;
