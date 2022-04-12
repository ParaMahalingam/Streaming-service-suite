import { Row, Container } from "reactstrap";
import { Button, Form, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require('axios');

function Register() {

    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = async e => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3090/api/user/add", { Name: name, Username: username, Password: password })
            if (response.data.insertID) {
                alert("User has been created, you may login now!")
                navigate("/login");
            }
            else {
                alert("There was an error!")
            }
        } catch (error) {
            console.error(error);
        }

    };
    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== null) navigate("/watchlist")
    }, [])
    return (
        <Container className="p-3">
            <Row className="justify-content-center">
                <Form className="col-md-4" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>


        </Container>

    );
}
export default Register;