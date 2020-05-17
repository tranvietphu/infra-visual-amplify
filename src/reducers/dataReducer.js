import { handleActions } from "redux-actions";
import actions from "../actions/dataActions";
import { Logger } from "aws-amplify";

const logger = new Logger("dataReducer");

const initialState = {
    ec2s: {},
    rdss: {},
    vpcs: {},
    region: "ap-northeast-1",
    fetched: false,
    loading: false
};

export default handleActions(
    {
        [actions.startFetch]: state => {
            return {
                ...state,
                loading: true
            };
        },
        [actions.fetchEc2]: (state, action) => {
            const _items = action.payload.reduce(
                (a, c) => ({ ...a, [c.id]: c }),
                {}
            );


            logger.debug(`insertItems: ${JSON.stringify(_items)}`);

            return {
                ...state,
                ec2s: _items,
                fetched: true,
                loading: false
            };
        },
        [actions.fetchRds]: (state, action) => {
            const _items = action.payload.reduce(
                (a, c) => ({ ...a, [c.id]: c }),
                {}
            );

            logger.debug(`insertItems: ${JSON.stringify(_items)}`);
            
            return {
                ...state,
                rdss: _items,
                fetched: true,
                loading: false
            };
        },
        [actions.fetchVpc]: (state, action) => {
            const _items = action.payload.reduce(
                (a, c) => ({ ...a, [c.id]: c }),
                {}
            );

            logger.debug(`insertItems: ${JSON.stringify(_items)}`);
            
            return {
                ...state,
                vpcs: _items,
                fetched: true,
                loading: false
            };
        },
        [actions.changeRegion]: (state, action) => {
            return {
                ...state,
                region: action.payload.region
            };
        }
    },
    initialState
); 
