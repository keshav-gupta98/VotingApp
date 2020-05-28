import React,{Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
class OTP extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {res:false,id:this.props.location.state.id};
    }
    validate = (event) =>
    {
        event.preventDefault()
        var x = this.refs.otp.value;
        axios.post(`http://localhost:8000/castVote`,{otp:x,id:this.state.id},{
            headers :{
                         'authorization' : localStorage.token
                     }
        }).then(res=>
            {
                if(res.data === "Session Expired")
                {
                    alert(`Session Expired`)
                    this.setState({res:true});
                }
                else if(res.data === "Invalid Otp")
                {
                    alert(`Invalid Otp`)
                }
                else
                {
                    alert(`Thank You For Voting!`)
                    this.setState({res:true});
                }
            })
    }
    render()
    {
        if(this.state.res === true)
        return (
            <Redirect to='/vote'></Redirect>
        )
        else
        return (
            <div className="container mt-4" style={{backgroundColor:"white"}}>
          <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
            <h2> Enter OTP  sent to your email </h2>
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