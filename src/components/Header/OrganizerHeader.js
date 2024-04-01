import React from "react";
import { Navbar, Nav, Container, Form, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function OrganizerHeader() {
  return (
    <Form.Group className="mb-5">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand>
              <Link to={"/"} style={{ textDecoration: "none", color: "White" }}>
                Evently
              </Link>
            </Navbar.Brand>
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown
                title={
                  <span>
                    <i class="fas fa-clipboard-list" /> TASKS
                  </span>
                }
                id="TASKS"
              >
                <LinkContainer to="">
                  <NavDropdown.Item>List Tasks</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="">
                  <NavDropdown.Item>New Tasks</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown
                title={
                  <span>
                    <i class="fas fa-users" /> Admin Menu
                  </span>
                }
                id="adminmenu"
              >
                <LinkContainer to="">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="">
                  <NavDropdown.Item>Statistics</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="">
                  <NavDropdown.Item>Add User </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Nav.Link
                href="/login"
                style={{ textDecoration: "none", color: "White" }}
              >
                <span>
                  <i class="fas fa-sign-out-alt" /> Logout
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Form.Group>
  );
}

export default OrganizerHeader;
