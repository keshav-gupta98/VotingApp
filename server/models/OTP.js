const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    otp:Number,
}, {timestamps: true})
otpSchema.index({createdAt: 1},{expireAfterSeconds: 60})
module.exports= mongoose.model('OTP',otpSchema);