var mongoose=require('mongoose');

var dSchema= new mongoose.Schema({
  id:{type:String,unique:true},
  firstname:String,
  lastname:String
});

var driverschema=mongoose.model('mydriver',dSchema);
module.exports=driverschema;
