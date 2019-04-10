import React, { Component } from "react";
import { Typography } from "@material-ui/core";

import firebase from "../firebase";
import { TextField, Button } from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Account extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isSignedIn: false,
      number: 0,
      name: ""
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
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <div>
            <h1>
              Logged In! Welcome {firebase.auth().currentUser.displayName}
            </h1>
            <Button color="primary" onClick={() => firebase.auth().signOut()}>
              Click to sign out
            </Button>
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
export default Account;
