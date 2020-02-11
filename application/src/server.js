var express = require('express');
var app = express(); 
var bodyParser = require('body-parser')

app.get('/', function (req, res) { 
res.send("Hello from Server"); 
})

app.use(bodyParser.urlencoded({ extended: false }))
app.post('/', function(req, res) {    
res.send('Got the data!!');     console.log(JSON.stringify(req.body)); }) 

app.listen(8081, function(){
    console.log("Listening to port 8081");
});