import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { I18n, Cache } from "aws-amplify";
import moment from "moment";
import { fetchEc2 } from "../actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import yellow from "@material-ui/core/colors/yellow";
import lightBlue from "@material-ui/core/colors/lightBlue";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import RefreshIcon from "@material-ui/icons/Refresh";
//import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
//import FormControl from "@material-ui/core/FormControl";
//import NativeSelect from "@material-ui/core/NativeSelect";
import { red } from "@material-ui/core/colors";
//import Link from "@material-ui/core/Link";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-table/react-table.css";

//const logger = new Logger("patientTable");

const styles = theme => ({
    root: {
        width: "100%"
    },
    tableWrapper: {
        overflowX: "auto"
    },
    UpdateIdCell: {
        fontWeight: 900,
        color: red[400]
    },
    MyNameCell: {
        fontWeight: 900
    },
    wrapper: {
        position: "relative",
        height: 24,
        top: -4
    },
    fabProgress: {
        position: "absolute",
        top: -12,
        left: -12,
        zIndex: 1
    },
    formControl0: {
        margin: 0,
        width: "100%"
    },
    formControl1: {
        marginRight: 4,
        width: "20%",
        maxWidth: "30px"
    },
    formControl2: {
        margin: 0,
        width: "80%"
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

class ReactTableComp extends Component {
    constructor(props) {
        super(props);
        props.fetchEc2(this.props.region);
    }

    handleRefresh = () => {
        this.props.fetchEc2(this.props.region);
    };

    render() {
        const { classes, data, loading} = this.props;

        //let grouped_data = groupBy(Object.values(data), "ident");
        const CaptionElement = () => (
            <div>
                <h6
                    style={{
                        borderRadius: "0.25em",
                        marginBottom: "0.0rem",
                        textAlign: "left",
                        padding: "1em"
                    }}
                >
                    EC2一覧
                </h6>
            </div>
        );

        const columns = [
            {
                Header: "id",
                accessor: "id",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false
            },
            {
                Header: "type",
                accessor: "type",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false
            },
            {
                Header: "keyname",
                accessor: "keyname",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false,
                sortable: false
            },
            {
                Header: "state",
                accessor: "state",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false
            },
            {
                Header: "vpc",
                accessor: "vpc",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false
            },
            {
                Header: "subnet",
                accessor: "subnet",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false
            },
            {
                Header: "zone",
                accessor: "zone",
                Cell: props => {
                    return <div>{props.value}</div>;
                },
                headerStyle: { textAlign: "center" },
                style: { textAlign: "center" },
                filterable: false
            }
        ];

        const translations = I18n.get("ReactTableComp");

        return (
            <Fragment>
                <Paper className={classes.root}>
                    <div className="row">
                        <div className="col-md-6 text-left">
                            <CaptionElement />
                        </div>
                        <div className="col-md-6 text-right">
                            <Tooltip title="再読み込み">
                                <IconButton
                                    aria-label="Refresh"
                                    onClick={this.handleRefresh}
                                    disabled={loading}
                                    component="div"
                                >
                                    <div className={classes.wrapper}>
                                        <RefreshIcon />
                                        <Fade in={loading} unmountOnExit>
                                            <CircularProgress
                                                size={48}
                                                className={classes.fabProgress}
                                            />
                                        </Fade>
                                    </div>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <ReactTable
                        keyField="id"
                        data={Object.values(data)}
                        columns={columns}
                        filterable
                        loading={loading}
                        resizable
                        {...translations}
                        defaultSorted={[
                            {
                                id: Cache.getItem("defaultSortedId") || "id",
                                desc:
                                    Cache.getItem("defaultSortedDesc") ===
                                    "false"
                                        ? false
                                        : true
                            }
                        ]}
                        onSortedChange={(newSorted, column, shiftKey) => {
                            Cache.setItem("defaultSortedId", newSorted[0].id);
                            Cache.setItem(
                                "defaultSortedDesc",
                                newSorted[0].desc.toString()
                            );
                        }}
                        defaultPageSize={Cache.getItem("pageSize") || 10}
                        onPageSizeChange={(pageSize, pageIndex) => {
                            Cache.setItem("pageSize", pageSize);
                        }}
                        getTrProps={(s, r) => {
                            if (r) {
                                const _diff_day = moment(
                                    r.original.last_event_time
                                ).diff(moment(), "days");
                                if (_diff_day === 0) {
                                    return {
                                        style: {
                                            background: yellow[200]
                                        }
                                    };
                                }
                            }
                            return {};
                        }}
                    />
                </Paper>
            </Fragment>
        );
    }
}

ReactTableComp.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchEc2: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    data: state.data.ec2s,
    region: state.data.region,
    loading: state.data.loading,
});

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        { fetchEc2 }
    )
)(ReactTableComp);
