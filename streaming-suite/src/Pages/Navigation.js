import { Outlet, Link, useNavigate } from "react-router-dom";
import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText } from "reactstrap";
function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);
    let navigate = useNavigate();

    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                fixed=""
                light
            >
                <NavbarBrand href='/'>Streaming Suite</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem><NavLink href="/">Home</NavLink></NavItem>
                        <NavItem><NavLink href="/watchlist">My Watchlist</NavLink></NavItem>
                        <NavItem><NavLink href="/admin">Admin</NavLink></NavItem>
                        <NavItem><NavLink href="/login">Login</NavLink></NavItem>
                        <NavItem><NavLink href="/chat">Chat</NavLink></NavItem>
                    </Nav>
                </Collapse>

            </Navbar>
            <Outlet />
        </div>

    )
};

export default Navigation;