import { Card, CardTitle, CardBody, CardText, Col, Row, Container, CardImg, CardSubtitle, CardHeader } from "reactstrap";
import { Button, Form, Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require('axios');

function Home() {
    const [results, setResults] = useState([]);

    async function fetchResults() {
        try {
            const response = await axios.get("http://localhost:3090/api/test")
            setResults((response.data.results))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => fetchResults(), []);

    return (
        <Container className="p-3">
            <Row className="justify-content-center">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Search</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="name@example.com" />
                    </Form.Group>
                </Form>
            </Row>
            <Row xs={1} md={4} className="g-4">
                {results.map((result) => (
                    <Col>
                        <Card>
                        <CardHeader>{result.title}</CardHeader>
                            <CardImg width="750" height="450"className="img-responsive" src={result.posterURLs[500]} />
                            <CardBody>
                                {/* <CardTitle><strong>{result.title}</strong></CardTitle> */}
                                {/* <CardSubtitle><strong>Description</strong></CardSubtitle> */}
                                {/* <CardText>{result.overview}</CardText> */}
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}

            </Row>
        </Container>

    );
}
export default Home;