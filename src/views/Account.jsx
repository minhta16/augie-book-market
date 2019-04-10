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
      isSignedIn: props.isSignedIn,
      number: 0,
      name: ""
    };
    this.buttonHandler = this.buttonHandler.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.submitNameHandler = this.submitNameHandler.bind(this);
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
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      });
      this.props.isSignedIn = this.state.isSignedIn;
    });
  }

  buttonHandler(e) {
    e.preventDefault();
    this.setState({
      number: Math.floor(Math.random() * 100)
    });
  }

  submitNameHandler(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    this.setState({
      name: name
    });
    document.getElementById("name").value = "";
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.number !== prevState.number) {
      this.pushToFirebase("number", this.state.number);
    }
    if (this.state.name !== prevState.name) {
      this.pushToFirebase("name", this.state.name);
    }
  }

  pushToFirebase(reference, object) {
    const ref = firebase.database().ref(reference);
    ref.push(object);
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
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
        <TextField
          label="Name"
          id="name"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.submitNameHandler(e);
            }
          }}
        />
        <Button color="primary" onClick={this.submitNameHandler}>
          Submit Name
        </Button>
        <h1>{this.state.number}</h1>
        <Button color="primary" onClick={this.buttonHandler}>
          Generate Random Number
        </Button>
      </div>
    );
  }
}
export default Account;
