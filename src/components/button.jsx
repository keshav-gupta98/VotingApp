import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
class LoginButton extends Component
{
    render()
    {
        return (
            <Link to='/login'><Button className="btn btn-outline-dark btn-light" onClick={this.handleClick} style={{float:"right",marginTop:"1rem",marginRight:"1rem"}}>LOGIN</Button></Link>
        )
    }
}
export default LoginButton;