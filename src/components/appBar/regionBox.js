import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { changeRegion } from "../../actions/dataActions";
import lightBlue from "@material-ui/core/colors/lightBlue";

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    textInput: {
        fontSize: "0.875rem !important",
        fontFamily: "Amazon Ember !important",
        "&:before": {
            border: "0px !important"
        },
        "&:after": {
            border: "0px !important"
        },
        "& > input": {
            background: `${lightBlue[50]} !important`
        }
    },
    svg: {
        display: "none"
    },
    nativeSelect: {
        "&:before": {
            border: "0px !important"
        },
        "&:after": {
            border: "0px !important"
        }
    },
    selectBgColor: {
        background: `${lightBlue[50]} !important`
    },
    link: {
        display: "flex"
    }

});

class RegionBox extends Component {
    //constructor(props) {
    //    super(props);
    //}

    handleChange = (event) => {
        console.log(event.target.value);
        this.props.changeRegion(event.target.value, this.props.pathname);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        value={this.props.region}
                        onChange={this.handleChange}
                        classes={{
                            root: classes.textInput,
                            select: classes.selectBgColor,
                            icon: classes.svg
                        }}
                        className={classes.nativeSelect}
                    >
                        <option value="us-east-2">Ohio</option>
                        <option value="us-east-1">N. Virginia</option>
                        <option value="us-west-1">N. California</option>
                        <option value="us-west-2">Oregon</option>
                        <option value="af-south-1">Cape Town</option>
                        <option value="ap-east-1">Hong Kong</option>
                        <option value="ap-south-1">Mumbai</option>
                        <option value="ap-northeast-3">Osaka-Local</option>
                        <option value="ap-northeast-2">Seoul</option>
                        <option value="ap-southeast-1">Singapore</option>
                        <option value="ap-southeast-2">Sydney</option>
                        <option value="ap-northeast-1">Tokyo</option>
                        <option value="ca-central-1">Canada(Central)</option>
                        <option value="cn-north-1">China(Beijing)</option>
                        <option value="cn-northwest-1">China(Ningxia)</option>
                        <option value="eu-central-1">Europe(Frankfurt)</option>
                        <option value="eu-west-1">Europe(Ireland)</option>
                        <option value="eu-west-2">Europe(London)</option>
                        <option value="eu-south-1">Europe(Milan)</option>
                        <option value="eu-west-3">Europe(Paris)</option>
                        <option value="eu-north-1">Europe(Stockholm)</option>
                        <option value="me-south-1">Middle East(Bahrain)</option>
                        <option value="sa-east-1">São Paulo</option>
                    </NativeSelect>
                </FormControl>
            </div>
        );
    }
}

RegionBox.propTypes = {
    classes: PropTypes.object.isRequired,
    changeRegion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    region: state.data.region
});


export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        { changeRegion }
    )
)(RegionBox);
