import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./authreducer/reducer";
import { reducer as userReducer } from "./Userreducer/reducer";
const rootReducer = combineReducers({ auth: authReducer, user: userReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
