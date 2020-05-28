require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const randomstring = require('randomstring');
const mailSender = require('./sendmail');

const User = require('./models/user');
const Admin = require('./models/admin.js');
const Area = require('./models/area')
const Voter = require('./models/voters');
const Candidate = require('./models/candidate');
const Result = require('./models/result');
const OTP = require('./models/OTP');

const AdminRoutes  = require('./routes/adminRoutes');


const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
const SECRET_KEY = process.env.SECRET_KEY;
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useFindAndModify: false,useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
    console.log("DataBase connected");
})
var urlencodedParser = bodyParser.urlencoded({extended:false});

mongoose.set('useCreateIndex', true);

let db = mongoose.connection

db.once('open',function(){
    console.log('Connected to MongoDB')
})

db.on('error',function(err){
    console.log(err);
})


//------------------------ GENERAL ROUTES -----------------------------------------------
JWTValidator = (req,res,next)=>{
    const token = req.headers.authorization;
    jwt.verify(token,SECRET_KEY,(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else if(data)
        {
            req.email = data;
            next();
        }
    })
}

app.use('/admin',AdminRoutes);
// get info of a voter while creating new user
app.post('/checkList',function(req,res)                          
{
    var id = req.body.id;
    Voter.findOne({VoterID:id},function(err,voter){
        if(err)
        {
            console.log(err);
            res.json("error");
        }
        else if(!voter)
        {
            res.json("Voter ID is Invalid");
        }
        else
        {
            res.send(voter);
        }
    })
})


// add new account
app.post('/register',urlencodedParser,function(req,res){
    console.log(res.body);
     var u = new User;
     u.VoterID=req.body.user.VoterID;
     u.firstname = req.body.user.firstname;
     u.lastname = req.body.user.lastname;
     u.email = req.body.user.email;
     u.password=req.body.user.password;
     u.state=req.body.user.state;
     u.district=req.body.user.district;
     u.voted="No";
     u.save(function(err){
         if(err)
         {
             console.log(err);
             res.json('error');
         }
         else{
             console.log('submitted');
             console.log(u);
             res.json('OK');
         }
     })
})


app.post('/login',function(req,res){                                                    // login check
    User.findOne({email:req.body.mail,password:req.body.pass},function(err,user)
    {
        if(err)
        res.json("error");
        else if(!user)
        res.json("noUser");
        else
        {
            jwt.sign(req.body.mail,SECRET_KEY,(err,token)=>
            {
                if(err)
                res.send(err);
                else res.send({token});
            })
        }
    })
})


app.post('/adminLogin',function(req,res){                                            // adminLogin check
    Admin.findOne({email:req.body.mail,password:req.body.pass},function(err,user)
    {
        if(err)
        res.json("error");
        else if(!user)
        res.json("noUser");
        else
        {
            jwt.sign(req.body.mail,SECRET_KEY,(err,token)=>
            {
                if(err)
                res.send(err);
                else res.send({token});
            })
        }
    })
})


app.post('/userAvailable',function(req,res)
{
    User.findOne({email:req.body.user.email},function(err,user){
        if(err)
        console.log(err);
        else if(!user)
        {
            User.findOne({VoterID:req.body.user.VoterID},function(err,u)
            {
                if(!u)
                {
                    const token = randomstring.generate({
                        length:6,
                        charset:'123456789'
                    })
                    console.log(token);
                    mailSender(req.body.user.email,'Account verification mail','Your OTP is :'+token);
                    var x = new OTP;
                    x.email = req.body.user.email;
                    x.otp = token;
                    x.save(function(err)
                    {
                        if(err)
                        res.json('error');
                        else
                        res.json('OK');
                    })
                }
                else {
                    res.send('error')
                }
            })
        }
        else res.send('error');
    })
})

app.post('/validate',function(req,res)
{
    OTP.findOne({email:req.body.email,otp:req.body.otp},function(err,user)
    {
        if(err)
        console.log(err)
        else if(!user)
        res.json("No");
        else {
            OTP.findOneAndDelete({email:req.body.email},function(err,otp)
            {
                console.log(otp);
            });
            res.json("Yes");
        }
    })
})

// -------------------------   PROFILE ROUTES ---------------------------------------------------


// get profile of user
 app.get('/profile',JWTValidator,function(req,res)
 {
     User.findOne({email:req.email}).then((u)=>
     {
         res.send(u);
     })
 })



 // change password of user
app.post('/changePassword',JWTValidator,function(req,res)
{
    User.updateOne({email:req.email},{$set:{password:req.body.data.pass}}).then((u)=>
    {
        res.send("Password Changed");
    })
})


// -------------------------------------USER   ROTES  ----------------------------------------------


app.post('/castVote',JWTValidator,function(req,res)                                // to cast vote
{
    OTP.find({}).then((otp)=>
    {
        if(otp.length === 0)
        res.send("Session Expired");
        else
        {
            OTP.findOne({email:req.email,otp:req.body.otp},function(err,o)
            {
                if(!o)
                res.send('Invalid Otp');
                else
                {
                    User.findOneAndUpdate({email:req.email},{$set:{voted:"Yes"}}).then((U)=>
                    {
                        console.log(U);
                    })
                    Candidate.findById({_id:req.body.id},function(err,c)
                    {
                        var x = c.votes;
                        x = x+1;
                        Candidate.findByIdAndUpdate({_id:req.body.id},{$set:{votes:x}})
                    })
                    res.send("OK");
                }
            })
        }
    })
})

app.get('/sendMail',JWTValidator,function(req,res)
{
    const token = randomstring.generate({
        length:6,
        charset:'123456789'
    })
    console.log(token);
    mailSender(req.email,'Account verification mail','Your OTP for Voting is :'+token);
    var x = new OTP;
    x.email = req.email;
    x.otp = token;
    x.save(function(err)
    {
        if(err)
        res.json('error');
        else
        res.json('OK');
    })
})
//check whether user can vote or not
app.get('/vote',JWTValidator,function(req,res)
{
    User.findOne({email:req.email},function(err,user)
    {
        if(user.voted === "No")                                      // User has not voted yet
        {
            Result.findOne({state:user.state,district:user.district},function(err,r)
            {
                if(!r)
                res.json("Yes");
                else
                res.json("Declared");                               // If results are declared
            })
        }
        else
        {
            res.json("Voted");                                       // If user has already voted
        }
    })
})


app.get('/listofCandidates',JWTValidator,function(req,res)              // get list of candidates of an area
{
    User.findOne({email:req.email},function(err,user){
        Candidate.find({state:user.state,district:user.district}).then((c)=>
        {
            var d  = []
            c.map(function(item) { 
                var temp = {_id:item._id,firstname:item.firstname,lastname:item.lastname,party:item.party,description:item.description};
                d.push(temp); 
            });
            res.send(d);
        })
        })
})


app.get('/getResult',JWTValidator,function(req,res)                   // get Result
{
    User.findOne({email:req.email},function(err,user){
        if(err)
        {
            res.json(err);
        }
        if(!user)
        {
            res.json('No User');
        }
        else
        {
            Result.findOne({state:user.state,district:user.district},function(err,r)
            {
                if(!r)
                {
                    res.json('Result Not Declared');
                }
                else
                {
                    Candidate.find({state:user.state,district:user.district},function(err,c)
                    {
                        if(!c)
                        res.json("No Results Found");
                        else
                        res.send(c);
                    })
                }
            })
        }
    })
})





const port = process.env.PORT;
app.listen(port,console.log(`Server started on port ${process.env.PORT}`));