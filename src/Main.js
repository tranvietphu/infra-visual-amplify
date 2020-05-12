import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
// import cron from "cron";
import { Hub } from "aws-amplify";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { SnackbarProvider, withSnackbar } from "notistack";
import { history } from "./store";
import MyAppBar from "./components/appBar/appBar";
import Routes from "./routes";
import { fetchData } from "./actions/dataActions";
import MyBreadcrumbs from "./components/breadcrumbs";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    body: {
        padding: "20px 20px"
    },
    Button: {
        "&:focus": {
            outline: "none"
        }
    }

    
});

class Main extends Component {
    constructor(props) {
        super(props);
        
        //this.job = new cron.CronJob("*/30 * * * * *", () => {
        //    props.fetchData(true);
        //});
        //this.job.start();

        this.snackbar = null;

        Hub.listen("ErrorChannel", data => {
            const { payload } = data;
            this.handleErrorEvent(payload);
        });
    }

    componentWillUnmount = () => {
        //this.job.stop();
    };

    closeSnackbar = key => (
        <Fragment>
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={this.props.classes.Button}
                onClick={() => {
                    this.props.closeSnackbar(key);
                }}
            >
                <CloseIcon />
            </IconButton>
        </Fragment>
    );

    handleErrorEvent = payload => {
        this.snackbar = this.props.enqueueSnackbar(payload.message, {
            action: this.closeSnackbar,
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: null
        });
    };

    render() {
        const { classes, changed, enqueueSnackbar, groups } = this.props;

        if (groups.includes("Doctors") && changed) {
            const message =
                "データが更新されています。再読み込みしてください。";

            this.snackbar = enqueueSnackbar(message, {
                action: this.closeSnackbar,
                variant: "info",
                preventDuplicate: true,
                autoHideDuration: 30000
            });
        }

        return (
            <Fragment>
                <MyAppBar />
                <MyBreadcrumbs />
                <ConnectedRouter history={history}>
                    <div className={classes.body}>
                        <Routes />
                    </div>
                </ConnectedRouter>
            </Fragment>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    changed: PropTypes.bool.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
    changed: state.data.changed,
    groups: state.user.groups
});

const SnackbarMain = compose(
    withSnackbar,
    withStyles(styles),
    connect(
        mapStateToProps,
        { fetchData }
    )
)(Main);

function IntegrationNotistackMain() {
    return (
        <SnackbarProvider maxSnack={5}>
            <SnackbarMain />
        </SnackbarProvider>
    );
}

export default IntegrationNotistackMain;
