var nodemailer = require('nodemailer');
require('dotenv').config();


var sendMail = function(senderEmail, subject,body)
{
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.AdminEmail,
            pass: process.env.adminPass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: process.env.AdminEmail,
        to: senderEmail,
        subject: subject,
        text: body 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;