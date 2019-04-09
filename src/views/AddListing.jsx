import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Typography,
  Divider,
  Grid,
  ButtonBase,
  Button
} from "@material-ui/core";

import { Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "../components/SearchBar";
import AutoCompleteField from "../components/AutoCompleteField";
import BookCard from "../components/BookCard";

// https://stackoverflow.com/questions/42361689/implement-html-entity-decode-in-react-js
const renderHTML = rawHTML =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const APIkey = "AIzaSyCalcsBPPiKqeweUkLttnlCX763LRP9jJ8";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    align: "left",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  margin: {
    margin: theme.spacing.unit,
    align: "down"
  },
  gridItem: {
    height: "100%",
    display: "inline-block"
  }
});

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      items: [],
      loading: false
    };
    this.classes = props;
    this.search = this.search.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      items: []
    });
    this.search();
  }

  handleKeyPress(event) {
    console.log(event.key);
    if (event.key === "Enter") {
      this.handleClick(event);
    }
    this.setState({
      query: event.target.value.replace(/ /g, "").toLowerCase()
    });
  }
  // https://github.com/nileshgulia1/React-bookstore/blob/master/app/components/App.jsx

  search() {
    let query = this.state.query;
    const BASE_URL =
      "https://www.googleapis.com/books/v1/volumes?max-results=10&q=name:" +
      query +
      "&key=" +
      APIkey;
    this.setState({
      loading: true
    });
    fetch(BASE_URL, { method: "GET" })
      .then(response => response.json())
      .then(json => {
        let { items } = json;
        for (var index in items) {
          var book = items[index];
          var newItem = {
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "",
            thumbnail: book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "",
            isbn13:
              book.volumeInfo.industryIdentifiers &&
              book.volumeInfo.industryIdentifiers[0]
                ? book.volumeInfo.industryIdentifiers[0].identifier
                : "",
            isbn10:
              book.volumeInfo.industryIdentifiers &&
              book.volumeInfo.industryIdentifiers[1]
                ? book.volumeInfo.industryIdentifiers[1].identifier
                : "",
            snippet: book.searchInfo ? book.searchInfo.textSnippet : ""
          };
          this.setState({
            items: [...this.state.items, newItem],
            loading: false
          });
        }
      });
    console.log(this.state.items);
  }

  render() {
    const items = this.state.items;
    return (
      <div>
        <Paper className={this.classes.container}>
          <Typography
            variant="h2"
            style={{ padding: "20px 20px", textAlign: "left" }}
          >
            Choose a book
          </Typography>
          <Divider />
          <Grid
            container
            spacing={8}
            direction="column"
            alignItems="center"
            style={{ minHeight: "50vh" }}
          >
            <Grid item xs={11}>
              <div className={this.classes.margin}>
                <SearchBar
                  id="book-query"
                  label="Book lookup"
                  className={this.classes.textField}
                  onKeyUp={e => this.handleKeyPress(e)}
                  onClick={e => this.handleClick(e)}
                  margin="normal"
                  placeholder="Enter a book title"
                />
                {/* <TextField
                  id="book-query"
                  label="Book lookup"
                  className={this.classes.textField}
                  onKeyUp={e => this.handleKeyPress(e)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={this.classes.margin}
                  onClick={e => this.handleClick(e)}
                >
                  Search
                  
        <SearchIcon className={classes.rightIcon}>Search</SearchIcon>
                </Button> */}
              </div>
              <div className="container">
                <Grid container spacing={8}>
                  {items.map((prop, key) => (
                    <Grid item xs={12} className="gridItem">
                      <BookCard
                        title={prop.title}
                        author={prop.author}
                        thumbnail={prop.thumbnail}
                        isbn10={prop.isbn10}
                        isbn13={prop.isbn13}
                        // snippet={renderHTML(prop.snippet)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AddListing);
