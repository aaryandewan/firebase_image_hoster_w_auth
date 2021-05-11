import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Row, Col, Alert } from "react-bootstrap";
import { db } from "./firebase";
import { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [signedUp, setSignedUp] = useState("");
  const history = useHistory();

  const formHandler = async (e) => {
    console.log(emailRef.current.value);
    e.preventDefault();

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      setSignedUp("Your account is made!");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container
        className="border border-dark"
        style={{ backgroundColor: "white", height: "300px", width: "400px" }}
      >
        <Row className="h-100">
          {signedUp && <Alert variant="success">{signedUp}</Alert>}

          <Col className=" my-auto">
            <Form onSubmit={formHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
