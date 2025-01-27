const express= require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const nodemailer = require("nodemailer");
const cors = require('cors')
require('dotenv').config();
const { userRoutes} = require('./routes/userRoutes.js')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// parse application/json
app.use(bodyParser.json());
app.use('/app',userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.dbURL).then(()=> {
    console.log("Connected to the Database")
}).catch(()=> {
    console.log("something error in database")
});





const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "furman71@ethereal.email",
    pass: "7GK7MY4WSY9kDhEQxS",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <furman71@ethereal.email>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: "pavanrnri1818@gmail.com",
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().then(()=>{
    console.log("Successfully Send email to given main to the source")
})
.catch(console.error);











// Server listen port
app.listen(process.env.PORT, (err)=>{
    if(err) {
        console.log("error in server running",err);
        return
    }
    console.log("Server up and running on port",process.env.PORT)
})