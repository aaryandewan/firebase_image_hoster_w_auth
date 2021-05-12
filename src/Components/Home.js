import React, { useEffect, useState } from "react";
import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { projectStorage } from "../firebase";

export default function Home() {
  var storageRef = projectStorage.ref("images");
  //   var listRef = storageRef.child("images/");
  const [imagesArray, setImagesArray] = useState([]);

  const promises = [];

  useEffect(() => {
    let tempImagesArray = [];
    promises.push(
      storageRef
        .listAll()
        .then((res) => {
          res._delegate.items.forEach(function (imageRef) {
            // console.log(imageRef._location.path_);
            projectStorage
              .ref(imageRef._location.path_)
              .getDownloadURL()
              .then((url) => {
                tempImagesArray.push(url);
                // setImagesArray((oldArr) => [...oldArr, url]);
              });
          });
        })
        .then((ress) => {
          console.log(tempImagesArray.length);
          console.log("state array is ", imagesArray);
          console.log("temp images array is  ", tempImagesArray);
        })
        .catch((err) => {
          console.log(err);
        })
    );
    console.log("Promises are", promises);
    Promise.all(promises).then((results) => {
      console.log("All done");
      // setImagesArray(tempImagesArray);
      tempImagesArray.forEach((linkk) => {
        setImagesArray([...imagesArray, linkk]);
        setImagesArray([tempImagesArray]);
      });
      // for (var i = 0; i < tempImagesArray.length; i++) {
      //   setImagesArray((oldArr) => [...oldArr, tempImagesArray[i]]);
      // }
      console.log(imagesArray);
    });

    //This array contains ALL the images in the images storage bucket. Now display it :)
  }, []);

  return (
    <>
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

      <Container>
        <Row>
          <Col style={{ backgroundColor: "pink" }} class="col-12 text-center">
            <h1>Image Displayer</h1>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4">
          {imagesArray.map((image) => {
            <img src={image}></img>;
          })}
          {/* <Col style={{ backgroundColor: "pink" }} class="col-12 text-center">
            <h1>Image Displayer</h1>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}
