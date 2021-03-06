import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import  {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faHome,faPoll } from '@fortawesome/free-solid-svg-icons'
import image from './images/favicon.png';
import './formcss.css';
class NavBar1 extends Component
{
    constructor()
    {
        super();
        this.state = {click:false};
    }
    logout = () =>
    {
        localStorage.clear();
        this.setState({click:true});
    }
  render()
  {
      if(this.state.click === true)
      {
          return <Redirect to='/goHome'></Redirect>
      }
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
      <img
        alt=""
        src={image}
        width="100"
        height="100"
        className="d-inline-block align-top"
      />{' '}
    </Navbar.Brand>
    <Navbar.Brand href="/" className="voteon">
        VOTEON
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
          <Nav.Item className = "navitem"><Nav.Link href="/"><FontAwesomeIcon icon={faHome} /> HOME</Nav.Link></Nav.Item>
          <Nav.Item className = "navitem"><Nav.Link href="/candidate">CANDIDATES</Nav.Link></Nav.Item>
          <Nav.Item className = "navitem"><Nav.Link href="/vote">VOTE</Nav.Link></Nav.Item>
          <Nav.Item className = "navitem"><Nav.Link href="/result"><FontAwesomeIcon icon={faPoll} /> RESULT</Nav.Link></Nav.Item>
      </Nav>
      <Nav className="ml-auto">
          <Nav.Item className = "navitem"><Nav.Link href="/profile"><FontAwesomeIcon icon={faUser} /> PROFILE</Nav.Link></Nav.Item>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
export default NavBar1;