/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>My_token = {window.token}</p>
      </header>
    </div>
  );
}
export default App;
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { compose } from "recompose";
import Amplify, { Logger } from "aws-amplify";
import awsmobile from "./aws-exports";
import store from "./store";
import withRoot from "./withRoot";
import withAuth from "./withAuth";
import IntegrationNotistackMain from "./Main";
import actions from "./actions/userActions";
import "./App.css";

Amplify.configure(awsmobile);
Amplify.Logger.LOG_LEVEL = "INFO";

const logger = new Logger("App");

// Disable drag and drop.
window.addEventListener(
    "dragover",
    function(e) {
        e.dataTransfer.dropEffect = "none";
        e.preventDefault();
    },
    false
);

window.addEventListener(
    "drop",
    function(e) {
        e.dataTransfer.dropEffect = "none";
        e.preventDefault();
        e.stopPropagation();
    },
    false
);

class App extends Component {
    render() {
        const { authState, authData } = this.props;

        store.dispatch(actions.setState(authState));

        if (authState !== "signedIn") {
            return null;
        }

        const username =
            authData.signInUserSession.idToken.payload["cognito:username"] ||
            "";
        store.dispatch(actions.setUsername(username));

        const email = authData.signInUserSession.idToken.payload.email || "";
        store.dispatch(actions.setEmail(email));

        const groups =
            authData.signInUserSession.idToken.payload["cognito:groups"] || [];
        store.dispatch(actions.setGroups(groups));

        logger.debug(`cognito:username: ${username}`);
        logger.debug(`email: ${email}`);
        logger.debug(`cognito:groups: ${groups}`);

        return (
            <Provider store={store}>
                <IntegrationNotistackMain />
            </Provider>
        );
    }
}

App.propTypes = {
    authState: PropTypes.string,
    authData: PropTypes.object
};

export default compose(
    withRoot,
    withAuth
)(App);
