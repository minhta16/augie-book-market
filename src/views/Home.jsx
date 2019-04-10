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
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

const ITEM_HEIGHT = 48;
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
      finishedPulling: false,
      anchorEl: null
    };
    this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  getDataFromFirebase() {
    this.database.once("value", booksSnapshot => {
      booksSnapshot.forEach(bookSnapshot => {
        var val = bookSnapshot.val();
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
        this.setState({ books: [...this.state.books, book] });
        // etc.
      });
    });
    {
      console.log(this.state.books);
    }
  }

  updateDataFromFirebase() {
    this.database.on("value", booksSnapshot => {
      booksSnapshot.forEach(bookSnapshot => {
        var val = bookSnapshot.val();
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
        this.setState({ books: [...this.state.books, book] });
        // etc.
      });
    });
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

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
    const open = Boolean(this.state.anchorEl);

    const books = this.state.booksQuery
      ? orderBy(
          this.state.books.filter(x => {
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
      : this.state.books.filter(x => x["onSale"]);

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
                  <TableCell>Owner</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books
                  .slice(0)
                  .reverse()
                  .map(book => {
                    return (
                      <TableRow key={book.id}>
                        <TableCell component="th" scope="row">
                          {book.title}
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.owner}</TableCell>
                        <TableCell>{book.price ? book.price : 0}</TableCell>
                        <TableCell>{book.dateCreated}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="More"
                            aria-owns={open ? "long-menu" : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenuClick}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            anchorEl={this.state.anchorEl}
                            open={open}
                            onClose={this.handleMenuClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200
                              }
                            }}
                          >
                            <MenuItem
                              key="Option"
                              onClick={this.handleMenuClose}
                            >
                              Option
                            </MenuItem>
                            ))}
                          </Menu>
                        </TableCell>
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
