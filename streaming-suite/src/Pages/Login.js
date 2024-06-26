import { Row, Container } from "reactstrap";
import { Button, Form, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
const axios = require('axios');

function Login() {

    // if (localStorage.getItem('loggedIn') !== null) {
    //     alert("Already logged in!")
    // }

    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = async e => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3090/api/user/login", { Username: username, Password: password })
            if (response.data.loggedIn) {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('ID', response.data.ID);
                localStorage.setItem('Name', response.data.Name);
                localStorage.setItem('Username', response.data.Username);
                localStorage.setItem('Role', response.data.Role);
                navigate("/");
            }
            else {
                setShow(true);
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
                    <Alert show={show} variant='danger' className="text-center">You have entered an invalid username or password</Alert>
                    <h2>Login</h2>
                    <div style={{ textAlign: "center" }}><Link to="/register">Click here to register</Link></div>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    </Form.Group>                
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Row>


        </Container>

    );
}
export default Login;