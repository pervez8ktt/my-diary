import { Link } from "react-router-dom";
import { Col, Container, Row, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Head = (props) => {


    return <Navbar bg="light" expand="lg">
          <Container>
          <Link className="navbar-brand" to="/">{props.title}</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Link className="nav-link" to="/accounts">Accounts</Link>
                {/* <Link className="nav-link" to="/holiday">Holiday</Link> */}
                <Link className="nav-link" to="/leaves">Leaves</Link>
                <Link className="nav-link" to="/configuration">Configuration</Link>
                <Link className="nav-link" to="/attandance">Attandance</Link>
                
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      
}

export default Head;