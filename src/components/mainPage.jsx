import React,{Component} from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
//import './externalcss.css';
import Login from './login.jsx';
import NavBar from './navbar.jsx';
import NavBar1 from './navbar1.jsx';
import PageNotFound from './pagenotfound.jsx';
import Home from './home.jsx';
import LogOutButton from './button1.jsx';
import NewAccount from './newaccount.jsx';
import Profile from './profile.jsx';
import Admin from './admin.jsx';
import AdminHome from './adminHome.jsx'
import Candidate from './candidate';
import Result from './result';
import Vote from './vote';
import OTP from './otp';
class MainPage extends Component
{
    constructor()
    {
        super();
        this.state = {"login":"false"};
    }
    nature = (a) =>
    {
        this.setState({login:a});
    }
    render()
    {
        if(localStorage.getItem('login') === "true")
            return (
                <BrowserRouter>
                    <div className="fixed">
                        <NavBar1/>
                        <LogOutButton/>
                    </div>
                    <Switch>
                        <Route exact path='/' render={(props)=><Home/>}></Route>
                        <Route exact path="/login" render={(props)=><Login nature={this.nature}/>}></Route>
                        <Route exact path="/newaccount" render={(props)=><NewAccount />}></Route>
                        <Route exact path="/profile" render={(props)=><Profile/>}></Route>
                        <Route exact path="/candidate" render={(props)=><Candidate/>}></Route>
                        <Route exact path="/result" render={(props)=><Result/>}></Route>
                        <Route exact path="/otp" render={(props)=><OTP/>}></Route>
                        <Route exact path="/vote" render={(props)=><Vote/>}></Route>
                        <Route exact path="/admin" render={(props)=><Admin nature={this.nature}/>}></Route>
                        <Route exact path='/adminHome' render={(props)=><AdminHome/>}></Route>
                        <Route render={()=><PageNotFound/>}></Route>
                    </Switch>
                </BrowserRouter>
            )
        else
            return (
                <BrowserRouter>
                    <div className="fixed">
                        <NavBar/>
                    </div>
                    <Switch>
                        <Route exact path='/'render={(props)=><Home/>}></Route>
                        <Route exact path="/login" render={(props)=><Login nature={this.nature}/>}></Route>
                        <Route exact path="/newaccount" render={(props)=><NewAccount />}></Route>
                        <Route exact path="/candidate" render={(props)=><Candidate/>}></Route>
                        <Route exact path="/result" render={(props)=><Result/>}></Route>
                        <Route exact path="/vote" render={(props)=><Vote/>}></Route>
                        <Route exact path="/otp" render={(props)=><OTP{...props}/>}></Route>
                        <Route exact path="/admin" render={(props)=><Admin nature={this.nature}/>}></Route>
                        <Route exact path='/adminHome' render={(props)=><AdminHome/>}></Route>
                        <Route render={()=><PageNotFound/>}></Route>
                    </Switch>
                </BrowserRouter>
            )
    }
}
export default MainPage;