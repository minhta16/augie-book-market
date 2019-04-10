//https://material-ui.com/demos/cards/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import firebase from "../firebase";

// https://material-ui.com/demos/expansion-panels/
const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    margin: "auto"
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
}))(MuiExpansionPanelDetails);

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    textAlign: "left"
  },
  cover: {
    width: 170,
    height: 280
  },
  selectDiv: {
    display: "inline-block"
  },
  expansionPanel: {
    width: "100%"
  }
});

class BookCard extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    this.state = {
      price: 0,
      date: date,
      open: false
    };
    this.props = props;
    this.onClickHandler = this.onClickHandler.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
  }

  pushToFirebase(reference, object) {
    const ref = firebase.database().ref(reference);
    ref.push(object);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.price !== prevState.price) {
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onClickHandler(e) {
    e.preventDefault();
    const props = this.props;
    this.pushToFirebase("books", {
      onSale: true,
      title: props.title,
      author: props.author ? props.author : "",
      isbn10: props.isbn10 ? props.isbn10 : "",
      isbn13: props.isbn13 ? props.isbn13 : "",
      snippet: props.snippet ? props.snippet : "",
      thumbnail: props.thumbnail ? props.thumbnail : "",
      price: this.state.price,
      owner: firebase.auth().currentUser.displayName,
      dateCreated: this.state.date
    });
    console.log(this.state.price);
    this.setState({ open: true });
  }
  render() {
    const { classes } = this.props;
    const props = this.props;
    return (
      <Card className={classes.card}>
        <ExpansionPanel
          id="expansion-panel"
          square
          className={classes.expansionPanel}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={8}>
              <Grid item>
                <CardMedia
                  className={classes.cover}
                  image={props.thumbnail}
                  title={props.title}
                />
              </Grid>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Grid item xs={12}>
                    <Typography component="h5" variant="h5">
                      {props.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {props.author}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {props.snippet}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      ISBN10: {props.isbn10}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      ISBN13: {props.isbn13}
                    </Typography>
                  </Grid>
                </CardContent>
              </div>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={8}>
              <Grid item xs={3}>
                <TextField
                  id="price"
                  label="Price"
                  className={classes.input}
                  placeholder={props.placeholder}
                  onKeyUp={e => {
                    this.setState({ price: e.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                  onClick={this.onClickHandler}
                >
                  Upload Listing
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* https://material-ui.com/demos/snackbars/ */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Listing created</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Card>
    );
  }
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(BookCard);
