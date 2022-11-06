import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { usersReducer } from "./userReduser";

const rootReducer = combineReducers({
    users: usersReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
