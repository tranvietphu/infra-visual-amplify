import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import TimeLineIcon from "@material-ui/icons/Timeline";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    root: {
        padding: theme.spacing(1, 2)
    },
    link: {
        display: "flex"
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20
    }
});

const linkMap = {
    "#/ec2": (classes, params) => {
        return {
            element: () => (
                <Fragment>
                    <PermIdentityOutlinedIcon className={classes.icon} />
                    {"EC2選択"}
                </Fragment>
            ),
            params: ""
        };
    },
    "#/rds": (classes, params) => {
        return {
            element: () => (
                <Fragment>
                    <PermIdentityOutlinedIcon className={classes.icon} />
                    {"RDS選択"}
                </Fragment>
            ),
            params: ""
        };
    },
    "#/ec2/upload": (classes, params) => {
        return {
            element: () => (
                <Fragment>
                    <CloudUploadOutlinedIcon className={classes.icon} />
                    {"アップロード"}
                </Fragment>
            ),
            params: ""
        };
    },
    "#/ec2/heartrate": (classes, params) => {
        return {
            element: () => (
                <Fragment>
                    <TimeLineIcon className={classes.icon} />
                    {"データ閲覧"}
                </Fragment>
            ),
            params: `ident=${params["ident"]}`
        };
    },
    "#/ec2/heartrate/snapshots": (classes, params) => {
        return {
            element: () => (
                <Fragment>
                    <ImageOutlinedIcon className={classes.icon} />
                    {"スナップショット"}
                </Fragment>
            ),
            params: `ident=${params["ident"]}&event_time=${
                params["event_time"]
            }}`
        };
    }
};

class MyBreadcrumbs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: window.location.hash
        };
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.handleHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.handleHashChange);
    }

    handleHashChange = e => {
        this.setState({
            hash: e.target.location.hash
        });
    };

    render() {
        const { classes, groups } = this.props;
        const hashes = this.state.hash
            .split("?")[0]
            .split("/")
            .filter(x => x && x !== "#");
        const params = queryString.parse(this.state.hash.split("?").pop());

        return (
            <Paper elevation={0} className={classes.root}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {hashes.map((value, index) => {
                        const last = index === hashes.length - 1;
                        const to = `#/${hashes.slice(0, index + 1).join("/")}`;

                        if (!groups.includes("Doctors")) {
                            if (to === "#/ec2") return;
                        }

                        if (to in linkMap) {
                            const link = linkMap[to](classes, params);
                            const href =
                                `${to}` +
                                (link.params ? `?${link.params}` : "");
                            return last ? (
                                <Typography
                                    key={link.element()}
                                    color="textPrimary"
                                    className={classes.link}
                                >
                                    {link.element()}
                                </Typography>
                            ) : (
                                <Link
                                    key={link.element()}
                                    color="inherit"
                                    className={classes.link}
                                    href={href}
                                >
                                    {link.element()}
                                </Link>
                            );
                        }
                    })}
                </Breadcrumbs>
            </Paper>
        );
    }
}

MyBreadcrumbs.propTypes = {
    classes: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
    groups: state.user.groups
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(MyBreadcrumbs);
