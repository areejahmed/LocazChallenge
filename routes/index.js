var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var User=require('../lib/User');
var driverschema=require('../lib/drivers')

//Definining scehmma for storing a list of locations in a collection called session
var mySchemaSessions=mongoose.Schema({
    latitude: String,
    longitude: String

});

var ChoiceModel=mongoose.model('sessions',mySchemaSessions); //sessions=collection name, and then the schema



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


mongoose.connect('mongodb://localhost/Drivers', { useNewUrlParser: true });//connect to local host , the sample database test
var MongoClient=require('mongodb').MongoClient; //uisng the mongodb driver

//specifying the url connection
var url='mongodb://localhost/Drivers';


MongoClient.connect(url,{ useUnifiedTopology: true },function(err,client){ //connecting to database
  console.log("Connected to Drivers MongoDb"); //writng to the console log if successfulcom
  const db=client.db('Drivers');

//List all Drivers
router.get('/localz/drivers',function(req,res){
  db.collection('drivers').find({}).toArray(function(err,result){

     if (err){
     return res.status(401).json("Driver not found");
   };
     return res.status(200).json(result);
     // console.dir(result);
     // return res.status(200).send(result);
   });
     });

  // Search Driver by name
  router.get('/localz/name',function(req,res){

  var Name=req.query.Name;
   db.collection('drivers').find({firstName:Name}).toArray(function(err,result){

      if (err){
      return res.status(401).json("Driver not found");
    };
      return res.status(200).json(result);
      // console.dir(result);
      // return res.status(200).send(result);
    });
      });


// Search driver by ID
  router.get('/localz/id',function(req,res){
  var Id=req.query.Id;
    db.collection('drivers').find({id:Id}).toArray(function(err,results){

       if (err){
       return res.status(401).json("Drive ID not found");
     };
       return res.status(200).json(results);
       // console.dir(result);
       // return res.status(200).send(result);
     });
   });
client.close(); //closing the database connection
    });




mongoose.connect('mongodb://localhost/myuser', { useNewUrlParser: true });
var User=require('../lib/User');

//Register a User
router.post('/localz/register',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var newuser= new User();
  newuser.username=username;
  newuser.password=password;
  newuser.firstname=firstname;
  newuser.lastname=lastname;
  newuser.save(function(err,savedUser){

    if(err){
      console.log(err);
      return res.status(500).json();
    };

    return res.status(200).json("Registered a new user");
  });
});


//Login
router.post('/localz/login',function(req,res){
  var username = req.body.username; //collecting username and password from the body
  var password = req.body.password;
  User.findOne({username:username,password:password},function(err,user){
    if (err){
      console.log(err);
      return res.status(500).json();
    };
    if(!user){   //if user doesnt exist or the field is empty
      return res.status(404).json("User does not exist");
    }
      req.session.user=user;
    return res.status(200).json("Succesfully logged in!"); //if valid, return ok
  });

});

// Creating a session
router.get('/localz/dashboard',function(req,res){
    if(!req.session.user){        // if not logged in, return status 401
        return res.status(401).json("Login in to access the dashboard");
    };

    return res.status(200).json("Welcome to your dashboard");
});

//Log out
router.get('/localz/logout',function(req,res){
// User.findOne({username:username,password:password},function(err,user){
    if(!req.session.user){   //if user is not logged in
      return res.status(404).json("User is not logged on");
    };
    req.session.user = null;
    return res.status(200).json("Succesfully logged out"); //if valid, return ok
  });



module.exports = router;
