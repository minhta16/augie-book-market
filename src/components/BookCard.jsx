//https://material-ui.com/demos/cards/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  }
});

function BookCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={props.thumbnail}
        title={props.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.author}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {props.snippet}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            ISBN10: {props.isbn10}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            ISBN13: {props.isbn13}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            onClick={props.onClick}
          >
            Select
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(BookCard);
