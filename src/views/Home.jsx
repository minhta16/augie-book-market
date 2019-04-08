// https://material-ui.com/demos/tables/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import firebase from "../firebase";

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
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.database = firebase
      .database()
      .ref()
      .child("books");
    this.state = {
      books: []
    };
    this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
  }
  getDataFromFirebase() {
    var data = [];
    this.database.on("value", snapshot => {
      this.database.once("value", booksSnapshot => {
        booksSnapshot.forEach(bookSnapshot => {
          var val = bookSnapshot.val();
          var book = {
            id: bookSnapshot.key,
            name: val.name,
            author: val.author,
            price: val.price,
            owner: val.owner
          };
          data.push(book);
          // etc.
        });
      });
    });
    this.setState({ books: data });
  }
  async componentWillMount() {
    this.getDataFromFirebase();
  }

  render() {
    const books = this.state.books;
    return (
      <Paper className={this.classes.root}>
        <Table className={this.classes.table}>
          <TableHead className={this.classes.head}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell component="th" scope="row">
                  {book.name}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.owner}</TableCell>
                <TableCell>{book.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
