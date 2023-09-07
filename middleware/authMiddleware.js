//questo middleware deve analizzare tutte le richieste e controllare il cookie jwt
//se il cookie non esiste reindirizza il client alla home
//se il cookie esiste ma è scaduto reindirizza alla home
//se il cookie esiste valido allora restituisce quello che è stato richiesto
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const requireAuth = (req, res, next) => {
const token = req.cookies.jwt;

  // verifica dell'esistenza del cookie jwt e verifica della validità
  if (token) {
    jwt.verify(token, "un segreto generato a caso", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// controllo dell'utente
//questo controllo dovrebbe essere riscritto in modo di non dover interrogare il db tutte le volte. Il nome, o quello che server potrebbe essere trasportato direttamente dal token jwt

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "un segreto generato a caso", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Users.findByPk(decodedToken.uuid);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
