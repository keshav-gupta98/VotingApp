const mongoose = require('mongoose');
const voterSchema = new mongoose.Schema({
    VoterID:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstname:String,
    lastname:String,
    state:String,
    district:String
});

module.exports= mongoose.model('Voter',voterSchema);