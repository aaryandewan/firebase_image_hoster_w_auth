import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./privateRoute";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Profile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
