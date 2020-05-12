 import { handleActions } from "redux-actions";
import actions from "../actions/dataActions";
import equal from "deep-equal";
import { Logger } from "aws-amplify";

const logger = new Logger("dataReducer");

const initialState = {
    items: {},
    snapshots: {},
    fetched: false,
    loading: false,
    changes: {
        insert: [],
        delete: [],
        update: []
    },
    changed: false
};

export default handleActions(
    {
        [actions.startFetch]: state => {
            return {
                ...state,
                loading: true
            };
        },
        [actions.fetchData]: (state, action) => {
            const fetchData = action.payload.reduce(
                (a, c) => ({ ...a, [c.id]: c }),
                {}
            );

            logger.debug(`insertItems: ${JSON.stringify(fetchData)}`);

            return {
                ...state,
                items: fetchData,
                fetched: true,
                loading: false,
                changes: {
                    insert: [],
                    delete: [],
                    update: []
                },
                changed: false
            };
        },
        [actions.fetchSnapshot]: (state, action) => {
            return {
                ...state,
                snapshots: action.payload.snapshots,
                loading: false
            };
        },
        [actions.checkChanges]: (state, action) => {
            if (!state.fetched) return { ...state };

            const items = state.items;
            const fetchData = action.payload.reduce(
                (a, c) => ({ ...a, [c.id]: c }),
                {}
            );

            const insertItems = Object.keys(fetchData).filter(
                id => !(id in items)
            );
            const deleteItems = Object.keys(items).filter(
                id => !(id in fetchData)
            );
            const updateItems = Object.keys(fetchData).filter(
                id => id in items && !equal(fetchData[id], items[id])
            );

            logger.debug(`insertItems: ${JSON.stringify(insertItems)}`);
            logger.debug(`deleteItems: ${JSON.stringify(deleteItems)}`);
            logger.debug(`updateItems: ${JSON.stringify(updateItems)}`);

            return {
                ...state,
                changes: {
                    insert: insertItems,
                    delete: deleteItems,
                    update: updateItems
                },
                changed:
                    insertItems.length ||
                    deleteItems.length ||
                    updateItems.length
                        ? true
                        : false
            };            
        }
    },
    initialState
); 
