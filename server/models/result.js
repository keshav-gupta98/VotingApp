const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
    state:String,
    district:String
});
resultSchema.index({state:1,district:1},{unique:true})
module.exports= mongoose.model('Result',resultSchema);