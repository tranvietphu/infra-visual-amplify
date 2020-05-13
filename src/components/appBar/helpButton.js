import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Logger, Hub, API } from "aws-amplify";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const logger = new Logger("helpButton");

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    Button: {
        "&:focus": {
            outline: "none"
        }
    }
});

class HelpButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    sendFeedback = () => {
        this.setState({
            open: false
        });
        const feedbackMsg = document.getElementById("feedback").value;
        if (feedbackMsg) {
            const apiName = "feedbackApi";
            const path = "/feedback";
            const params = {
                body: {
                    Subject: "インフラ・ビジュアルからの問い合わせ",
                    Message:
                        "インフラ・ビジュアルからの問い合わせ：\n" +
                        feedbackMsg +
                        "\n\n送信者：" +
                        this.props.username
                }
            };
            //return await API.post(apiName, path, params);
            API.post(apiName, path, params)
                .then(response => {
                    logger.debug(response);
                })
                .catch(error => {
                    logger.error(error);
                    Hub.dispatch("ErrorChannel", {
                        event: "sendFeedback",
                        message: `フィードバックの送信に失敗しました。${error}`
                    });
                });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <IconButton
                    className={classes.Button}
                    aria-label="Help"
                    color="inherit"
                    onClick={this.handleClickOpen}
                >
                    <HelpOutlinedIcon />
                </IconButton>
                <Dialog
                    className={classes.Dialog}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        {"フィードバックの送信"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="feedback"
                            placeholder="ここにメッセージを入力して、送信ボタンをクリックしてください。"
                            type="text"
                            fullWidth
                            multiline
                            rowsMax="4"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.sendFeedback} color="primary">
                            {"送信"}
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            {"キャンセル"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

HelpButton.propTypes = {
    classes: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    username: state.user.name
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(HelpButton);
