import { Outlet, Link, useNavigate } from "react-router-dom";
import { Card, CardTitle, CardBody, CardText, Col, Row, Container, CardImg, CardSubtitle, CardHeader, CardFooter, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
const axios = require('axios');

function Watchlist() {

    const [watchList, setWatchList] = useState([]);
    const [ads, setAds] = useState([]);
    let navigate = useNavigate();


    async function fetchAds() {
        try {
            const response = await axios.get("http://localhost:3090/api/advert/all")
            setAds(response.data)

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchWatchList() {
        try {
            const response = await axios.get("http://localhost:3090/api/watchlist/user/" + localStorage.getItem('ID'))
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
    useEffect(() => fetchAds(), [])
    useEffect(() => {
        if (localStorage.getItem('loggedIn') == null) navigate("/")
    }, [])
    return (
        <Container fluid="md" className="p-3">

            <Row className="justify-content-center">

                {ads.map((ad, i) => (
                    <Col sm={4}>
                        <Image className="img-thumbnail" style={{ width: 500 }} src={ad.ImageLink} rounded />
                    </Col>
                ))}


            </Row>

            <h1 className="display-1">Not Seen</h1>
            <Row xs={1} md={4} className="g-4">

                {watchList.map((result, i) => (
                    result.Seen === 0
                        ? (
                            <Col key={i}>
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
            <h1 className="display-1">Seen</h1>
            <Row xs={1} md={4} className="g-4">
                {watchList.map((result, i) => (
                    result.Seen === 1
                        ? (
                            <Col key={i}>
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