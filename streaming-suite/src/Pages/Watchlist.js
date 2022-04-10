import { Outlet, Link, useNavigate } from "react-router-dom";
// import { Container, Table, Input, Row, Col } from 'reactstrap';
import { Card, CardTitle, CardBody, CardText, Col, Row, Container, CardImg, CardSubtitle, CardHeader, CardFooter, Button } from "reactstrap";
import { useEffect, useState } from "react";
const axios = require('axios');

function Watchlist() {

    const [watchList, setWatchList] = useState([]);

    async function fetchWatchList() {
        try {
            const response = await axios.get("http://localhost:3090/api/watchlist/user/" + 1)
            setWatchList(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteTitle(id) {
        try {
            const response = await axios.get("http://localhost:3090/api/watchlist/delete/" + id)
            fetchWatchList()

        } catch (error) {
            console.error(error)
        }
    }

    async function markasSeen(id) {
        try {
            const response = await axios.get("http://localhost:3090/api/watchlist/seen/" + id)
            fetchWatchList()

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => fetchWatchList(), [])

    return (
        <Container fluid="md" className="p-3">

            <h1 class="display-1">Not Seen</h1>
            <Row xs={1} md={4} className="g-4">

                {watchList.map((result) => (
                    result.Seen === 0
                        ? (
                            <Col>
                                <Card className="card h-100">
                                    <CardHeader>{result.Title} ({result.Platform})</CardHeader>
                                    <CardImg className="h-100" top src={result.Poster} />
                                    <CardBody className="h-100">{result.Description}</CardBody>
                                    <CardFooter>
                                        <Row>
                                            <Col>
                                                <Button color="primary" onClick={() => window.open(result.Link, "_blank")}>Watch</Button>
                                            </Col>
                                            <Col>
                                                <Button color="success" onClick={() => markasSeen(result.ID)}>Seen</Button>
                                            </Col>
                                            <Col>
                                                <Button color="danger" onClick={() => deleteTitle(result.ID)}>Delete</Button>
                                            </Col>
                                        </Row>

                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                        : null
                ))}
            </Row>
            <h1 class="display-1">Seen</h1>
            <Row xs={1} md={4} className="g-4">
                {watchList.map((result) => (
                    result.Seen === 1
                        ? (
                            <Col>
                                <Card className="card h-100">
                                    <CardHeader>{result.Title} ({result.Platform})</CardHeader>
                                    <CardImg className="h-100" top src={result.Poster} />
                                    <CardBody className="h-100">{result.Description}</CardBody>
                                    <CardFooter>
                                        <Row>
                                            <Col>
                                                <Button color="primary" onClick={() => window.open(result.Link, "_blank")}>Watch</Button>
                                            </Col>
                                            <Col>
                                                <Button color="danger" onClick={() => deleteTitle(result.ID)}>Delete</Button>
                                            </Col>
                                        </Row>

                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                        : null
                ))}
            </Row>

        </Container>
    )
};

export default Watchlist;