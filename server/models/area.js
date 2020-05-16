const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    state:{
        type:String,
        unique:true
    },
    districts:Array,
})

module.exports= mongoose.model('Area',areaSchema);