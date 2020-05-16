const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    VoterID:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    firstname:String,
    lastname:String,
    password:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    voted:
    {
        type:String,
    },
});

module.exports= mongoose.model('User',userSchema);