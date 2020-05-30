import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
class Result extends Component
{
    constructor()
    {
        super();
        this.state = {datasets:[{}],loading:false,label:[],list:[{}]};
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
                {
                    var label = [];
                    var color = [];
                    for(var i = 0;i<res.data.length;i++)
                    label[i] = res.data[i].firstname + " " + res.data[i].lastname + " (" + res.data[i].party + ")"
                    var votes = []
                    for(var i = 0;i<res.data.length ; i++)
                    {
                        color[i] = '#' + Math.random().toString(16).substr(-6);
                        votes[i] = res.data[i].votes;
                    }
                    var datasets = [{data:votes,backgroundColor:color}];
                    this.setState({loading:true,result:true,list:res.data,label:label,datasets:datasets});
                }
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
                <div>
                    <Pie data={{labels:this.state.label,datasets:this.state.datasets}} height='90%'/>
                </div>
            )
        }
    }
}
export default Result;