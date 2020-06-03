import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle, faPoll } from '@fortawesome/free-solid-svg-icons'
class AdminResult extends Component
{
    constructor()
    {
        super();
        this.state = {states:[],state:"Andhra Pradesh",districts:[]};
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8000/admin/getStates`,{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            this.setState({states:res.data});
        })
        axios.post(`http://localhost:8000/admin/getDistricts`,{state:this.state.state},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            this.setState({districts:res.data})
        })
    }
    changeState = () =>
    {
        this.setState({state:document.getElementById('state').value});
        axios.post(`http://localhost:8000/admin/getDistricts`,{state:document.getElementById('state').value},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            this.setState({districts:res.data})
        })
    }
    declare = (district) =>
    {
        axios.post(`http://localhost:8000/admin/declareResult`,{state:this.state.state,district:district},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "Result Already Declared")
            alert("Result Already Declared")
            else alert("Result Declared for " + district);
        })
    }
    refresh = (district) =>
    {
        axios.post(`http://localhost:8000/admin/refresh`,{state:this.state.state,district:district},{headers : {'authorization' : localStorage.token}})
        alert("Elections Refreshed in " + district);
    }
    render()
    {
        return (
            <div>
                <div className="container">
                <select onChange={this.changeState} id = "state" style={{width:'250px',height:'50px'}}className="mdb-select md-form offset-md-4 offset-lg-4 offset-sm-4">{this.state.states.map((state)=>
                    {
                        return <option>{state}</option>
                    })}
                </select>
                </div>
                <div className="container">
                <Table striped bordered hover>
                    <tbody>{this.state.districts.map((u)=>{
                    return <tr>
                    <td>{u}</td>
                    <td><Button onClick={()=>this.declare(u)}className="btn btn-danger"><FontAwesomeIcon icon={faPoll}/> DECLARE</Button></td>
                    <td><Button onClick={()=>this.refresh(u)}className="btn btn-danger"><FontAwesomeIcon icon={faRecycle}/> REFRESH</Button></td>
                </tr>
            })}</tbody></Table></div>
            </div>
        )
    }
}
export default AdminResult