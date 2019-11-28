var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200/');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
});

const uri = "mongodb+srv://A7XENON:Exeron@97@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";//mongodb web url
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfuly conected");
    })
    .catch((err) => console.error(err));

app.listen(5000, function(){
    console.log("Listening to port 5000");
});