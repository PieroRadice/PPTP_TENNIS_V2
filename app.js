const express = require("express");
const http = require("http");
const fs = require("fs");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv/config");

const PORT = process.env.PORT || 3000;
//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRoutes");
//const personsRouter = require("./routes/personsRoutes");

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/tornei", requireAuth, (req, res) => res.render("tornei"));
app.get("/Qatar", requireAuth, (req, res) => res.render("Qatar.ejs"));
app.get("/Qatar/Squadra", requireAuth, (req, res) =>
  res.render("QatarSceltaGiocatori.ejs")
);
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));

//la gestione di tutte le possibili route per l'autenticazione sono richiamate da questo semplice comando
app.use(authRouter);
//app.use("/persons", personsRouter);
//che cosa succede se viene colpita una route non esistente? Dovremmo rispedire un errore 404 e fare il redirect alla home
const connessione = require("./config/connessione.js");

console.log(connessione);
connessione
  .authenticate()
  .then(() => {
    console.log("Connessione al database riuscita!");
  })
  .catch((err) => {
    console.error("Errore di connessione:", err);
  });

http.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`server in ascolto su porta ${PORT}`);
});
