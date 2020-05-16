const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    party:String,
    votes :{
        type:Number,
        default:0
    },
    description:String,
    state:String,
    district:String
})

module.exports= mongoose.model('Candidate',candidateSchema);