import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
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
          <InputBase
            className={this.classes.input}
            onChange={e => this.props.onChange(e)}
            placeholder="Search"
          />
          <IconButton className={this.classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
          <Divider className={this.classes.divider} />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);