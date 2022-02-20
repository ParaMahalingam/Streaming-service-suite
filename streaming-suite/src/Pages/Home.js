import { Card, CardTitle, CardBody, CardText, Col, Row, Container, CardImg, CardSubtitle, CardHeader, CardFooter } from "reactstrap";
import { Button, Form, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require('axios');

function Home() {
    const [results, setResults] = useState([]);
    const [keyword, setKeyword] = useState("Netflix");
    const [MovieSeriesSelect, setMovieSeriesSelect] = useState("movie");

    const handleSearch = e => {
        setKeyword(e.target.value);
    };

    const handleMovieSeriesSelect = e => {
        setMovieSeriesSelect(e.target.value);
    };


    const fetchResults = async e => {
        if (e) {
            e.preventDefault();
        }

        try {
            const response = await axios.get("http://localhost:3090/api/search", { params: { keyword: keyword, type: MovieSeriesSelect.toLocaleLowerCase() } });
            setResults((response.data.results))
        } catch (error) {
            console.error(error);
        }

    };
    // async function fetchResultsFirstTime() {
    //     try {
    //         const response = await axios.get("http://localhost:3090/api/search?keyword=" + keyword)
    //         setResults((response.data.results))
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => fetchResults(), []);

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



                        <Col sm={1}>
                            <Button size="lg" variant="primary" type="submit" value="Submit">Submit</Button>
                        </Col>
                    </Row>

                </Form>
            </Row>

            <Row xs={1} md={4} className="g-4">
                {results.map((result) => (

                    <Col>
                        <Card className="card h-100">
                            <CardHeader>{result.title}</CardHeader>
                            <CardImg className="h-100" top src={result.posterURLs[500] ?? "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg"} />
                            <CardBody>
                                {/* <CardTitle><strong>{result.title}</strong></CardTitle> */}
                                {/* <CardSubtitle><strong>Description</strong></CardSubtitle> */}
                                {/* <CardText>{result.overview}</CardText> */}
                                <Button>Button</Button>
                            </CardBody>
                            <CardFooter>
                                {/* {
                                     result.streamingInfo
                                } */}
                                {/* {result.streamingInfo().map((x) => (
                                    console.log(x)
                                ))} */}
                            </CardFooter>
                        </Card>
                        {console.log(result.streamingInfo)}
                    </Col>
                ))}

            </Row>


        </Container >

    );
}
export default Home;