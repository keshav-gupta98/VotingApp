const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    otp:Number,
})

module.exports= mongoose.model('OTP',otpSchema);