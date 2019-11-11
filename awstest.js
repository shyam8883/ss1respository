var express = require("express");
var path = require("path");
var ejs = require("ejs")
var mongoose = require("mongoose")
var bodyparser = require("body-parser")
var urlencoded = bodyparser.urlencoded({extended:false})
mongoose.connect("mongodb+srv://ssadmin:rodyncilliya@cluster0-jzajf.mongodb.net/awsmongo?retryWrites=true&w=majority");
var awsSchema = new mongoose.Schema({department:String, injury:String, investigation:String ,status:String})
var Incidents = mongoose.model("Incidents",awsSchema)
//var incident1 = new Incidents({department:"WRM",injury:"major",investigation:"interviews",status:"completed"});
//incident1.save(function(err,data){
   // console.log("Data saved")
//});
   
var app = express();
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/awstest",function(req,res){
    Incidents.find({},function(err,data){
        if(err) throw err;
    //console.log(data);
    res.render("awstest",{data:data})
})
})
app.get("/filter/:name",function(req,res){
    Incidents.find({department:req.param("name")},function(err,data){
        res.render("filter",{data:data})
    })
}) 
app.post("/post",urlencoded,function(req,res){
        Incidents(req.body).save(function(err,data){
                console.log("Data Saved from Post", data)
            })
        })





app.listen(3000,()=>console.log("Listening"))
