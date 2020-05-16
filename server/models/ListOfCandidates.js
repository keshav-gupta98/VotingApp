const mongoose = require('mongoose');
const Candidate = require('./candidate.js');
const ListOfCandidateSchema = new mongoose.Schema({
    state:String,
    area:String,
    candidate:[{type:mongoose.Schema.Types.ObjectId,ref:'Candidate'}],
});

module.exports= mongoose.model('ListOfCandidates',ListOfCandidateSchema);