import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import SignUp from "./SignUp";
import PrivateRoute from "./privateRoute";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Profile} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
