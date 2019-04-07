import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import AppBar from "./layouts/AppBar.jsx";
import SideBar from "./layouts/SideBar.jsx";
import { List, ListItem, Switch, AppBar, CssBaseline } from "@material-ui/core";
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
    return (
      <div className="App">
        <SideBar />
      </div>
    );
  }
}

export default App;
