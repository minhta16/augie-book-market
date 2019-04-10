import React, { Component } from "react";
// import AppBar from "./layouts/AppBar.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "typeface-roboto";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  render() {
    const hist = createBrowserHistory();
    return (
      <div className="App">
        <Router history={hist} basename={process.env.PUBLIC_URL}>
          <Switch>
            <Redirect exact from="/" to="/home" />
          </Switch>
          <MainLayout history={hist} />
        </Router>
      </div>
    );
  }
}

export default App;
