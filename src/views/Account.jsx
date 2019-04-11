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
  MenuItem
} from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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
    marginTop: theme.spacing.unit * 2
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
      userBooks: []
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
  }
  getDataFromFirebase() {
    this.database.once("value", booksSnapshot => {
      booksSnapshot.forEach(bookSnapshot => {
        var val = bookSnapshot.val();
        if (val.owner === firebase.auth().currentUser.displayName) {
          var book = {
            id: bookSnapshot.key,
            title: val.title,
            author: val.author,
            price: val.price,
            owner: val.owner,
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
                Manage your listing
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
                          <TableCell>{book.owner}</TableCell>
                          <TableCell>{book.price ? book.price : 0}</TableCell>
                          <TableCell>{book.dateCreated}</TableCell>
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
