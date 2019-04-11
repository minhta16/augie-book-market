import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

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
            onKeyUp={this.props.onKeyUp}
            placeholder={this.props.placeholder}
          />
          <IconButton
            className={this.classes.iconButton}
            onClick={this.props.onClick}
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
