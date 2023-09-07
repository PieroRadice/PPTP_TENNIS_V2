const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const sslOptions = {
  key: fs.readFileSync("C:/Users/radic/CA/ROOTer-private-key.key"),
  cert: fs.readFileSync("C:/Users/radic/CA/ROOTer-certificate.crt"),
};

const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

//middleware
app.use(express.static("public"));
//questo middleware permette di trasformare in json il contenuto del body delle richieste che hanno header content-type json
app.use(express.json());
app.use(cookieParser());
/*app.use((req, res, next) => {
  console.log(req.headers);
  next();
});*/
app.set("view engine", "ejs");

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
//la gestione di tutte le possibili route per l'autenticazione sono richiamate da questo semplice comando
app.use(authRouter);
//che cosa succede se viene colpita una route non esistente? Dovremmo rispedire un errore 404 e fare il redirect alla home

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`server in ascolto su porta ${PORT}`);
});
