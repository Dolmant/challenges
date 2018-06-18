// @flow
import {types} from './TerminalControlActions';

const inputInitialState = [];

export function InputReducer(state = inputInitialState, action: {}) {
    if (action.type === types.PROCESSED_INPUT) {
        return action.payload;
    }
    return state;
}

const outputInitialState = [];

export function OutputReducer(state = outputInitialState, action: {}) {
    if (action.type === types.PROCESSED_OUTPUT) {
        return action.payload;
    }
    return state;
}

const rawInitialState = '';

export function RawReducer(state = rawInitialState, action: {}) {
    if (action.type === types.RAW_INPUT) {
        return action.payload;
    }
    return state;
}

const resultInitialState = '';

export function ResultReducer(state = resultInitialState, action: {}) {
    if (action.type === types.RESULT) {
        return action.payload;
    }
    if (action.type === types.LOG_ERROR) {
        return resultInitialState;
    }
    return state;
}
