//Import libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongoose');

//Connection to MongoDB local server on PC
let db = mongo.connect("mongodb://localhost:27017/web_app_container", function(err, response){
    if(err){console.log( err);}
    else{console.log('Connected to'+db, ' * ', response);}
});

let app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

//App permissions
app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200/');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
});

let Schema = mongo.Schema;

//MongoDB data schema
let UsersSchema = new Schema({
   voltaje: {type:String},
   corriente: {type:String},
   potencia: {type:String},
   estado: {type:String},
   llenado: {type:String},
    },{versionKey: false});

//Wrap schema into model
let model = mongo.model('users', UsersSchema, 'users');

//API with different methods

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

app.listen(5000, function(){
    console.log("Listening to port 5000");
});