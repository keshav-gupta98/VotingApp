import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './formcss.css';
class NewAccount extends Component
{
    constructor()
    {
        super();
        this.state={firstname:"",lastname:"",email:"",password:'',state:'',district:'',VoterID:'',
        submitted:false,res:false};
        this.letter = React.createRef();
        this.capital = React.createRef();
        this.number = React.createRef();
        this.length = React.createRef();
        
        // axios.get(`http://localhost:8000/getStates`).then((res)=>
        // {
        //     this.setState({states:res.data});
        // })
        // var q = "Andhra Pradesh";
        // axios.get('http://localhost:8000/getDistricts',{params:{
        //     id:q
        // }}).then(res=>{
        //     this.setState({districts:res.data});
        //     }
        // )
    }
    // stateSelected = (event)=>
    // {
    //     var a = event.target.state.value;
    //     a = "Andhra Pradesh";
    //     axios.get(`http://localhost:8000/getDistrict`,{state:a}).then(res=>{
    //         this.setState({districts:res.data});
    //         }
    //     )
    // }
    passwordCheck = (event)=>{
        let myInput = event.target.value;
                    var lowerCaseLetters = /[a-z]/g;
                    if(myInput.match(lowerCaseLetters)) {  
                        this.letter.current.classList.remove("invalid");
                        this.letter.current.classList.add("valid");
                    } else {
                        this.letter.current.classList.remove("valid");
                        this.letter.current.classList.add("invalid");
                    }
                    
                    // Validate capital letters
                    var upperCaseLetters = /[A-Z]/g;
                    if(myInput.match(upperCaseLetters)) {  
                        this.capital.current.classList.remove("invalid");
                        this.capital.current.classList.add("valid");
                    } else {
                        this.capital.current.classList.remove("valid");
                        this.capital.current.classList.add("invalid");
                    }

                    // Validate numbers
                    var numbers = /[0-9]/g;
                    if(myInput.match(numbers)) {  
                        this.number.current.classList.remove("invalid");
                        this.number.current.classList.add("valid");
                    } else {
                        this.number.current.classList.remove("valid");
                        this.number.current.classList.add("invalid");
                    }

                    // Validate length
                    if(myInput.length >= 8) {
                        this.length.current.classList.remove("invalid");
                        this.length.current.classList.add("valid");
                    } else {
                        this.length.current.classList.remove("valid");
                        this.length.current.classList.add("invalid");
                    }

    }
    passwordChange = () =>
    {
        if(this.letter.current.classList.contains("valid"))
        {
            if(this.capital.current.classList.contains("valid"))
            {
                if(this.number.current.classList.contains("valid"))
                {
                    if(this.length.current.classList.contains("valid"))
                    return true;
                }
            }
        }
        return false;
    }
    onsubmitHandeler = (event)=>
    {
        event.preventDefault();
        var regName =  /^[a-zA-Z]+$/; 
        if(!regName.test(document.getElementById('firstname').value))
        {
            alert('Invalid FirstName')
        }
        else
        {
            if(!regName.test(document.getElementById('lastname').value))
            {
                alert('Invalid LastName');
            }
            else
            {
                if(this.passwordChange()===false)
                {
                    alert("Please enter correct value");
                }
                else
                {
                    if(event.target.Confirm.value!==event.target.password.value)
                    {
                        alert('Please confirm password correctly');
                    }
                    else
                    {
                        this.firstname=event.target.firstname.value;
                        this.lastname=event.target.lastname.value;
                        this.email=event.target.email.value;
                        this.VoterID=event.target.VoterID.value;
                        this.password=event.target.password.value;
                        this.setState({firstname:this.firstname,
                                        lastname:this.lastname,
                                        email:this.email,
                                        VoterID:this.VoterID,
                                        password:this.password,
                                        submitted:true});
                                        if(this.state.submitted)
        {
            axios.post('http://localhost:8000/checkList',{id:this.state.VoterID}).then(res=>
            {
                if(res.data === "error")
                console.log("error");
                else if(res.data === "Voter ID is Invalid")
                alert(res.data);
                else{
                    this.setState({state:res.data.state,district:res.data.district});
                     axios.post('http://localhost:8000/userAvailable',{
                         user:this.state
                     }).then(res=>{
                         if(res.data === "error")
                        alert("This User Already Exists");
                         if(res.data === "OK")
                         this.setState({res:true});
                     })       
                }
            })
        }
                    }
                }
            }
        }
    }
    render() {
        if(this.state.res===true)
        {
            return ( <Redirect to={{
                pathname:'/otp',
                state:this.state
            }}/> )
        }
        return(
            <React.Fragment>
            <div className="container mt-4" style={{backgroundColor:"white"}}>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <h2 className="col-md-8 mb-3">Create New Account</h2>
            </div>
            <form onSubmit={this.onsubmitHandeler}>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                < label htmlFor="firstname">FirstName</label>
                <input type="name" className="form-control" id="firstname" placeholder="FirstName"  required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                < label htmlFor="lastname">LastName</label>
                <input type="name" className="form-control" id="lastname" placeholder="LastName"  required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="VoterID">Voter ID</label>
                <input type="text" className="form-control" id="VoterID" placeholder="VoterID" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="email">Email ID</label>
                <input type="email" className="form-control" id="email" placeholder="e.g.abc@gmail.com" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 cooffset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5-5">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.passwordCheck}  />
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="Confirm">Confirm Password</label>
                <input type="password" className="form-control" id="Confirm" required></input>
            </div>
            <button className="btn btn-outline-dark btn-light offset-md-3 offset-lg-3 offset-sm-2" type="submit">Create Account</button>
        </form>
        <div id="message">
        <h3>Password must contain the following:</h3>
        <p ref={this.letter} className="invalid">A <b>lowercase</b> letter</p>
        <p  ref={this.capital} id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
        <p ref={this.number} id="number" className="invalid">A <b>number</b></p>
        <p ref={this.length} id="length" className="invalid">Minimum <b>8 characters</b></p>
        </div>
        </div>
        </React.Fragment>
        )
    }
}
export default NewAccount;