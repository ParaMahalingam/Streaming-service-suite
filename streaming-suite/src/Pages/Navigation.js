import { Outlet, Link, useNavigate } from "react-router-dom";
import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText } from "reactstrap";
function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);
    let navigate = useNavigate();

    function clearStorage() {
        localStorage.clear()
        navigate("/login")

    }
    function loginButton() {
        if (localStorage.getItem('loggedIn') !== null) {
            return (
                <NavbarText>
                    <button type='button' className='btn btn-outline-dark' onClick={clearStorage}>Log Out</button>
                </NavbarText>
            )
        }
        else {
            return (
                <NavbarText>
                    <Link to='/login'>
                        <button type='button' className='btn btn-outline-dark'>Login</button>
                    </Link>
                </NavbarText>
            )
        }
    }

    function loggedIn() {
        if (localStorage.getItem('loggedIn') !== null) {
            return (
                <>
                    <NavItem><NavLink href="/watchlist">My Watchlist</NavLink></NavItem>
                </>
            )
        }
    }

    function AdminUser() {
        if (localStorage.getItem('Role') === "Admin") {
            return (
                <NavItem><NavLink href="/admin">Admin</NavLink></NavItem>
            )
        }
    }

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
                        {loggedIn()}
                        {AdminUser()}
                    </Nav>
                </Collapse>

                {loginButton()}
            </Navbar >
            <Outlet />
        </div >

    )
};

export default Navigation;