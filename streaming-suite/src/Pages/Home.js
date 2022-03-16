import { Card, CardTitle, CardBody, CardText, Col, Row, Container, CardImg, CardSubtitle, CardHeader, CardFooter } from "reactstrap";
import { Button, Form } from "react-bootstrap";
// import Pagination from "react-bootstrap-4-pagination";
import Pagination from "@vlsergey/react-bootstrap-pagination"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayContent from "../Components/DisplayContent";
const axios = require('axios');

function Home() {
    const [results, setResults] = useState([]);
    const [keyword, setKeyword] = useState("Netflix");
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [MovieSeriesSelect, setMovieSeriesSelect] = useState("movie");

    const handleSearch = e => {
        setKeyword(e.target.value);
    };

    const handleMovieSeriesSelect = e => {
        setMovieSeriesSelect(e.target.value);
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
            const response = await axios.get("http://localhost:3090/api/search", { params: { keyword: keyword, type: MovieSeriesSelect.toLocaleLowerCase(), page: page } });
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


    // useEffect(() => fetchResults(), []);
    useEffect(() => fetchResults(), [page]);

    return (
        <Container className="p-3">
            {/* <DisplayContent/> */}
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
            <br />
            <div className="d-flex justify-content-center">
                {/* <Pagination {...paginationConfig} /> */}
                <Pagination firstPageValue={1} value={page} totalPages={totalPages} onChange={handlePaginationChange} />
            </div>
        </Container >

    );
}
export default Home;