import { Row, Container } from "reactstrap";
import { Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require('axios');

function Login() {

    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = async e => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3090/api/login", { Username: username, Password: password })
            if (response.data.loggedIn) {
                localStorage.setItem('loggedIn', true);
                navigate("/watchlist");
            }
            else {
                setShow(true);
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Container className="p-3">
            <Row className="justify-content-center">
                <Form className="col-md-4" onSubmit={handleSubmit}>
                    <Alert show={show} variant='danger' className="text-center">You have entered an invalid username or password</Alert>
                    <h2>Login</h2>
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
export default Login;