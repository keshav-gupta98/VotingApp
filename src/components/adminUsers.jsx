import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTrash } from '@fortawesome/free-solid-svg-icons'
class AdminUser extends Component
{
    constructor()
    {
        super();
        this.state = {states:[],districts:[],state:"Andhra Pradesh",district:'Anantpur',user:[{}]};
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
        axios.post(`http://localhost:8000/admin/user`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "NoUser")
            this.setState({user:[]});
            else
            this.setState({user:res.data})
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
    getUsers = (event) =>
    {
        event.preventDefault();
        this.setState({state:event.target.state.value,district:event.target.district.value});
        axios.post(`http://localhost:8000/admin/user`,{state:event.target.state.value,district:event.target.district.value},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "NoUser")
            this.setState({user:[]});
            else
            this.setState({user:res.data});
        })
    }
    deleteUser = (id) =>
    {
        axios.post(`http://localhost:8000/admin/deleteuser`,{data:{id:id}},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            axios.post(`http://localhost:8000/admin/user`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
            {
                if(res.data === "NoUser")
                this.setState({user:[]});
                else
                this.setState({user:res.data});
            })
            alert('User Deleted')
        })
    }
    render()
    {
        if(this.state.user.length>0)
        return (
            <div>
                <div className="container">
                <form className = "offset-lg-3 offset-sm-3 offset-md-3" onSubmit={this.getUsers}>
                <select onChange={this.changeState} id = "state" style={{width:'250px',height:'50px'}}className="mdb-select md-form">{this.state.states.map((state)=>
                    {
                        return <option>{state}</option>
                    })}
                </select>
                <select style={{width:'250px',height:'50px',marginLeft:'4px'}} id="district" className="mdb-select md-form">{this.state.districts.map((d)=>
                {
                    return <option>{d}</option>
                })}>
                </select>
                <Button type="submit" className="btn btn-danger" style={{marginLeft:'4px'}}><FontAwesomeIcon icon={faSearch} /> Search</Button>
                </form>
                </div>
                <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>VOTERID</th>
                        <th>Email</th>
                        <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.user.map((u)=>{
                    return <tr>
                    <td>{u.VoterID}</td>
                    <td>{u.email}</td>
                    <td><Button onClick={()=>this.deleteUser(u._id)}className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/> DELETE</Button></td>
                </tr>
            })}</tbody></Table></div>
            </div>
        )
        else
        return (
            <div>
                <div className="container">
                <form className = "offset-lg-3 offset-sm-3 offset-md-3" onSubmit={this.getUsers}>
                <select onChange={this.changeState} id = "state" style={{width:'250px',height:'50px'}}className="mdb-select md-form">{this.state.states.map((state)=>
                    {
                        return <option>{state}</option>
                    })}
                </select>
                <select style={{width:'250px',height:'50px',marginLeft:'4px'}} id="district" className="mdb-select md-form">{this.state.districts.map((d)=>
                {
                    return <option>{d}</option>
                })}>
                </select>
                <Button type="submit" className="btn btn-danger" style={{marginLeft:'4px'}}><FontAwesomeIcon icon={faSearch} /> Search</Button>
                </form>
                </div>
            </div>
        )
    }
}
export default AdminUser