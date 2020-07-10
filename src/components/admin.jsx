import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
class Login extends Component
{
  constructor()
  {
    super();
    this.state = {
      mail:"",
      pass:"",
      loggedin:false
    }
  }
  submitHandler= (event) =>
  {
    
    event.preventDefault();
        axios.post('http://localhost:8000/adminLogin',{
                        mail:event.target.email.value,
                        pass:event.target.password.value
                        })
                        .then(res=>{
                            if(res.data === "error")
                                console.log(res.data);
                            else if(res.data === "noUser")
                            {                                    
                                alert("Invalid Username Or Password")
                            }
                            else
                            {
                                this.setState({loggedin:true});
                                setTimeout(()=>{
                                    localStorage.setItem('admin',"true");
                                    localStorage.setItem('token',res.data.token);
                                    this.props.nature("true")
                                })
                            }
                        })
    }
  render()
  {
    if(this.state.loggedin)
    return <Redirect to = '/adminHome'></Redirect>
    return(
      <div className="container mt-4" style={{backgroundColor:"white"}}>
          <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
              <h2> Login for Admin Account</h2>
          </div>
          <form onSubmit={this.submitHandler}>
          <div className="row form-group">
          <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
              < label htmlFor="email">Email</label>
              <input type="text" className="form-control" id="email" placeholder="Email"  required></input>
          </div>
          </div>
          <div className="row form-group">
          <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password"  required></input>
          </div>
          </div>
          <div className="row form-group">
          <div className="offset-md-3 offset-sm-1 offset-lg-3 col-md-2 col-lg-2 col-sm-1">
              <button className="btn btn-outline-dark btn-light" type="submit">Login</button>
          </div>
          </div>
          </form>
      </div>
  )
  }
}
export default Login;
