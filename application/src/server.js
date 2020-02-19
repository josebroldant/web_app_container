var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

//start server
app.listen(8081, function(){
    console.log("Listening to port 8081");
});

//CONEXION A MONGODB ATLAS
const uri = "mongodb+srv://A7XENON:Exeron@97@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";//mongodb web url
const database_name = "variables";
var database, collection;
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfuly conected to mongodb atlas");
        
    })
    .catch((err) => console.error(err));
    /*
    database = client.db(database_name);
    collection = database.colection("container");
    console.log("Connected to `" + database_name + "`!");
    */


//get method    
app.get('/', function (req, res) { 
    res.send("Hello from Server"); 
    })

//obtain json from esp8266

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }));
app.post('/', function(req, res){    
    res.send('Got the data!!');    
    //const { voltage, current, power, state, level } = req.body
    console.log(req.body);
    
    /*
    const newDatos = new modelo(req.body);//wrap data into a mongodb model 
    try {
      await newDatos.save();
      res.send(newDatos);
    } catch (err) {
      res.status(500).send(err);
    }
    */

    /*
    var userData = {
      voltage: req.body.voltage,
      current: req.body.current,
      power: req.body.power,
      state: req.body.state,
      level: req.body.level      
    }
    new eventData(userData).save()
    .then(res => {
      res.send("data saved");
    })
    .catch(err => {
      res.status(400).send("Unable to save data");
    });
    */
  
});

var json_test = {
  "voltage": 0.87999,
  "current": -0.1,
  "power": 0,
  "state": "F",
  "level": -1
}

mongoose.Promise = global.Promise;
//async function to save data based on post

app.post('/test', async (req, res) => {
    console.log(req.body);
    //const { voltage, current, power, state, level } = req.body;
    const newDatos = new modelo(req.body);//wrap data into a mongodb model 
    try {
      await newDatos.save();
      res.send(newDatos);
      console.log("succesfully saved");
    } catch (err) {
      res.status(500).send(err);
      console.log("cannot save data");
    }
  });

//mongodb schema

var Schema =  mongoose.Schema({
    voltage: String,
    current: String,
    power:  String,
    state: String,
    level:  String,
});

//create mongodb model based on schema to send data

var modelo = mongoose.model("modelo", Schema);
module.exports = modelo;

//post data to mongodb

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





