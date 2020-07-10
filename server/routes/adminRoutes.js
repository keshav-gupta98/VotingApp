require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin.js');

const Area = require('../models/area')
const Voter = require('../models/voters');
const Candidate = require('../models/candidate');
const Result = require('../models/result');
const OTP = require('../models/OTP');


//------------------------ GENERAL ROUTES -----------------------------------------------



router.get('/admin',function(req,res)                                        // get all admin
{
    Admin.find({}).then(function(u){
        res.send(u);
    })
})


router.get('/user',function(req,res)                                           // get all users
{
    User.find({}).then(function(u){
        res.send(u);
    })
})

router.post('/user',function(req,res)
{
    User.find({state:req.body.state,district:req.body.district}).then((u)=>
    {
        if(u.length > 0)
        {
            var d = [];
            u.map((item)=>
            {
                var temp = {_id:item._id,email:item.email,VoterID:item.VoterID};
                d.push(temp);
            })
            res.send(d);
        }
        else
        res.send('NoUser');
    })
})
router.post('/deleteuser',function(req,res)                                        // delete any user
{
    //console.log(req.body.data.id);
    User.findByIdAndDelete({_id:req.body.data.id}).then((u)=>
    {
        console.log(u);
        res.send(u);
    })
})


router.post('/AddVoter',function(req,res)                                       // add new voter ID
{
    var v = new Voter;
    v.VoterID = req.body.VoterID;
    v.state = req.body.state;
    v.district = req.body.district;
    v.email= req.body.email;
    v.firstname=req.body.firstname;
    v.lastname=req.body.lastname;
    console.log(v);
    v.save(function(err)
    {
        if(err)
        {
            console.log(err)
            res.send('error')
        }
        else
        res.send('OK');
    })
})


router.post('/voter',function(req,res)                                // get all voterID
{
    Voter.find({state:req.body.state,district:req.body.district}).then((v)=>
    {
        if(v.length>0)
        {
            var d = [];
            v.map((item)=>
            {
                var temp = {_id:item._id,VoterID:item.VoterID,email:item.email};
                d.push(temp);
            })
            res.send(d);
        }
        else
        {
            res.send("NoVoter")
        }
    })
})
router.get('/voter',function(req,res)
{
    Voter.find({}).then((v)=>
    {
        res.send(v);
    })
})
router.post('/deleteVoter',function(req,res)
{
    Voter.findByIdAndDelete({_id:req.body.data.id}).then((v)=>
    {
        User.findOneAndDelete({email:v.email})
        res.send(v);
    })
})


router.get('/otp',function(req,res)
{
    OTP.find({}).then((o)=>
    {
        res.send(o);
    })
})


router.delete('/otp',function(req,res)
{
    OTP.findByIdAndDelete({_id:req.body.id}).then((o)=>
    {
        res.send(o);
    })
})


router.post('/declareResult',function(req,res)
{
    var r = new Result;
    r.state = req.body.state;
    r.district = req.body.district;
    r.save(function(err)
    {
        if(err)
        {
            res.json("Result Already Declared");
        }
        else
        {
            res.json("Result declared");
        }
    })
})

router.post('/refresh',function(req,res)
{
    Result.findOneAndDelete({state:req.body.state,district:req.body.district}).then((r)=>
    {
        Candidate.updateMany({district:req.body.district},{votes:0},function(err,docs){
            if(err)
            console.log(err);
            else
            console.log(docs);
        })
        User.updateMany({state:req.body.state,district:req.body.district},{voted:"No"},function(err,docs){
            if(err)
            console.log(err);
            else
            console.log(docs);
        })
    })
})
router.get('/result',function(req,res)
{
    Result.find({}).then((r)=>
    {
        res.send(r);
    })
})


router.delete('/result',function(req,res)
{
    Result.findByIdAndDelete({_id:req.body.id}).then((r)=>
    {
        res.send(r);
    })
})


router.get('/getStates',function(req,res)                              // get all states
{
    Area.find({}).then(function(u){
        var d  = []
        u.map(function(item) {
            var temp = item.state
            d.push(temp)
        })
        res.send(d);
    })
})


router.post('/getDistricts',function(req,res)                          // get all districts of a given state
{
    var a = req.body.state;
    Area.findOne({state:a}).then((u)=>
    {
        //console.log(u.districts);
        res.send(u.districts);
    })
})


router.post('/addState',function(req,res)                              // add states and district in database
{
    var s = new Area;
    s.state = req.body.state;
    s.districts = req.body.districts;
    s.save(function(err){
        if(err)
        {
            console.log(err);
            res.json('error');
        }
        else{
            console.log('submitted');
            console.log(s);
            res.json('OK');
        }
    })
})


router.post('/AddCandidate',function(req,res)                      // add new candidate
{
    var c = new Candidate;
    c.firstname = req.body.firstname;
    c.lastname = req.body.lastname;
    c.party = req.body.party;
    c.description = req.body.description;
    c.state = req.body.state;
    c.district = req.body.district;
    c.save(function(err)
    {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(c);
            res.send(c);
        }
    })
})


router.get('/candidate',function(req,res)
{
    Candidate.find({}).then((u)=>
    {
        res.send(u);
    })
})

router.post('/candidate',function(req,res)
{
    Candidate.find({state:req.body.state,district:req.body.district}).then((c)=>
    {
        if(c.length>0)
        {
            var d = []
            c.map((item)=>
            {
                var temp = {_id:item.id,firstname:item.firstname,lastname:item.lastname,party:item.party}
                d.push(temp);
            })
            res.send(d);
        }
        else 
        res.send('NoCandidate')
    })
})
router.post('/deleteCandidate',function(req,res)                     // delete a candidate
{
    Candidate.findByIdAndDelete({_id:req.body.data.id}).then((c)=>
    {
        res.send(c);
    })
})
module.exports = router;