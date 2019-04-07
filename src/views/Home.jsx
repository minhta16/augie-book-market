import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Typography paragraph>This is home!</Typography>
        <Typography paragraph>This is another paragraph home</Typography>
      </div>
    );
  }
}

export default Home;
