import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './formcss.css';
class Candidate extends Component
{
    constructor()
    {
        super();
        this.state = {loading:false,list:[{}],modal:false,info:''};
    }
    componentDidMount()
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
    modalHandle = (a,b,c,d) =>
    {
        var y = {firstname:a,lastname:b,party:c,description:d}
        var x = this.state.modal;
        this.setState({modal:!x,info:y});
    }
    render()
    {
        if(localStorage.getItem('token') === null)
        {
            return <Redirect to="/login"></Redirect>
        }
        if(this.state.loading === false)
        {
            return (
                <div style={{marginLeft:"600px",marginTop:"200px"}}>
                    <Spinner animation="border" role="status" size="lg">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        else if(this.state.modal === false)
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
                            <div className = "col-md-7">
                                <h3>{item.firstname} {item.lastname}</h3>
                                <h2 style={{color:'#A0522D'}}>{item.party}</h2>
                            </div>
                            <div className = "col-md-3"><br/><br/>
                                <button onClick={()=>this.modalHandle(item.firstname,item.lastname,item.party,item.description)} className="btn btn-danger"><FontAwesomeIcon icon={faInfoCircle}/> GET INFO</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    })}
                </div>
            </div>
            )
        }
        else
        {
            return (
                <Modal show = {this.state.modal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={()=>this.modalHandle}>
                        <Modal.Body>
                                Name:<h3>{this.state.info.firstname} {this.state.info.lastname}</h3>
                                Party:<h2 style={{color:'#A0522D'}}>{this.state.info.party}</h2>
                                <h4 style={{color:'#A9A9A9'}}>{this.state.info.description}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className = "btn btn-danger"onClick={this.modalHandle}><FontAwesomeIcon icon={faTimes} /> Close</Button>
                        </Modal.Footer>
                        </Modal>
            )
        }
    }
}
export default Candidate;