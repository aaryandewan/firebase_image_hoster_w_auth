import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  Button,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { projectStorage } from "../firebase";
import firebase from "firebase";

export default function Home() {
  const { currentUser, logout } = useAuth();
  var storageRef = projectStorage.ref("images");
  //   var listRef = storageRef.child("images/");
  const [imagesArray, setImagesArray] = useState([]);
  var user = firebase.auth().currentUser;
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  }

  const promises = [];

  useEffect(() => {
    console.log("rendering");
    let tempImagesArray = [];
    storageRef
      .listAll()
      .then((res) => {
        res._delegate.items.forEach(function (imageRef) {
          projectStorage
            .ref(imageRef._location.path_)
            .getDownloadURL()
            .then((url) => {
              //url is the URL of an image in the database. I have checked, IT is correct
              tempImagesArray.push(url);
              setImagesArray([...imagesArray, ...tempImagesArray]);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // setImagesArray([...imagesArray, ...tempImagesArray]);
    console.log("Temp images arr is", tempImagesArray); //["https://firebase....","https://firebase....", "https://firebase...."]
    console.log("Main images state arr is ", imagesArray); //[]
  }, []);

  const sendToProfile = () => {
    history.push("/");
  };

  useEffect(() => {
    console.log("Changed");
    console.log("The entire image arrays is ", imagesArray);
    console.log("index 0 is ", imagesArray[0]);
    console.log("Length of array is ", imagesArray.length);
  }, [imagesArray]);

  return (
    <>
      {!user && (
        <Navbar bg="dark" variant="dark">
          <Nav className="collapse navbar-collapse justify-content-end">
            <div>
              <Link to="./signup">
                <Button variant="outline-info" style={{ marginRight: "5px" }}>
                  Sign Up
                </Button>
              </Link>
            </div>
            <Link to="./login">
              <Button variant="outline-info" style={{ marginRight: "5px" }}>
                Log In
              </Button>
            </Link>
          </Nav>
        </Navbar>
      )}
      {user && (
        <Navbar bg="dark" variant="dark">
          <Nav className="collapse navbar-collapse justify-content-end">
            <div>
              <Button
                // onClick={history.push("/")}
                onClick={sendToProfile}
                variant="outline-info"
                style={{ marginRight: "5px" }}
              >
                My Profile
              </Button>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline-info"
              style={{ marginRight: "5px" }}
            >
              Sign Out
            </Button>
          </Nav>
        </Navbar>
      )}

      <Container>
        <Row className="mb-4 mt-4">
          <Col
            className="col-12 text-center"
            style={{ backgroundColor: "white" }}
          >
            {/* <Button variant="primary">Your Photos</Button> */}
            <Alert variant="primary">
              <h2>All photos</h2>
            </Alert>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4">
          {imagesArray.map((image) => {
            console.log("loggingg");
            return (
              <Col className="mb-4 mr-4">
                <img
                  src={image}
                  className="img-fluid"
                  style={{ width: "400px", height: "300px" }}
                ></img>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
