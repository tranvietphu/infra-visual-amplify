import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import queryString from "query-string";

import Home from "../Home";
import ec2Table from "../components/ec2Table";
import rdsTable from "../components/rdsTable";
import vpcTable from "../components/vpcTable";

class ProtectedRouteComponent extends Component {
    render() {
        const {
            component: Component,
            username,
            groups,
            allowed,
            ...props
        } = this.props;

        const isAllowed = true;
        /*
        const isAllowed = props => {
            if (!allowed.some(group => groups.includes(group))) return false;
            if (groups.includes("Patients")) {
                const params = queryString.parse(props.location.search);
                if (params.ident !== username) return false;
            }
            return true;
        };
        */
       
        return (
            <Route
                {...props}
                render={props =>
                    isAllowed(props) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        );
    }
}

ProtectedRouteComponent.propTypes = {
    component: PropTypes.object.isRequired,
    username: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.string),
    allowed: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
    username: state.user.name,
    groups: state.user.groups
});

const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComponent);

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route
                    path="/ec2"
                    component={ec2Table}
                />
                <Route
                    path="/rds"
                    component={rdsTable}
                />
                <Route
                    path="/vpc"
                    component={vpcTable}
                />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        );
    }
}

export default Routes;
