import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./reducers";
import { createHashHistory  } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createHashHistory();

const middleware = [routerMiddleware(history), thunk];

if (process.env.NODE_ENV !== "production") {
    const { createLogger } = require("redux-logger");
    const logger = createLogger({
        collapsed: true,
        diff: true
    });

    middleware.push(logger);
}

const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
                  window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
);

if (module.hot) {
    module.hot.accept("./reducers", () => {
        store.replaceReducer(createRootReducer(history));
    });
}

export default store;
