import { createActions } from "redux-actions";
import { API } from "aws-amplify";

const actions = createActions(
    "START_FETCH",
    "FETCH_EC2",
    "FETCH_RDS",
    "CHANGE_REGION",
);
export default actions;

function ec2Api(_region) {
    const myInit = {
        headers: { Accept: 'application/json' },
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {
            region: _region
        },
    };
    const apiName = 'infra';
    const path = '/ec2';

    return API
        .get(apiName, path, myInit)
        .then(response => {
            return { instances: response.data.body ? response.data.body: [] };

        })
        .catch(error => {
            console.error(error);
            return { instances: [] };
        });

}

function rdsApi(_region) {
    const myInit = {
        headers: { Accept: 'application/json' },
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {
            region: _region
        },
    };
    const apiName = 'infra';
    const path = '/rds';

    return API
        .get(apiName, path, myInit)
        .then(response => {
            return { instances: response.data.body ? response.data.body: [] };

        })
        .catch(error => {
            console.error(error);
            return { instances: [] };
        });
}

export const fetchEc2 = (_region) => {
    return async dispatch => {
        dispatch(actions.startFetch());
        var res = await ec2Api(_region);
        if(Array.isArray(res.instances)){
            dispatch(actions.fetchEc2(res.instances));
        }else{
            dispatch(actions.fetchEc2([]));
        }
        
    };
};

export const fetchRds = (_region) => {
    return async dispatch => {
        dispatch(actions.startFetch());
        var res = await rdsApi(_region);
        if(Array.isArray(res.instances)){
            dispatch(actions.fetchRds(res.instances));
        }else{
            dispatch(actions.fetchRds([]));
        }
        
    };
};

export const changeRegion = (_region, _pathname) =>{
    return async dispatch => {
        dispatch(actions.changeRegion({ region: _region }));
        if(_pathname === "/ec2"){
            dispatch(actions.startFetch());
            var res = await ec2Api(_region);
            if(Array.isArray(res.instances)){
                dispatch(actions.fetchEc2(res.instances));
            }else{
                dispatch(actions.fetchEc2([]));
            }
        }else if(_pathname === "/rds"){
            dispatch(actions.startFetch());
            var res = await rdsApi(_region);
            if(Array.isArray(res.instances)){
                dispatch(actions.fetchRds(res.instances));
            }else{
                dispatch(actions.fetchRds([]));
            }

        }
    };
};