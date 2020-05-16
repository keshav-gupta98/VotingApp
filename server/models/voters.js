const mongoose = require('mongoose');
const voterSchema = new mongoose.Schema({
    VoterID:{
        type:String,
        required:true,
        unique:true,
    },
    state:String,
    district:String
});

module.exports= mongoose.model('Voter',voterSchema);