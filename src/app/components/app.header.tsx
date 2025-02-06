'use client';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AppHeader = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link
            href="/"
            className="navbar-brand">
            Home page
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <Link
              className="nav-link"
              href={'/facebook'}>
              Facebook
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
