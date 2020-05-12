import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        data: dataReducer,
    });

export default createRootReducer;
