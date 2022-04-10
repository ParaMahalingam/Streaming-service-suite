import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container, Table, Input, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, FormGroup } from 'reactstrap';
import { useEffect, useState } from "react";
const axios = require('axios');

function Admin() {

    const [userList, setUserList] = useState([]);
    const [filtereduserlist, setFilteredUserList] = useState([]);
    const [username, setUsername] = useState('')
    const [passwordChangeUserID, setPasswordChangeUserID] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);

    const handleModal = () => setShow(!show);

    async function fetchUserList() {
        try {
            const response = await axios.get("http://localhost:3090/api/users")
            setUserList(response.data)
            setFilteredUserList(response.data)

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
            const response = await axios.get("http://localhost:3090/api/ban", { params: { UserID: id, BanType: type } })
            fetchUserList()

        } catch (error) {
            console.error(error);
        }
    }

    async function updatePassword() {
        try {
            const response = await axios.post("http://localhost:3090/api/updatepassword", { Password: password, ID: passwordChangeUserID })
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </Container>
    )
};

export default Admin;