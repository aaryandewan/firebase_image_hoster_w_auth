import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Col,
  InputGroup,
  FormControl,
  Button,
  Form,
  Nav,
  Navbar,
  Alert,
} from "react-bootstrap/";
import { Link, useHistory } from "react-router-dom";
import { projectStorage } from "../firebase";

import firebase from "firebase";

export default function Profile() {
  const [file, setFile] = useState("");
  const { currentUser, logout } = useAuth();
  var user = firebase.auth().currentUser;
  const history = useHistory();
  const nameRef = useRef();
  const imageRef = useRef();
  const [error, setError] = useState("");
  const uid = user.uid;
  var storageRef = projectStorage.ref();
  let db = firebase.firestore();

  async function handleLogout() {
    try {
      await logout();
      history.push("/signup");
    } catch (error) {
      console.log(error);
    }
  }
  async function formHandler() {
    try {
      user
        .updateProfile({
          displayName: nameRef.current.value,
          photoURL: imageRef.current.value,
        })
        .then(() => {
          console.log("CHANGED!!!");
        });
    } catch (error) {
      console.log(error);
    }
  }
  //the below fn uploads the image to the db

  const photoUploadHandler = (e) => {
    let selectedFile = e.target.files[0];
    console.log("handler");
    setFile(selectedFile);
    console.log(selectedFile.name);
    console.log("File name issss", file.name);

    const allowedTypes = ["image/png", "image/jpeg"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);

      var spaceRef = storageRef.child(`images/${selectedFile.name}`);

      let uploadTask = spaceRef.put(selectedFile).then((snapshot) => {
        console.log("Uploaded a blob or file!");

        projectStorage
          .ref(`/images/${selectedFile.name}`)
          .getDownloadURL()
          .then((url) => {
            // Do something with the URL ...
            console.log("Url of the file is ", url);
            db.collection("users")
              .doc(uid)
              .collection("photos")
              .add({
                imgURL: url,
              })
              .then(() => {
                console.log("image added successfully");
              })
              .catch((error) => {
                console.log("error occured", error);
              });

            //edit above this

            // setCounter(a + 1);
          });
      });
    } else {
      console.log("ERRRRRRRR");
      setError("Please select only JPEG or PNG files");
    }
  };

  return (
    <div>
      {console.log(user.uid)}
      <Navbar bg="dark" variant="dark">
        <Nav className="collapse navbar-collapse justify-content-end">
          <div>
            <input
              type="file"
              class="custom-file-input"
              id="inputGroupFile01"
              onChange={photoUploadHandler}
            />
            <Button variant="outline-info" style={{ marginRight: "5px" }}>
              Upload a photo
            </Button>
          </div>
          <Button variant="outline-info" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar>
      <h5>{error && <Alert variant="danger">{error}</Alert>}</h5>
      {console.log(user.displayName)}
      <Form onSubmit={formHandler}>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Name
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Jane Doe"
              ref={nameRef}
            />
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Image URL
            </Form.Label>
            <InputGroup className="mb-2">
              <FormControl id="inlineFormInputGroup" ref={imageRef} />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
      {user.displayName}
      <img src={user.photoURL}></img>
    </div>
  );
}
