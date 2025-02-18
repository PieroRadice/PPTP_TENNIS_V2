const connessione  = require("./connessione.js");

console.log(connessione);
connessione
  .authenticate()
  .then(() => {
    console.log("Connessione al database riuscita!");
  })
  .catch((err) => {
    console.error("Errore di connessione:", err);
  });
