import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import firebase from "../firebase";
import {
  TableCell,
  TableRow,
  Divider,
  Table,
  TableHead,
  TableBody,
  Paper,
  Select,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  IconButton
} from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import SearchBar from "../components/SearchBar";

import orderBy from "lodash/orderBy";

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 200
  }
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.props = props;
    this.database = firebase
      .database()
      .ref()
      .child("books");

    this.state = {
      isSignedIn: false,
      number: 0,
      name: "",
      userBooks: [],
      openDeleteConfirm: false,
      snackopen: false
    };
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    };
    this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeteleBtn = this.handleDeteleBtn.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.openSnackbar = this.openSnackbar.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
  }
  getDataFromFirebase() {
    this.setState({
      userBooks: []
    });
    this.database.once("value", booksSnapshot => {
      booksSnapshot.forEach(bookSnapshot => {
        var val = bookSnapshot.val();
        if (val.owner === firebase.auth().currentUser.displayName) {
          var book = {
            id: bookSnapshot.key,
            title: val.title,
            author: val.author,
            price: val.price,
            condition: val.condition,
            owner: val.owner,
            ownerUID: val.ownerUID,
            ownerPhotoURL: val.ownerPhotoURL,
            onSale: val.onSale,
            isbn10: val.isbn10,
            isbn13: val.isbn13,
            dateCreated: val.dateCreated
          };
          this.setState({ userBooks: [...this.state.userBooks, book] });
        }
        // etc.
      });
    });
  }

  handleDeteleBtn() {
    this.setState({
      openDeleteConfirm: true
    });
  }

  handleDialogClose() {
    this.setState({
      openDeleteConfirm: false
    });
  }

  handleDelete(book) {
    firebase
      .database()
      .ref(`/books/${book.id}`)
      .remove()
      .then(() => {
        console.log(book.id);
      })
      .catch(error => {
        console.log("Error: " + error.message);
      });
    this.getDataFromFirebase();
  }

  pushToFirebase(reference, object) {
    const ref = firebase.database().ref(reference);
    ref.push(object);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.finishedPulling &&
      (Array.isArray(this.state.userBooks) && this.state.userBooks.length)
    ) {
      this.setState({ finishedPulling: true });
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      });
      this.forceUpdate();
    });
    this.getDataFromFirebase();
    this.componentDidUpdate();
  }

  handleSnackClose() {
    this.setState({
      snackopen: true
    });
  }
  openSnackbar() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.snackopen}
        autoHideDuration={6000}
        onClose={this.handleSnackClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Listing deleted</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={this.classes.close}
            onClick={this.handleSnackClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }

  openDialog(book) {
    return (
      <Dialog
        open={this.state.openDeleteConfirm}
        onClose={this.handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.handleDelete(book);
              this.handleDialogClose();
              this.setState({
                snackopen: true
              });
            }}
            color="primary"
          >
            Confirm
          </Button>
          <Button onClick={this.handleDialogClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  render() {
    const userBooks = this.state.booksQuery
      ? orderBy(
          this.state.userBooks.filter(x => {
            return (
              (x["title"]
                .toLowerCase()
                .includes(this.state.booksQuery.toLowerCase()) ||
                x["author"]
                  .toLowerCase()
                  .includes(this.state.booksQuery.toLowerCase()) ||
                x["isbn10"]
                  .toLowerCase()
                  .includes(this.state.booksQuery.toLowerCase()) ||
                x["isbn13"]
                  .toLowerCase()
                  .includes(this.state.booksQuery.toLowerCase())) &&
              x["onSale"]
            );
          })
        )
      : this.state.userBooks;

    return (
      <div>
        {this.state.isSignedIn ? (
          <div>
            <Paper className={this.classes.root}>
              <Typography
                variant="h2"
                style={{ padding: "20px 20px", textAlign: "left" }}
              >
                Listing Manager
              </Typography>
              <SearchBar
                onKeyUp={e => {
                  this.setState({ booksQuery: e.target.value });
                }}
                placeholder="Search"
              />

              <Divider className={this.classes.divider} />
              <Table className={this.classes.table}>
                <TableHead className={this.classes.head}>
                  <TableRow>
                    <TableCell />
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userBooks
                    .slice(0)
                    .reverse()
                    .map(book => {
                      return (
                        <TableRow key={book.id}>
                          <TableCell>
                            <Select
                              value={book.onSale}
                              onChange={e => {
                                book.onSale = e.target.value;
                                firebase
                                  .database()
                                  .ref("books")
                                  .update({
                                    [book.id]: {
                                      ...book,
                                      onSale: book.onSale
                                    }
                                  });
                                this.forceUpdate();
                              }}
                              displayEmpty
                              name="onSale"
                              className={this.classes.selectEmpty}
                            >
                              <MenuItem value={true}>
                                <Typography style={{ color: "#4caf50" }}>
                                  Available
                                </Typography>
                              </MenuItem>
                              <MenuItem value={false}>
                                <Typography style={{ color: "#ff1744" }}>
                                  Sold
                                </Typography>
                              </MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {book.title}
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>
                            <Grid
                              container
                              spacing={24}
                              justify="center"
                              alignItems="center"
                            >
                              <Grid item xs={3}>
                                {book.ownerPhotoURL ? (
                                  <img
                                    src={book.ownerPhotoURL}
                                    alt={`${book.owner} avatar`}
                                    style={{
                                      height: 24,
                                      width: 24,
                                      borderRadius: 12
                                    }}
                                  />
                                ) : (
                                  <PersonIcon />
                                )}
                              </Grid>
                              <Grid item xs={9}>
                                {book.owner}
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell>{book.price ? book.price : 0}</TableCell>
                          <TableCell>{book.dateCreated}</TableCell>
                          <TableCell>
                            <Button onClick={this.handleDeteleBtn}>
                              <Typography style={{ color: "#f44336" }}>
                                Delete
                              </Typography>
                            </Button>
                            {this.openDialog(book)}
                            {this.openSnackbar()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : (
          <div>
            <Typography variant="body1">
              You are not signed in. Please sign in to join the market!
            </Typography>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Account);
