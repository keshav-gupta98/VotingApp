import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
class GoHome extends Component
{
    constructor()
    {
        super();
        this.state = {click:false};
    }
    handleClick = () =>
    {
        this.setState({click:true});
    }
    render()
    {
        if(this.state.click === true)
        {
            return <Redirect to ='/'></Redirect>
        }
        return (
            <div>
            <h2>Go to Home</h2>
            <Link to='/'><Button onClick={this.handleClick}>Go To Home</Button></Link>
            </div>
        )
    }
}
export default GoHome;