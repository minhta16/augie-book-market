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

import orderBy from "lodash/orderBy";
import firebase from "../firebase";
import SearchBar from "../components/SearchBar.jsx";
import { Divider } from "@material-ui/core";

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
      books: [],
      booksQuery: "",
      finishedPulling: false
    };
    this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
  }

  getDataFromFirebase() {
    this.database.on("value", snapshot => {
      this.database.once("value", booksSnapshot => {
        booksSnapshot.forEach(bookSnapshot => {
          var val = bookSnapshot.val();
          var book = {
            id: bookSnapshot.key,
            title: val.title,
            author: val.author,
            price: val.price,
            owner: val.owner
          };
          this.setState({ books: [...this.state.books, book] });
          // etc.
        });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.finishedPulling &&
      (Array.isArray(this.state.books) && this.state.books.length)
    ) {
      this.setState({ finishedPulling: true });
    }
  }

  componentDidMount() {
    this.getDataFromFirebase();
    this.componentDidUpdate();
  }

  render() {
    const books = this.state.booksQuery
      ? orderBy(
          this.state.books.filter(x => {
            return (
              x["title"]
                .toLowerCase()
                .includes(this.state.booksQuery.toLowerCase()) ||
              x["author"]
                .toLowerCase()
                .includes(this.state.booksQuery.toLowerCase())
            );
          })
        )
      : this.state.books;

    return (
      //https://material-ui.com/demos/text-fields/

      !this.state.finishedPulling ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Paper className={this.classes.root}>
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
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(book => {
                  return (
                    <TableRow key={book.id}>
                      <TableCell component="th" scope="row">
                        {book.title}
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.price}</TableCell>
                      <TableCell>{book.owner}</TableCell>
                      <TableCell>{book.id}</TableCell>
                    </TableRow>
                  );
                })}
                {console.log(books)}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
