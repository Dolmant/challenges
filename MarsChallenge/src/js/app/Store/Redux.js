// @flow
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import UIStateReducer from './UIStateReducers';
import {ResultReducer, InputReducer, OutputReducer, RawReducer} from './../Pages/TerminalControl/TerminalControlReducers';

const loggerMiddleware = createLogger();

export type action_type = {
    payload: any,
    type: any,
};

const initialState = {};

// concatenate all the reducers
function allReducers(
    state: typeof initialState = initialState,
    action: action_type,
) {
    return {
        ui_state: UIStateReducer(state.ui_state, action),
        result: ResultReducer(state.result, action),
        processed_input: InputReducer(state.processed_input, action),
        processed_output: OutputReducer(state.processed_output, action),
        raw_input: RawReducer(state.raw_input, action),
    };
}

// create store
const store = createStore(
    allReducers,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware, // neat middleware that logs actions
    ),
);

export default store;
