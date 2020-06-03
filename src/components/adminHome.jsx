import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import AdminUser from './adminUsers'
import AdminVoter from './adminVoters'
import AdminCandidate from './adminCandidate';
import AdminResult from './adminResult';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
class AdminHome extends Component
{
    constructor()
    {
        super();
        this.state={button:'0'};
    }
    butttonClicked(option)
    {
        if(option === '1')
        {
            this.setState({button:'1'});
        }
        if(option === '2')
        {
            this.setState({button:'2'});
        }
        if(option === '3')
        {
            this.setState({button:'3'});
        }
        if(option === '4')
        {
            this.setState({button:'4'});
        }
    }
    render()
    {
        if(this.state.button === '1')
        return (
            <div>
                <div className="d-flex flex-column" style={{marginTop:'80px'}}>
                    <ButtonGroup size="sm">
                    <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')}>USERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')}>VOTERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')}>CANDIDATES</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')}>RESULT</Button>
                    </ButtonGroup>
                </div>
                <AdminUser/>
            </div>
        )
        else if(this.state.button === '2')
        return (
            <div>
                <div className="d-flex flex-column" style={{marginTop:'80px'}}>
                    <ButtonGroup size="sm">
                    <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} >USERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} >VOTERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} >CANDIDATES</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} >RESULT</Button>
                    </ButtonGroup>
                </div>
                <AdminVoter/>
            </div>
        )
        else if(this.state.button === '3')
        return (
            <div>
                <div className="d-flex flex-column" style={{marginTop:'80px'}}>
                    <ButtonGroup size="sm">
                    <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} >USERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} >VOTERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} >CANDIDATES</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} >RESULT</Button>
                    </ButtonGroup>
                </div>
                <AdminCandidate/>
            </div>
        )
        else if(this.state.button === '4')
        return (
            <div>
                <div className="d-flex flex-column" style={{marginTop:'80px'}}>
                    <ButtonGroup size="sm">
                    <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} >USERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} >VOTERS</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} >CANDIDATES</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} >RESULT</Button>
                    </ButtonGroup>
                </div>
                <AdminResult/>
            </div>
        )
        else
        {
            return (
                <div>
                    <div className="d-flex flex-column" style={{marginTop:'80px'}}>
                        <ButtonGroup size="sm">
                        <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')}>USERS</Button>
                        <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')}>VOTERS</Button>
                        <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')}>CANDIDATES</Button>
                        <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')}>RESULT</Button>
                        </ButtonGroup>
                    </div>
                </div>
            )
        }
    }
}
export default AdminHome;