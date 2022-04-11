import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container, Table, Input, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, FormGroup } from 'reactstrap';
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
const axios = require('axios');

function Admin() {
    let navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [userList, setUserList] = useState([]);
    const [filtereduserlist, setFilteredUserList] = useState([]);
    const [username, setUsername] = useState('')
    const [passwordChangeUserID, setPasswordChangeUserID] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);
    const [adshow, setadShow] = useState(false);
    const [adTitle, setadTitle] = useState('')
    const [adImage, setadImage] = useState('')
    const [adDescription, setadDescription] = useState('')

    const handleModal = () => setShow(!show);
    const handleadModal = () => setadShow(!show);

    async function fetchUserList() {
        try {
            const response = await axios.get("http://localhost:3090/api/users")
            setUserList(response.data)
            setFilteredUserList(response.data)

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchAds() {
        try {
            const response = await axios.get("http://localhost:3090/api/advert/all")
            setAds(response.data)

        } catch (error) {
            console.error(error);
        }
    }


    async function addAdvert() {
        try {
            const response = await axios.post("http://localhost:3090/api/advert/add", { Title: adTitle, ImageLink: adImage, Description: adDescription })
            if (response.data.insertID) {
                setadShow(false)
                fetchAds()
            }
            else {
                alert("There was an error!")
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function searchUsers(query) {
        const filtered = userList.filter(user => {
            return user.Username.toLowerCase().includes(query.toLowerCase())
        })
        setUsername(query)
        setFilteredUserList(filtered)
    }

    async function banUnbanUser(id, type) {
        try {
            const response = await axios.get("http://localhost:3090/api/user/ban", { params: { UserID: id, BanType: type } })
            fetchUserList()

        } catch (error) {
            console.error(error);
        }
    }

    async function deleteUser(id) {
        try {
            const response = await axios.get("http://localhost:3090/api/user/delete/" + id)
            fetchUserList()

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteAd(id) {
        try {
            const response = await axios.get("http://localhost:3090/api/advert/delete/" + id)
            fetchAds()

        } catch (error) {
            console.error(error)
        }
    }

    async function updatePassword() {
        try {
            const response = await axios.post("http://localhost:3090/api/user/updatepassword", { Password: password, ID: passwordChangeUserID })
            if (response.data.completed) {
                fetchUserList()
                setPassword('')
                setPasswordChangeUserID('')
                setShow(false)
            }
            else {
                alert("There was an error!")
            }
        } catch (error) {
            console.error(error);
        }

    }


    useEffect(() => fetchUserList(), [])
    useEffect(() => fetchAds(), [])

    useEffect(() => {
        if (localStorage.getItem('Role') !== "Admin") navigate("/")
    }, [])

    return (
        <Container fluid="md" className="p-3">

            <Modal isOpen={show} backdrop='static' keyboard={false}>
                <ModalHeader toggle={handleModal}>
                    Changing Password for User: {passwordChangeUserID}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="labelpassword">New Password</Label>
                        <Input type="text" id="newpassword" placeholder="Enter new password..." onChange={e => { setPassword(e.target.value) }} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updatePassword}>Change</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={adshow} backdrop='static' keyboard={false}>
                <ModalHeader toggle={handleadModal}>
                    New Advert
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="labeltitle">Title</Label>
                        <Input type="text" id="title" placeholder="Title..." onChange={e => { setadTitle(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="labeltitle">Image Link</Label>
                        <Input type="text" id="imagelink" placeholder="Image..." onChange={e => { setadImage(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="labeldescription">Description</Label>
                        <Input type="text" id="description" placeholder="Description..." onChange={e => { setadDescription(e.target.value) }} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addAdvert}>Create</Button>
                </ModalFooter>
            </Modal>

            <h1 className="display-6">USERS</h1>
            <Row>
                <Col>Search By Username<Input id='username' value={username} onChange={e => searchUsers(e.target.value)} /></Col>
            </Row>
            <div className='table-responsive'>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Banned</th>
                            <th>Ban / Unban</th>
                            <th>Change Password</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {filtereduserlist.map((user, i) => (
                            <tr key={i}>
                                <td>{user.ID}</td>
                                <td>{user.Name}</td>
                                <td>{user.Username}</td>
                                <td>{user.Password}</td>
                                <td>{user.Role}</td>
                                <td>{user.Banned === 1 ? 'True' : 'False'}</td>
                                <td><button onClick={() => { user.Banned ? banUnbanUser(user.ID, 0) : banUnbanUser(user.ID, 1) }} className={user.Banned ? 'btn btn-success' : 'btn btn-danger'}>{user.Banned ? 'Unban' : 'Ban'}</button></td>
                                <td><button onClick={() => { setPasswordChangeUserID(user.ID); setShow(true) }} className="btn btn-primary">Change</button></td>
                                <td><button onClick={() => { deleteUser(user.ID) }} className="btn btn-secondary">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <br />
            <h1 className="display-6">Advertisements</h1>
            <button className="btn btn-primary" onClick={() => { setadShow(true) }} >Create</button>
            <div className='table-responsive'>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>ImageLink</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {ads.map((ad, i) => (
                            <tr key={i}>
                                <td>{ad.ID}</td>
                                <td>{ad.Title}</td>
                                <td><Image className="img-thumbnail" style={{ width: 250 }} src={ad.ImageLink} rounded /></td>
                                <td>{ad.Description}</td>
                                <td><button onClick={() => { deleteAd(ad.ID) }} className="btn btn-secondary">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
};

export default Admin;