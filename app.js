const express = require("express");
const http = require("http");
//const fs = require("fs");
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
const tournamentRouter = require("./routes/tournamentRoutes");
const apiRouter = require("./routes/apiRoutes");

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));

//la gestione di tutte le possibili route per l'autenticazione sono richiamate da questo semplice comando
app.use(authRouter);
app.use("/tornei", requireAuth, tournamentRouter);
app.use("/api", requireAuth, apiRouter);
//app.use("/persons", personsRouter);
//che cosa succede se viene colpita una route non esistente? Dovremmo rispedire un errore 404 e fare il redirect alla home
const connessione = require("./config/connessione.js");
connessione
  .authenticate()
  .then(() => {
    console.log("Connessione al database riuscita!");
  })
  .catch((err) => {
    console.error("Errore di connessione:", err);
  });

http.createServer(app).listen(PORT, () => {
  console.log(`server in ascolto su porta ${PORT}`);
});
