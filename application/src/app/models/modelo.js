//CONFIG DE VARIABLES
const mongoose = require('mongoose');

//CREACION DEL SCHEMA PARA MONGO
const esosDatosSchema = new mongoose.Schema({//ESQUEMA DE MONGO DB
    voltaje: {type: String},
    corriente: {type: String},
    potencia: {type: String},
    llenado: {type: String},
    estado: {type: String},
})

const esosDatos = mongoose.model("esosDatos", esosDatosSchema);
module.exports = esosDatos;