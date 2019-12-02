//CONFIG DE VARIABLES
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const mongo = require('mongoose');

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

//PERMISOS DE ACCESO PARA LA APLICACION
app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200/');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
});

/*
//DEFINICION DE METODOS
app.post("/api/SaveUser", function(req, res){
    var mod = new model(req.body);
    if(req.body.model == "Save")
    {
        mod.save(function(err, data){
            if(err){
                res.send(err);
            }
            else{
                res.send({data:"Data base updated"});
            }
        });
    }
})

app.post("/api/deleteUser", function(req, res){
    model.remove({_id: req.bidy.id}, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send({data:"Data has been deleted"});
        }
    });
});

app.get("/api/getUser", function(req, res){
    model.find({}, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

//GET DE LA BASE DE DATOS

app.get("/base1", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
*/

//CONEXION A MONGODB ATLAS
const uri = "mongodb+srv://A7XENON:Exeron@97@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";//mongodb web url
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfuly conected to mongodb atlas");
    })
    .catch((err) => console.error(err));

//INICIALIZACIÓN DEL SERVIDOR    
app.listen(5000, function(){
    console.log("Listening to port 5000");
});

//GET DE LA BASE

const esosDatosModel = require('./app/models/modelo');

app.get('/', async (req, res) => {
    const esosDatos = await esosDatosModel.find({});
  
    try {
      res.send(esosDatos);
      console.log("Solicitud recibida");
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  module.exports = app