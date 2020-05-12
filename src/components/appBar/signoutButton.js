import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Auth, Logger, Hub } from "aws-amplify";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const logger = new Logger("signoutButton");

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    Button: {
        "&:focus": {
            outline: "none"
        }
    }
});

class SignoutButton extends Component {
    constructor(props) {
        super(props);
    }

    onSignout = () => {
        Auth.signOut()
            .then(data => logger.debug(data))
            .catch(error => {
                logger.error(error);
                Hub.dispatch("ErrorChannel", {
                    event: "signOut",
                    message: `サインアウトに失敗しました。${error}`
                });
            });
    };

    render() {
        const { classes } = this.props;

        return (
            <Button
                className={classes.Button}
                color="inherit"
                onClick={this.onSignout}
            >
                {"サインアウト"}
            </Button>
        );
    }
}

SignoutButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles),
    connect()
)(SignoutButton);
