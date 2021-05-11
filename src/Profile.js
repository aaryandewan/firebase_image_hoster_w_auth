import React, { useRef } from "react";
import { useAuth } from "./context/AuthContext";
import { Col, InputGroup, FormControl, Button, Form } from "react-bootstrap/";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  var user = firebase.auth().currentUser;
  const history = useHistory();
  const nameRef = useRef();
  const imageRef = useRef();

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

  return (
    <div>
      <Button variant="link" onClick={handleLogout}>
        Log Out
      </Button>
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
