require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin.js');
const ListOfCandidates = require('../models/ListOfCandidates');
const Area = require('../models/area')
const Voter = require('../models/voters');
const Candidate = require('../models/candidate');
const Result = require('../models/result');
const OTP = require('../models/OTP');


//------------------------ GENERAL ROUTES -----------------------------------------------



router.get('/getAdmin',function(req,res)                                        // get all admin
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


router.delete('/user',function(req,res)                                        // delete any user
{
    User.findByIdAndDelete({_id:req.body.id}).then(function(u){
        console.log(u);
        res.send(u);
    })
})


router.post('/addVoter',function(req,res)                                       // add new voter ID
{
    var v = new Voter;
    v.VoterID = req.body.VoterID;
    v.state = req.body.state;
    v.district = req.body.district;
    v.save(function(err)
    {
        if(err)
        res.send(err);
        else
        {
            res.send(v);
        }
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
router.get('/voterID',function(req,res)                                // get all voterID
{
    Voter.find({}).then((v)=>
    {
        res.send(v);
    })
})


router.get('/declareResult',function(req,res)
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
router.get('/g',function(req,res)
{
    Result.find({}).then((r)=>
    {
        res.send(r);
    })
})
router.delete('/d',function(req,res)
{
    Result.findByIdAndDelete({_id:req.body.id}).then((r)=>
    {
        res.send(r);
    })
})
router.delete('/voterID',function(req,res)
{
    Voter.findByIdAndDelete({_id:req.body.id}).then((v)=>
    {
        res.send(v);
    })
})


router.get('/getStates',function(req,res)                              // get all states
{
    Area.find({}).then(function(u){
        res.send(u);
    })
})


router.post('/getDistricts',function(req,res)                          // get all districts of a given state
{
    var a = req.body.state;
    Area.findOne({state:a}).then((u)=>
    {
        //console.log(u.districts);
        res.send(u);
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


router.post('/addCandidate',function(req,res)                      // add new candidate
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
router.get('/c',function(req,res)
{
    Candidate.find({}).then((u)=>
    {
        res.send(u);
    })
})

router.delete('/deleteCandidate',function(req,res)                     // delete a candidate
{
    Candidate.findByIdAndDelete({_id:req.body.id}).then((c)=>
    {
        res.send(c);
    })
})
module.exports = router;