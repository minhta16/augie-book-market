import React, { Component } from "react";
// import AppBar from "./layouts/AppBar.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import { createHashHistory } from "history";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import "typeface-roboto";
import "./App.css";
import { createMuiTheme, withTheme } from "@material-ui/core/styles";
import { indigo, yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: yellow
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }
  //process.env.PUBLIC_URL
  render() {
    const hist = createHashHistory({
      basename: process.env.PUBLIC_URL
    });
    return (
      <div className="App">
        <Router history={hist}>
          <Switch>
            <Redirect exact from="/" to="/home" />
          </Switch>
          <MainLayout history={hist} />
        </Router>
      </div>
    );
  }
}

export default withTheme(theme)(App);
