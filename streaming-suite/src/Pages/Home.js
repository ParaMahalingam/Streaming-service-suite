import { Card, CardTitle, CardBody, CardText, Col, Row, Container, CardImg, CardSubtitle, CardHeader, CardFooter } from "reactstrap";

import { Modal, Image } from "react-bootstrap";

import { Button, Form } from "react-bootstrap";
// import Pagination from "react-bootstrap-4-pagination";
import Pagination from "@vlsergey/react-bootstrap-pagination"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require('axios');

function Home() {
    const [results, setResults] = useState([]);
    const [keyword, setKeyword] = useState("Alex");
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [MovieSeriesSelect, setMovieSeriesSelect] = useState("Movie");
    const [PlatformSelect, setPlatformSelect] = useState("Netflix");
    const [show, setShow] = useState(false);
    const [CurrentContent, setCurrentContent] = useState();


    const handleClose = () => setShow(false);

    const handleSearch = e => {
        setKeyword(e.target.value);
    };

    const handleMovieSeriesSelect = e => {
        setMovieSeriesSelect(e.target.value);
    };

    const handlePlatformSelect = e => {
        setPlatformSelect(e.target.value);
    };

    const handlePaginationChange = e => {
        setPage(e.target.value);
        window.scrollTo(0, 0);
    };


    const fetchResults = async e => {
        // console.log(totalPages)
        if (e) {
            e.preventDefault();
            setPage(1);
        }

        try {
            const response = await axios.get("http://localhost:3090/api/search", { params: { keyword: keyword, platform: PlatformSelect.toLocaleLowerCase(), type: MovieSeriesSelect.toLocaleLowerCase(), page: page } });
            setResults((response.data.results))
            if (response.data.total_pages === 0) {
                setTotalPages(1);
            }
            else {
                setTotalPages((response.data.total_pages))

            }
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => fetchResults(), [page]);


    function displayModal(content) {
        setCurrentContent(content)
        setShow(true)
    }

    function renderPlatforms(platform, info) {
        console.log(info.link)
        switch (platform) {
            case 'netflix':
                return <Col><Button variant="outline-danger" onClick={() => { window.open(info.link, "_blank") }}>Netflix</Button></Col>;
            case 'prime':
                return <Col><Button variant="outline-info" onClick={() => { window.open(info.link, "_blank") }}>Prime</Button></Col>;
            case 'disney':
                return <Col><Button variant="outline-primary" onClick={() => { window.open(info.link, "_blank") }}>Disney</Button></Col>;
            case 'apple':
                return <Col><Button variant="outline-secondary" onClick={() => { window.open(info.link, "_blank") }}>Apple</Button></Col>;
            case 'britbox':
                return <Col><Button variant="outline-warning" onClick={() => { window.open(info.link, "_blank") }}>Britbox</Button></Col>;
        }
    }

    function DisplayContents() {
        return (
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{CurrentContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col><Image className="img-fluid" src={CurrentContent.posterURLs[500]} rounded /></Col>
                            <Col>{CurrentContent.overview}</Col>
                        </Row>
                        <br />
                        <strong className="d-flex justify-content-center">STREAMING PLATFORM</strong><br />
                        <div className="d-flex justify-content-center">
                            <Row>
                                {Object.keys(CurrentContent.streamingInfo).map((key, i) => (
                                    <>
                                        {renderPlatforms(key, CurrentContent.streamingInfo[key].gb)}
                                    </>
                                ))}
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Add to Watchlist</Button>
                    {/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        );
    }



    return (
        <Container className="p-3">
            <Row>
                <Form onSubmit={fetchResults}>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <Form.Group className="mb-3">
                                {/* <Form.Label>Search</Form.Label> */}
                                <Form.Control required onChange={handleSearch} value={keyword} type="text" size="lg" placeholder="Search a movie..." />

                            </Form.Group>
                        </Col>

                        <Col sm={2}>
                            <Form.Select size="lg" onChange={handleMovieSeriesSelect}>
                                <option>Movie</option>
                                <option>Series</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col sm={2}>
                            <Form.Select size="lg" onChange={handlePlatformSelect}>
                                <option>Netflix</option>
                                <option>Prime</option>
                                <option>Disney</option>
                                <option>Apple</option>
                                <option>Britbox</option>
                            </Form.Select>
                        </Col>

                        <Col sm={1}>
                            <Button size="lg" variant="primary" type="submit" value="Submit">Submit</Button>
                        </Col>
                    </Row>
                    <br />
                </Form>
            </Row>

            <Row xs={1} md={4} className="g-4">
                {results.map((result) => (
                    <Col>
                        <Card className="card h-100">
                            <CardHeader>{result.title}</CardHeader>
                            <CardImg className="h-100" top src={result.posterURLs[500] ?? "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg"} />
                            <CardBody>
                                <Button variant="primary" onClick={() => { displayModal(result) }}>View</Button>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
                {CurrentContent && <DisplayContents />}
            </Row>
            <br />
            <div className="d-flex justify-content-center">
                <Pagination firstPageValue={1} value={page} totalPages={totalPages} onChange={handlePaginationChange} />
            </div>
        </Container >

    );
}
export default Home;