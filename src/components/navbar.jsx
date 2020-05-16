import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt,faUserPlus,faHome } from '@fortawesome/free-solid-svg-icons'
import image from './images/favicon.png';
import './formcss.css';
class NavBar extends Component
{
  render()
  {
    return (
      <Navbar className = "topnav" collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
      <img
        alt=""
        src={image}
        width="100"
        height="100"
        className="d-inline-block align-top"
      />{' '}
    </Navbar.Brand>
    <Navbar.Brand href="/" className = "voteon">
        VOTEON
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
          <Nav.Item className = "navitem" ><Nav.Link href="/"><FontAwesomeIcon icon={faHome} /> HOME</Nav.Link></Nav.Item>
      </Nav>
      <Nav className="ml-auto">
          <Nav.Item className = "navitem" ><Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt} /> SIGNIN</Nav.Link></Nav.Item>
          <Nav.Item className = "navitem" ><Nav.Link href="/newaccount"><FontAwesomeIcon icon={faUserPlus} /> SIGNUP</Nav.Link></Nav.Item>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
export default NavBar;