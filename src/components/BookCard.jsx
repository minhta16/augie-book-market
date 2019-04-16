//https://material-ui.com/demos/cards/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  ExpansionPanel as MuiExpansionPanel,
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  ExpansionPanelDetails as MuiExpansionPanelDetails,
  TextField,
  Snackbar,
  IconButton
} from "@material-ui/core";
import CurrencyInput from "react-currency-masked-input";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoneyIcon from "@material-ui/icons/AttachMoney";

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
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140
  },
  input: {
    minWidth: 140,
    textIndent: 40
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
      open: false,
      dialogOpen: false,
      condition: ""
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.handleDialogClickOpen = this.handleDialogClickOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
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

  handleDialogClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  onClickHandler(e) {
    e.preventDefault();
    if (!this.state.price) {
      this.setState({
        dialogOpen: true
      });
    } else {
      const props = this.props;
      this.pushToFirebase("books", {
        onSale: true,
        title: props.title,
        author: props.author ? props.author : "",
        isbn10: props.isbn10 ? props.isbn10 : "",
        isbn13: props.isbn13 ? props.isbn13 : "",
        snippet: props.snippet ? props.snippet : "",
        thumbnail: props.thumbnail ? props.thumbnail : "",
        price: "$ " + parseFloat(this.state.price).toFixed(2),
        // TODO: implement condition
        condition: this.state.condition,
        owner: firebase.auth().currentUser.displayName,
        ownerUID: firebase.auth().currentUser.uid,
        ownerPhotoURL: firebase.auth().currentUser.photoURL,
        ownerEmail: firebase.auth().currentUser.email,
        dateCreated: this.state.date
      });
      this.setState({ open: true });
    }
  }
  render() {
    const { classes } = this.props;
    const props = this.props;
    const dialog = (
      <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You haven't enter a price. Please enter a price!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary" autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    );

    const conditions = [
      "New",
      "Renewed",
      "Used - Like New",
      "Used - Very Good",
      "Used - Good",
      "Used - Acceptable"
    ];
    return (
      <Card className={classes.card}>
        {dialog}
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
            <Grid
              container
              spacing={8}
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={2}>
                {/* https://github.com/mui-org/material-ui/issues/2932 */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <MoneyIcon
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 15,
                      width: 20,
                      height: 20,
                      color: "#9e9e9e"
                    }}
                  />
                  <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    className={classes.input}
                    placeholder={props.placeholder}
                    style={{ textIndent: 0 }}
                    onKeyUp={e => {
                      this.setState({ price: e.target.value });
                    }}
                    //https://stackoverflow.com/questions/48723887/mask-textfield-component-in-material-ui?noredirect=1&lq=1
                    InputProps={{
                      inputComponent: CurrencyInput
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="condition"
                  select
                  label="Condition"
                  className={classes.formControl}
                  value={this.state.condition}
                  onChange={e =>
                    this.setState({
                      condition: e.target.value
                    })
                  }
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Select your book condition"
                  margin="normal"
                  variant="outlined"
                >
                  {conditions.map(value => {
                    return (
                      <MenuItem value={value}>
                        <Typography>{value}</Typography>
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={2}>
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
