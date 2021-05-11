import React from "react";
import { Row, Col, Alert, Form, Button, Container } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [signedUp, setSignedUp] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");

  const formHandler = async (e) => {
    console.log(emailRef.current.value);
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Your passwords do not match.");
      passwordRef.current.value = "";
      passwordConfirmRef.current.value = "";
      return;
    }

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      setSignedUp("Your account is made!");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      style={{ backgroundColor: "white", height: "100vh", width: "50vh" }}
    >
      <div style={{ marginTop: "40%" }}>
        <Row
          className="justify-content-center mb-3 my-auto"
          style={{ backgroundColor: "white" }}
        >
          <Col
            className="col-4 text-center"
            style={{ backgroundColor: "white" }}
          >
            <h1 style={{ fontSize: "120%" }}>Sign Up</h1>
          </Col>
        </Row>
        <Row>
          {signedUp && <Alert variant="success">{signedUp}</Alert>}

          <Col className=" my-auto border border-primary rounded ">
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
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 mb-2">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          {error && <Alert variant="danger">{error}</Alert>}
        </Row>
      </div>
    </Container>
  );
}
