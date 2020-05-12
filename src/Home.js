import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		padding: theme.spacing(1)
	}
});

function Home(props) {
	if (props.groups.includes("Patients")) {
		window.location.href = `#/patients/heartrate?ident=${props.username}`;
	} else if(props.groups.includes("Doctors")) {
		window.location.href = "#/patients";
	} else if(props.groups.includes("Collectors")) {
		window.location.href = "#/patients/upload";
	}
	return <Fragment />;
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	username: PropTypes.string,
	groups: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
	username: state.user.name,
	groups: state.user.groups
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(Home);
