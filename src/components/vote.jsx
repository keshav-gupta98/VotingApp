import React,{Component} from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faInfoCircle,faTimes,faCheck } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
class Vote extends Component
{
    constructor()
    {
        super();
        this.state = {id:'',loading:false,list:[{}],vote:false,modal:false,info:'',declared:false,confirm:false,id:'',red:false};
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8000/vote`,
        {
            headers : {
                'authorization' : localStorage.token
            }
        }).then(res=>
            {
                if(res.data === "Voted")
                {
                    this.setState({loading:true,vote:true});
                }
                else
                {
                    if(res.data === "Declared")
                    this.setState({loading:true,declared:true})
                    else
                    {
                        axios.get(`http://localhost:8000/listofCandidates`,{
                        headers : {
                            'authorization' : localStorage.token
                        }
                        }).then(res=>
                        {
                            this.setState({loading:true,list:res.data});
                        })
                    }
                }
            }
            )
    }
    castVote = (id) =>
    {
        axios.get(`http://localhost:8000/sendMail`,{
            headers :{
                         'authorization' : localStorage.token
                     }
        }).then(res=>
            {
                this.setState({id:id,red:true});
            })
    }
    modalHandle = (a,b,c,d) =>
    {
        var y = {firstname:a,lastname:b,party:c,description:d}
        this.setState({modal:true,info:y});
    }
    closeModal = () =>
    {
        this.setState({modal:false});
    }
    confirmHandle = (id) =>
    {
        this.setState({confirm:true,id:id});
    }
    closeConfirm = () =>
    {
        this.setState({confirm:false});
    }
    render()
    {
        if(localStorage.getItem('token') === null)
        {
            return <Redirect to="/login"></Redirect>
        }
        else if(this.state.red === true)
        {
            return ( <Redirect to={{
                pathname:'/VoteOtp',
                state:{id:this.state.id}
            }}/> )
        }
        else if(this.state.loading === false)
        {
            return (
                <div style={{marginLeft:"600px",marginTop:"200px"}}>
                    <Spinner animation="border" role="status" size="lg">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        else if(this.state.vote === true)
        {
            return (
                <div className = "text-center">
                <p style={{fontSize:"80px",color:"grey"}}><b> YOU HAVE ALREADY VOTED!</b></p>
            </div>
            )
        }
        else if(this.state.declared === true)
        {
            return (
                <div className = "text-center">
                <p style={{fontSize:"80px",color:"grey"}}><b> RESULTS ARE ALREADY DECLARED!</b></p>
            </div>
            )
        }
        else if(this.state.modal === false && this.state.confirm === false)
        {
            return (
                <div className="container"  style={{marginTop:'20px'}}>
                <div className="col">{this.state.list.map((item)=>{
                return <div key={item._id} className="col-md-12 col-lg-12 col-sm-12" style={{marginTop:'20px'}}>
                        <div className="card">
                        <div className = "row">
                            <div className = "col-md-2">
                            <FontAwesomeIcon icon={faUser} size="10x" style={{color:'#EE82EE'}}/>
                            </div>
                            <div className = "col-md-6">
                                <h3>{item.firstname} {item.lastname}</h3>
                                <h2 style={{color:'#A0522D'}}>{item.party}</h2>
                            </div>
                            <div className="col-md-4">
                                <br/><br/>
                                
                                    <ButtonGroup>
                                        <Button onClick={()=>this.confirmHandle(item._id)}><FontAwesomeIcon icon={faCheck} /> VOTE</Button>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button onClick={()=>this.modalHandle(item.firstname,item.lastname,item.party,item.description)} className="btn btn-danger" style={{marginLeft:'5px'}}><FontAwesomeIcon icon={faInfoCircle}/> GET INFO</Button>
                                    </ButtonGroup>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                    })}
                </div>
            </div>
            )
        }
        else if(this.state.modal === true)
        {
            return (
                <Modal show = {this.state.modal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={()=>this.closeModal}>
                        <Modal.Body>
                                Name:<h3>{this.state.info.firstname} {this.state.info.lastname}</h3>
                                Party:<h2 style={{color:'#A0522D'}}>{this.state.info.party}</h2>
                                <h4 style={{color:'#A9A9A9'}}>{this.state.info.description}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className = "btn btn-danger" onClick={this.closeModal}><FontAwesomeIcon icon={faTimes} /> Close</Button>
                        </Modal.Footer>
                        </Modal>
            )
        }
        else
        {
            return (
                <Modal show = {this.state.confirm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={()=>this.closeConfirm}>
                        <Modal.Body>
                                <h3>Are you sure you want to vote?</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className = "btn btn-primary" onClick={() => this.castVote(this.state.id)}><FontAwesomeIcon icon={faCheck} /> Yes</Button>
                            <Button className = "btn btn-danger"onClick={this.closeConfirm}><FontAwesomeIcon icon={faTimes} /> No</Button>
                        </Modal.Footer>
                        </Modal>
            )
        }
    }
}
export default Vote;