import { createActions } from "redux-actions";
import { Logger } from "aws-amplify";
/*
import { API, graphqlOperation, Logger, Hub, I18n } from "aws-amplify";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

import * as types from "./../constants/ActionTypes";

*/
import { Hub, API } from "aws-amplify";
const logger = new Logger("dataActions");

const actions = createActions(
    "START_FETCH",
    "FETCH_DATA"
);
export default actions;

export const fetchData = (checkOnly = false) => dispatch => {
    dispatch(actions.startFetch());
    const result = [];
    dispatch(actions.fetchData(result));
    const apiName = 'infra';
    const path = '/ec2';
    const myInit = { // OPTIONAL
        headers: { Accept: 'application/json' }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {},
    };
    
    API
        .get(apiName, path, myInit)
        .then(response => {
            console.log("_________________");
            console.log(response);
            dispatch(actions.fetchData(response.data.body));
        })
        .catch(error => {
            console.log(error);
        });

    //return await API.post(apiName, path, params);
    // API.get(apiName, path, option)
    //     .then(response => {
    //         logger.debug(response);
    //     })
    //     .catch(error => {
    //         logger.error(error);
    //         Hub.dispatch("ErrorChannel", {
    //             event: "sendFeedback",
    //             message: `フィードバックの送信に失敗しました。${error}`
    //         });
    //     });

    /*
    if (!checkOnly) {
        dispatch(actions.startFetch());
    }
    
    API.graphql(graphqlOperation(queries.listDatas, { limit: 2147483647 }))
        .then(res => {
            logger.debug(res);
            if (checkOnly) {
                dispatch(actions.checkChanges(res.data.listDatas.items));
            } else {
                dispatch(actions.fetchData(res.data.listDatas.items));
            }
        })
        .catch(error => {
            logger.error(error);

            if (!checkOnly) {
                const messages = error.errors.map(e => {
                    const message = I18n.get(e.message);
                    if (message === e.message) {
                        return `予期しないエラーが発生しました。しばらく時間をおいてから再度アクセスしてください。${JSON.stringify(
                            e
                        )}`;
                    }
                    return message;
                });

                Hub.dispatch("ErrorChannel", {
                    event: "fetchData",
                    message: `データの取得に失敗しました。${messages[0]}`
                });
            }
        });
    */
};

/*
export const updateData = input => dispatch => {
    API.graphql(graphqlOperation(mutations.updateData, { input: input }))
        .then(res => {
            logger.debug(res);
        })
        .catch(error => {
            logger.error(error);
            Hub.dispatch("ErrorChannel", {
                event: "updateData",
                message: `データの更新に失敗しました。${JSON.stringify(
                    error.errors
                )}`
            });
        });
};
*/