const express= require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
require('dotenv').config();
const { userRoutes} = require('./routes/userRoutes.js')
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use('/app',userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.dbURL).then(()=> {
    console.log("Connected to the Database")
}).catch(()=> {
    console.log("something error in database")
});

// Server listen port
app.listen(process.env.PORT, (err)=>{
    if(err) {
        console.log("error in server running",err);
        return
    }
    console.log("Server up and running on port",process.env.PORT)
})