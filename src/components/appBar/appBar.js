import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import SignoutButton from "./signoutButton";
import RegionBox from "./regionBox";
import MenuBox from "./menuBox";
import HelpButton from "./helpButton";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Person from "@material-ui/icons/Person";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    user: {
        marginRight: theme.spacing(2)
    }
});

class MyAppBar extends Component {
    render() {
        const { classes, name } = this.props;

        return (
            <AppBar className={classes.root} position="static">
                <Toolbar>
                    <MenuBox/>
                    <Typography
                        variant="h5"
                        color="inherit"
                        className={classes.grow}
                    >
                        {"インフラ・ビジュアル"}
                    </Typography>
                    <Person />
                    <Typography color="inherit" className={classes.user}>
                        {name}
                    </Typography>
                    <SignoutButton />
                    <RegionBox />
                    <HelpButton />
                </Toolbar>
            </AppBar>
        );
    }
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    name: state.user.name
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(MyAppBar);
