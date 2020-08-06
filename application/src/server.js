var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var json_vacio = {"voltage":"", "current":"", "power":"", "level":"", "state":""};

mongoose.Promise = global.Promise;

//start server
app.listen(8081, function(){
    console.log("Listening to port 8081");
});

//PERMISOS DE ACCESO PARA LA APLICACION
var angular = 'http://localhost:4200';
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
      "level": req.body["level"],
      "time": req.body["time"]
    }

    //PARA EL GET DE ANGULAR
    json_vacio = json_final;
    ////////////////////////

    console.log(json_final);

    //SAVE DATA IN MONGODB ATLAS
    var newDatos = new modelo(json_final);
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

//mongodb data model

var Schema =  mongoose.Schema({
  voltage: {type: String},
  current: {type: String},
  power: {type: String},
  state: {type: String},
  level: {type: String},
  time: {type: String}
});

var modelo = mongoose.model("modelo", Schema);

//UNLOCK DATA TO SEND TO ESP8266
var json_unlock = {
  estado: "F"
}

//SEND DATA TO ANGULAR APP

app.get('/getData', function (req, res) {
  res.send(json_vacio);
});

//SEND UNLOCK DATA TO ESP8266

app.post('/unlock', function (req, res) {
  json_unlock = req.body;//PASS FROM DEFAULT FULL TO NORMAL
  res.send(json_unlock.estado);//RESPUESTA AL ANGULAR
  console.log("ESTADO RECIBIDO AL ACCIONAR EL BOTON: "+json_unlock.estado);
});

app.get('/unlock', function (req, res) {
  res.send(json_unlock.estado);//ENVIO A LA TARJETA EL ESTADO ACTUAL F Ó N
  console.log("ESTADO ENVIADO A LA TARJETA: "+json_unlock.estado);
});
  
module.exports = app





