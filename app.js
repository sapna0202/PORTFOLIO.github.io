
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
const app = express();
const port = 100;

// connecting mongoose to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contact_of_Portfolio');

// Defining Schema of Mongoose
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subjects: String,
    messages: String,
  });

//   compiling schema into model
var Contact = mongoose.model('contact', contactSchema);

// express specific stuff
app.use("/static",express.static('static')) //for serving static files
app.use(express.urlencoded());

// pug specific stuff
app.set('view engine','pug'); //set template engine as pug
app.set('views',path.join(__dirname,'')); //set the view directory 

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('index.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('index.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then( () => {
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved");
    });
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

