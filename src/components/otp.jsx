import React,{Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
class OTP extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {res:false,user:this.props.location.state,red:false};
    }
    validate = (event) =>
    {
        event.preventDefault();
        var x = this.refs.otp.value;
        axios.post('http://localhost:8000/validate',{
            otp:x,
            email:this.state.user.email
        }).then(res=>
            {
                if(res.data === "Session Expired")
                {
                    alert("Session Expired");
                    this.setState({red:true});
                }
                else if(res.data === "No")
                {
                    alert("Invalid OTP");
                }
                else
                {
                    axios.post('http://localhost:8000/register',{
                         user:this.state.user
                     }).then(res=>{
                         if(res.data === "error")
                        alert("This User Already Exists");
                         if(res.data === "OK")
                         this.setState({res:true});
                     })
                }
            })
    }
    render()
    {
        if(this.state.red === true)
        return <Redirect to='/newaccount'/>
        else if(this.state.res === true)
        return <Redirect to='/login'></Redirect>
        else
        return (
            <div className="container mt-4" style={{backgroundColor:"white"}}>
          <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
            <h4> Enter OTP sent to email linked with voterID {this.state.user.VoterID}</h4>
            <h6>(This OTP is valid for 60 seconds)</h6>
          </div>
          <form>
          <div className="row form-group">
          <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
              <input type="text" className="form-control" ref="otp" placeholder="Enter OTP"></input>
          </div>
          </div>
          <div className="row form-group">
          <div className="offset-md-4 offset-lg-4 offset-sm-2">
              <button className="btn btn-outline-dark btn-light" onClick={(event) => this.validate(event)}>Verify OTP</button>
          </div>
          </div>
          </form>
      </div>
        )
    }
}
export default OTP;