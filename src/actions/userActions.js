import { createActions } from "redux-actions";

const actions = createActions(
    "SET_USERNAME",
    "SET_EMAIL",
    "SET_GROUPS",
    "SET_STATE"
);
export default actions;
