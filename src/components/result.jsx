import React,{Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
class Result extends Component
{
    constructor()
    {
        super();
        this.state = {loading:false,list:[{}]};
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8000/getResult`,{
            headers : {
                'authorization' : localStorage.token
            }
        }).then(res=>
            {
                if(res.data === "Result Not Declared")
                this.setState({loading:true,result:false});
                else
                this.setState({loading:true,result:true,list:res.data});
            })
    }
    render()
    {
        if(localStorage.getItem('token') === null)
        {
            return <Redirect to="/login"></Redirect>
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
        else if(this.state.result === false)
        {
            return (
                <div className = "text-center">
                <p style={{fontSize:"80px",color:"grey"}}><b> RESULTS ARE NOT DECLARED YET!</b></p>
            </div>
            )
        }
        else
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
                            <div className = "col-md-9">
                                <h3>{item.firstname} {item.lastname}</h3>
                                <h2 style={{color:'#A0522D'}}>{item.party}</h2>
                                <h4 style={{color:'#A9A9A9'}}>VOTES: {item.votes}</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                    })}
                </div>
            </div>
            )
        }
    }
}
export default Result;