import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
class AdminCandidate extends Component
{
    constructor()
    {
        super();
        this.state = {states:[],districts:[],state:"Andhra Pradesh",district:'Anantpur',candidate:[{}]};
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8000/admin/getStates`,{headers : {'authorization' : localStorage.token}}
        ).then(res=>
        {
            this.setState({states:res.data});
        })
        axios.post(`http://localhost:8000/admin/getDistricts`,{state:this.state.state},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            this.setState({districts:res.data})
        })
        axios.post(`http://localhost:8000/admin/candidate`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "NoCandidate")
            this.setState({candidate:[]});
            else
            this.setState({candidate:res.data})
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
    getCandidates = (event) =>
    {
        event.preventDefault();
        this.setState({state:event.target.state.value,district:event.target.district.value});
        axios.post(`http://localhost:8000/admin/candidate`,{state:event.target.state.value,district:event.target.district.value},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            if(res.data === "NoCandidate")
            this.setState({candidate:[]});
            else
            this.setState({candidate:res.data});
        })
    }
    deleteCandidate = (id) =>
    {
        axios.post(`http://localhost:8000/admin/deleteCandidate`,{data:{id:id}},{headers : {'authorization' : localStorage.token}}).then(res=>
        {
            axios.post(`http://localhost:8000/admin/candidate`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
            {
                if(res.data === "NoCandidate")
                this.setState({candidate:[]});
                else
                this.setState({candidate:res.data});
            })
            alert('Candidate Deleted')
        })
    }
    addCandidate = (event) =>
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
            else if(!regName.test(document.getElementById('party').value))
            {
                alert('Invalid Party')
            }
            else
            {
                axios.post(`http://localhost:8000/admin/AddCandidate`,{
                    firstname:document.getElementById('firstname').value,
                    lastname:document.getElementById('lastname').value,
                    party:document.getElementById('party').value,
                    description:document.getElementById('description').value,
                    state:this.state.state,
                    district:this.state.district
                },{headers : {'authorization' : localStorage.token}}).then(res=>
                    {
                        axios.post(`http://localhost:8000/admin/candidate`,{state:this.state.state,district:this.state.district},{headers : {'authorization' : localStorage.token}}).then(res=>
                        {
                            if(res.data === "NoCandidate")
                            this.setState({candidate:[]});
                            else
                            this.setState({candidate:res.data});
                        })
                        alert("Candidate Added")
                    })
            }
        }
    }
    render()
    {
        if(this.state.candidate.length>0)
        return (
            <div>
                <div className="container">
                <form className = "offset-lg-3 offset-sm-3 offset-md-3" onSubmit={this.getCandidates}>
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
                        <th>NAME</th>
                        <th>PARTY</th>
                        <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.candidate.map((u)=>{
                    return <tr>
                    <td>{u.firstname} {u.lastname}</td>
                    <td>{u.party}</td>
                    <td><Button onClick={()=>this.deleteCandidate(u._id)}className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/> DELETE</Button></td>
                </tr>
            })}</tbody></Table></div>
            <div className = "container">
            <form onSubmit={this.addCandidate}>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                < label htmlFor="firstname">FirstName</label>
                <input type="name" className="form-control" id="firstname" placeholder="FirstName"  required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                < label htmlFor="lastname">LastName</label>
                <input type="name" className="form-control" id="lastname" placeholder="LastName"  required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="party">Party</label>
                <input type="text" className="form-control" id="party" placeholder="Party" aria-describedby="inputGroupPrepend2" required></input>
            </div>
            <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" placeholder="Enter Some Description..." aria-describedby="inputGroupPrepend2" required></textarea>
            </div>
            <Button type="submit" className="offset-md-3 offset-lg-3 offset-md-3"><FontAwesomeIcon icon={faPlus}/> ADD CANDIDATE</Button>
            </form>
            </div>
            </div>
        )
        else
        return (
            <div>
                <div className="container">
                <form className = "offset-lg-3 offset-sm-3 offset-md-3" onSubmit={this.getCandidates}>
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
                <form onSubmit={this.addCandidate}>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    < label htmlFor="firstname">FirstName</label>
                    <input type="name" className="form-control" id="firstname" placeholder="FirstName"  required></input>
                </div>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    < label htmlFor="lastname">LastName</label>
                    <input type="name" className="form-control" id="lastname" placeholder="LastName"  required></input>
                </div>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    <label htmlFor="party">Party</label>
                    <input type="text" className="form-control" id="party" placeholder="Party" aria-describedby="inputGroupPrepend2" required></input>
                </div>
                <div className="offset-md-3 offset-lg-3 offset-sm-2 col-md-6 col-lg-6 col-sm-5">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" placeholder="Enter Some Description..." aria-describedby="inputGroupPrepend2" required></textarea>
                </div>
                <Button type="submit" className="offset-md-3 offset-lg-3 offset-md-3"><FontAwesomeIcon icon={faPlus}/> ADD CANDIDATE</Button>
                </form>
                </div>
            </div>
        )
    }
}
export default AdminCandidate