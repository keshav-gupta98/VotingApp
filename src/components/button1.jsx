import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
class LogOutButton extends Component
{
    constructor()
    {
        super();
        this.state = {logout:false};
    }
    handleClick = () =>
    {
        localStorage.clear();
        this.setState({logout:true});
    }
    render()
    {
        if(this.state.logout === true)
        return <Redirect to = '/login'/>
        return (
            <div>
            <Button className="btn btn-outline-dark btn-light" onClick={this.handleClick} style={{float:"right",marginTop:"1rem",marginRight:"1rem"}}><FontAwesomeIcon icon={faPowerOff} /> LOGOUT</Button>
            </div>
        )
    }
}
export default LogOutButton;