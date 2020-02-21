var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
    console.log(req.body);
    //req.body = JSON.parse(req.body);
    //var parsed = JSON.stringify(req.body);
    //var { voltage, current, power, state, level } = req.body;
    
    
    var newDatos = new modelo(req.body);//wrap data into a mongodb model 
    newDatos.save()
      .then(item => {
        res.send("saved to database");
        console.log("succesfully saved");
      })
      .catch(err => {
        res.status(400).send("cannot save");
        console.log("cannot be saved");
      });
      

    /* //USING ANOTHER METHOD
    const item = req.body;
      dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => { // callback of find
            if (_error) throw _error;
            response.json(_result);
        });
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


//post data to mongodb

app.post('/test', function (req, res) {
  console.log(req.body);
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





