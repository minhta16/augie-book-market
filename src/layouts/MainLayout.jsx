import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Route, Link, Switch } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { indigo, yellow } from "@material-ui/core/colors";
import "typeface-roboto";

import routes from "../routes.js";
import NotFound from "../views/NotFound.jsx";
import firebase from "../firebase";

const drawerWidth = 240;

const muiTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: yellow
  }
});

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.state = {
      mobileOpen: false,
      isSignedIn: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      });
    });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          {routes.map((prop, key) => (
            <ListItem
              button
              key={prop.name}
              component={Link}
              to={prop.path}
              history={this.history}
            >
              <prop.icon />
              <ListItemText primary={prop.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid container justify="space-between">
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit" noWrap>
                    Augie Book Market
                  </Typography>
                </Grid>
                {this.state.isSignedIn ? (
                  <Grid item>
                    <Grid container style={{ display: "flex" }} spacing={8}>
                      <Grid item>
                        <Typography variant="h6" color="inherit" noWrap>
                          Welcome,
                          {firebase.auth().currentUser.displayName}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => firebase.auth().signOut()}
                        >
                          Log Out
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography variant="h6" color="inherit" noWrap>
                      You are not signed in!
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {routes.map((prop, key) => (
                <Route key={key} path={prop.path} component={prop.component} />
              ))}
              <Route to="/not-found" component={NotFound} />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainLayout);
