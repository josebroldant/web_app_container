var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var json_vacio = {"voltage":"", "current":"", "power":"", "level":"", "state":""};
/*
const db = require("./db");
const dbName = "variables";
const collectionName = "container";
*/

mongoose.Promise = global.Promise;

//start server
app.listen(8081, function(){
    console.log("Listening to port 8081");
});

var angular = 'http://localhost:4200';
//PERMISOS DE ACCESO PARA LA APLICACION
app.use(function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', angular);
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});




//CONEXION A MONGODB ATLAS

const uri = "mongodb+srv://A7XENON:Exeron@97@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";//mongodb web url
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfuly conected to mongodb atlas");
        
    })
    .catch((err) => console.error(err));
   

//get method    
app.get('/', function (req, res) { 
    res.send("Hello from Server"); 
    })

//obtain json from esp8266

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.post('/', function(req, res) {    
    res.send('Got the data!!');
    //console.log(req.headers);    
    //console.log(req.body);
    //req.body = JSON.parse(req.body);
    //var parsed = JSON.stringify(req.body);
    //var { voltage, current, power, state, level } = req.body;
    var json_final = {
      "voltage": req.body["voltage"],
      "current": req.body["current"],
      "power": req.body["power"],
      "state": req.body["state"],
      "level": req.body["level"]
    }

    //PARA EL GET DE ANGULAR
    json_vacio = json_final;
    ////////////////////////

    console.log(json_final);

    var newDatos = new modelo(json_final);//wrap data into a mongodb model 
    newDatos.save()
      .then(item => {
        res.send("saved to database");
        console.log("succesfully saved");
      })
      .catch(err => {
        res.status(400).send("cannot save");
        console.log("cannot be saved");
      });  
      
});

var json_test = {
  "voltage": 1,
  "current": 2,
  "power": 3,
  "state": "F",
  "level": 4
}

//mongodb schemas

var Schema =  mongoose.Schema({
  voltage: {type: String},
  current: {type: String},
  power: {type: String},
  state: {type: String},
  level: {type: String}
});

var modelo = mongoose.model("modelo", Schema);
//module.exports = modelo;


//send data to angular app

app.get('/test', function (req, res) {
  res.send(json_vacio);
});

app.post('/send', async (req, res) => {
    //const datos = { voltage, current, power, state, level };  
    const datos = new modelo(req.body);
    try {
      await datos.save();
      res.send(datos);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
module.exports = app





