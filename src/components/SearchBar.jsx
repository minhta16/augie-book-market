import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: "6px 6px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  searchdiv: {
    position: "relative",
    float: "right"
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 28,
    height: 1,
    margin: 4
  }
});
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
  }

  render() {
    return (
      <div>
        <div className={this.classes.searchdiv}>
          <Input
            className={this.classes.input}
            onKeyUp={e => this.props.onKeyUp(e)}
            placeholder={this.props.placeholder}
          />
          <IconButton
            className={this.classes.iconButton}
            onClick={e => this.props.onClick(e)}
            aria-label="Search"
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
