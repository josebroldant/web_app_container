//CONFIG DE VARIABLES
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongo = require('mongoose');

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

//CREACION DEL SCHEMA PARA MONGO
const Schema = new mongo.Schema({
    voltaje: {type: String},
    corriente: {type: String},
    potencia: {type: String},
    llenado: {type: String},
    estado: {type: String},
})

const esosDatos = mongoose.model("esosDatos", Schema);
module.exports = esosDatos;