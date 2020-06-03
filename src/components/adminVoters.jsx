import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
class AdminVoters extends Component
{
    constructor()
    {
        super();
        this.state = {states:[],districts:[],state:"Andhra Pradesh",district:'Anantpur',voter:[{}]};
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
        axios.post(`http://localhost:8000/admin/voter`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "NoVoter")
            this.setState({voter:[]});
            else
            this.setState({voter:res.data})
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
    getVoters = (event) =>
    {
        event.preventDefault();
        this.setState({state:event.target.state.value,district:event.target.district.value});
        axios.post(`http://localhost:8000/admin/voter`,{state:event.target.state.value,district:event.target.district.value},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "NoVoter")
            this.setState({voter:[]});
            else
            this.setState({voter:res.data});
        })
    }
    deleteVoter = (id) =>
    {
        axios.post(`http://localhost:8000/admin/deleteVoter`,{data:{id:id}},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            axios.post(`http://localhost:8000/admin/voter`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
            {
                if(res.data === "NoVoter")
                this.setState({voter:[]});
                else
                this.setState({voter:res.data});
            })
            alert('Voter Deleted')
        })
    }
    addVoter = (event) =>
    {
        event.preventDefault();
        var regName =  /^[a-zA-Z]+$/; 
        if(!regName.test(document.getElementById('firstname').value))
        {
            alert('Invalid FirstName')
        }
        else
        {
            if(!regName.test(document.getElementById('lastname').value))
            {
                alert('Invalid LastName');
            }
            else if(document.getElementById('VoterID').value.length!==10)
            {
                alert('Length of VoterID should be 10')
            }
            else
            {
                axios.post(`http://localhost:8000/admin/AddVoter`,{
                    firstname:document.getElementById('firstname').value,
                    lastname:document.getElementById('lastname').value,
                    VoterID:document.getElementById('VoterID').value,
                    email:document.getElementById('email').value,
                    state:this.state.state,
                    district:this.state.district
                },{headers : {'authorization' : localStorage.token}}).then(res=>
                    {
                        if(res.data === "error")
                        alert('This Voter Already exists')
                        else
                        {
                            axios.post(`http://localhost:8000/admin/voter`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
                            {
                                if(res.data === "NoVoter")
                                this.setState({voter:[]});
                                else
                                this.setState({voter:res.data});
                            })
                            alert("Voter Added")
                        }
                    })
            }
        }
    }
    render()
    {
        if(this.state.voter.length>0)
        return (
            <div>
                <div className="container">
                <form className = "offset-lg-3 offset-sm-3 offset-md-3" onSubmit={this.getVoters}>
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
                    <tbody>{this.state.voter.map((u)=>{
                    return <tr>
                    <td>{u.VoterID}</td>
                    <td>{u.email}</td>
                    <td><Button onClick={()=>this.deleteVoter(u._id)}className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/> DELETE</Button></td>
                </tr>
            })}</tbody></Table></div>
            <div className = "container">
            <form onSubmit={this.addVoter}>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                < label htmlFor="firstname">FirstName</label>
                <input type="name" className="form-control" id="firstname" placeholder="FirstName"  required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                < label htmlFor="lastname">LastName</label>
                <input type="name" className="form-control" id="lastname" placeholder="LastName"  required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="VoterID">Voter ID</label>
                <input type="text" className="form-control" id="VoterID" placeholder="VoterID" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="email">Email ID</label>
                <input type="email" className="form-control" id="email" placeholder="e.g.abc@gmail.com" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            <Button type="submit" className="offset-md-3 offset-lg-3 offset-md-3"><FontAwesomeIcon icon={faPlus}/> ADD VOTER</Button>
            </form>
            </div>
            </div>
        )
        else
        return (
            <div>
                <div className="container">
                <form className = "offset-lg-3 offset-sm-3 offset-md-3" onSubmit={this.getVoters}>
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
                <div className = "container">
                <form onSubmit={this.addVoter}>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    < label htmlFor="firstname">FirstName</label>
                    <input type="name" className="form-control" id="firstname" placeholder="FirstName"  required></input>
                </div>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    < label htmlFor="lastname">LastName</label>
                    <input type="name" className="form-control" id="lastname" placeholder="LastName"  required></input>
                </div>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    <label htmlFor="VoterID">Voter ID</label>
                    <input type="text" className="form-control" id="VoterID" placeholder="VoterID" aria-describedby="inputGroupPrepend2" required></input>
                </div>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    <label htmlFor="email">Email ID</label>
                    <input type="email" className="form-control" id="email" placeholder="e.g.abc@gmail.com" aria-describedby="inputGroupPrepend2" required></input>
                </div>
                <Button type="submit" className="offset-md-3 offset-lg-3 offset-md-3"><FontAwesomeIcon icon={faPlus}/> ADD VOTER</Button>
                </form>
                </div>
            </div>
        )
    }
}
export default AdminVoters