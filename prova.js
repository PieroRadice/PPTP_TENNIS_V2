const nodemailer = require("nodemailer");
const mailOptions = {
  from: "radice.p@gmail.com",
  to: "radice.pgmail.com",
  subject: "Test email nodejs",
  //text: 'Sgart.it' // invia il corpo in plaintext
  html: `<b>------------------ </b><a href="http://localhost:5000/confermaSignup/" >conferma</a>`, // invia il corpo in html
};
// definisco il trasporto
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "radice.p@gmail.com",
    pass: "rflifvprjesmglvy",
  },
});
//sendmail restituisce una promise
transporter.sendMail(mailOptions,(err)=>console.log(err));
