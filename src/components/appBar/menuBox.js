import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        "&:focus": {
            outline: "none"
        }
    }
});

class MenuBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };
    }

    handleMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    moveTo = (event) => {
        this.setState({
            anchorEl: null
        });
        window.location.hash = event.target.getAttribute("address");
    };


    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    edge="start"
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.moveTo} address="#/ec2">EC2</MenuItem>
                    <MenuItem onClick={this.moveTo} address="#/rds">RDS</MenuItem>
                </Menu>
            </div>
        );
    }
}

MenuBox.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles),
    connect()
)(MenuBox);
