
const dbConnection= require("./config/db");
//const app = require("express")();
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require("./routes");
const path = require("path");
const express = require('express');
const app = express();


//databaseConnection
dbConnection.authenticate()
.then(()=>{
  console.log("connection has been established Successfully");
}).catch((err)=>console.error("unable to connect database",err))


//cors
app.use(cors());
//use public folder to serve web pages

app.use(express.static(path.join(__dirname,"public")))


//for accepting posts from data
//app.use(bodyParser({ limit: "50mb" }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}));


//registering routes
app.get('/', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});
app.use(routes);


//api routes 


app.use("./domains/auth/model",require("./domains/auth/model"));
app.get("/*",(req,res)=>res.sendFile(path.join(__dirname,"public/index.html")))
app.use((err, req,res, next) =>{
  console.log(err);
  res.send(err)
})

//server 
app.listen(5000, () => {
  console.log("server running on port 5000");
});


module.exports = app;