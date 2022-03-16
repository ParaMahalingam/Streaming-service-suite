import { React, useState } from "react";
import { Button, Modal, Row, Col, Container, Image } from "react-bootstrap";

const DisplayContent = ({ }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Mr. & Mrs. Smith</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col><Image className="img-fluid" src="https://image.tmdb.org/t/p/w500/wzIO3ytxeSNt1wRpXLIdkNbGoDm.jpg" rounded /></Col>
                        <Col>After five (or six) years of vanilla-wedded bliss, ordinary suburbanites John and Jane Smith are stuck in a huge rut. Unbeknownst to each other, they are both coolly lethal, highly-paid assassins working for rival organisations. When they discover they're each other's next target, their secret lives collide in a spicy, explosive mix of wicked comedy, pent-up passion, nonstop action and high-tech weaponry.</Col>
                    </Row>
                    <br/>
                    <strong className="d-flex justify-content-center">STREAMING PLATFORM</strong><br/>
                    <div className="d-flex justify-content-center">
                        <Row>
                            <Col><Button variant="outline-danger">Netflix</Button></Col>
                            <Col><Button variant="outline-info">Prime</Button></Col>
                            <Col><Button variant="outline-primary">Disney</Button></Col>
                            <Col><Button variant="outline-secondary">Apple</Button></Col>
                            {/* <Col><Button variant="outline-warning">Britbox</Button></Col> */}
                        </Row>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Add to Watchlist</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DisplayContent