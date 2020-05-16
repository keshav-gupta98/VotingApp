import {Redirect} from 'react-router-dom';
import React,{Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEdit,faTimes } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
class Profile extends Component
{
    constructor()
    {
        super();
        this.state = {
            person:{},
            loading:false,
            modal:false
        };
        
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8000/profile`,{
            headers : {
                'authorization' : localStorage.token
            }
        }).then(res =>
        {
            this.setState({person:res.data,loading:true});
            console.log(this.state)
        })
    }
    showModal = () =>
    {
        this.setState({modal:true})
    }
    changePassword = (event) =>
    {   
        event.preventDefault();
        var str = this.refs.newp.value;
        if(str.match(/[a-z]/g) && str.match(/[A-Z]/g) && str.match(/[0-9]/g) && str.length >= 8)
        {
            if(this.refs.newp.value === this.refs.conp.value)
            {
                const y ={"pass":this.refs.newp.value};
                axios.post(`http://localhost:8000/changePassword`,{data:y },
                {
                    headers : {'authorization' : localStorage.token}
                }).then(res =>{ alert(res.data); })
            }
            else
            {
                alert('Password do not match');
            }
        }
        else
        {
            alert("Please Match the required pattern")
        }
    }
    modalClose =() => this.setState({modal:false}); 
    render()
    {
        if(localStorage.getItem('token') === null)
        {
            return (
                <Redirect to="/login"/>
            )
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
        else
        {
            return (
            <div className = "container">
                <div className="row">
                    <div className = "mb-1 col-md-3 col-lg-3 col-sm-10">
                    <FontAwesomeIcon icon={faUser} size="10x" />
                    <Button className = "btn btn-outline-dark btn-light" onClick = {this.showModal} style={{marginTop:"1rem"}}><FontAwesomeIcon icon={faEdit}/> Edit Password</Button>
                    <Modal  show = {this.state.modal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={()=>this.modalClose}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="Password">New Password:</label>
                            <input type="password" placeholder = "New Password" ref="newp" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Password should be greater than 8 characters,must contain at least 1 lower case,upper case,number"></input>
                        <label htmlFor="Confirm">Confirm Password:</label>
                            <input type="password" placeholder = "Confirm Password" ref="conp" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></input>
                    </Modal.Body>
                    <Modal.Footer>
                            <button className="btn btn-outline-dark btn-light" onClick={(event) => this.changePassword(event)}>Change Password</button>
                            <Button className = "btn btn-danger"onClick={this.modalClose}><FontAwesomeIcon icon={faTimes} /> Close</Button>
                    </Modal.Footer>
                </Modal>
                    </div>
                    <div className = "mb-1 col-md-3 col-lg-6 col-sm-10">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>FirstName:</td>
                                    <td>{this.state.person.firstname}</td>
                                </tr>
                                <tr>
                                    <td>LastName:</td>
                                    <td>{this.state.person.lastname}</td>
                                </tr>
                                <tr>
                                    <td>VoterID:</td>
                                    <td>{this.state.person.VoterID}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{this.state.person.email}</td>
                                </tr>
                                <tr>
                                    <td>State:</td>
                                    <td>{this.state.person.state}</td>
                                </tr>
                                <tr>
                                    <td>District:</td>
                                    <td>{this.state.person.district}</td>
                                </tr>
                                <tr>
                                    <td>Voted:</td>
                                    <td>{this.state.person.voted}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )
        }
    }
}
export default Profile;