//Import libraries
const express = require('express');
let app = express(); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let json_vacio = {"voltage":"", "current":"", "power":"", "level":"", "state":""};

mongoose.Promise = global.Promise;

//Start server
app.listen(8081, function(){
    console.log("Listening to port 8081");
});

//Access permissions for app
const url = 'http://localhost:4200';
app.use(function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', url);
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Connection to mongo db atlas (MongoDB Online)

const db_url = "mongodb+srv://A7XENON:hQ2avCURNK1nMjcJ@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";//mongodb web url
mongoose.connect(db_url, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfuly conected to mongodb atlas");
        
    })
    .catch((err) => console.error(err));

//Obtain json data from SoC ESP8266

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.post('/', function(req, res) {    
    res.send('Got the data!!');
    //console.log(req.headers);    
    //console.log(req.body);
    //req.body = JSON.parse(req.body);
    //var parsed = JSON.stringify(req.body);
    //var { voltage, current, power, state, level } = req.body;
    let json_final = {
      "voltage": req.body["voltage"],
      "current": req.body["current"],
      "power": req.body["power"],
      "state": req.body["state"],
      "level": req.body["level"],
      "time": req.body["time"]
    }

    //For GET function in angular service
    json_vacio = json_final;
    ////////////////////////

    console.log(json_final);

    //Save data in mongoDB Atlas
    let newDatos = new modelo(json_final);
    newDatos.save()
      .then(item => {
        res.send("Saved to database");
        console.log("Succesfully saved in database");
      })
      .catch(err => {
        res.status(400).send("Cannot save to database");
        console.log("Cannot be saved in database");
      });  
      
});

//Mongodb data model

let Schema =  mongoose.Schema({
  voltage: {type: String},
  current: {type: String},
  power: {type: String},
  state: {type: String},
  level: {type: String},
  time: {type: String}
});

let modelo = mongoose.model("modelo", Schema);

//Unlock data to send to ESP8266
let json_unlock = {
  estado: "F"
}

//Send main data to angular app

app.get('/getData', function (req, res) {
  res.send(json_vacio);
});

//Send unlock data to ESP8266

app.post('/unlock', function (req, res) {
  json_unlock = req.body;//PASS FROM DEFAULT FULL TO NORMAL
  res.send(json_unlock.estado);//Response to app
  console.log("Status received: "+json_unlock.estado);
});

//Send new status to SoC
app.get('/unlock', function (req, res) {
  res.send(json_unlock.estado);//ENVIO A LA TARJETA EL ESTADO ACTUAL F Ó N
  console.log("Status sent to container: "+json_unlock.estado);
});
  
module.exports = app





