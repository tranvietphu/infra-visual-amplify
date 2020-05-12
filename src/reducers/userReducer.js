import { handleActions } from "redux-actions";
import actions from "../actions/userActions";

const initialState = {
    name: "",
    email: "",
    groups: [],
    state: ""
};

export default handleActions(
    {
        [actions.setUsername]: (state, action) => {
            return {
                ...state,
                name: action.payload
            };
        },
        [actions.setEmail]: (state, action) => {
            return {
                ...state,
                email: action.payload
            };
        },
        [actions.setGroups]: (state, action) => {
            return {
                ...state,
                groups: action.payload
            };
        },
        [actions.setState]: (state, action) => {
            return {
                ...state,
                state: action.payload
            };
        }
    },
    initialState
);
