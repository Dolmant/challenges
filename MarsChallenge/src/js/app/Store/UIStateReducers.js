// @flow
import PageRouterReducer from './../PageRouterReducers';
import {types} from './UIStateActions';

const initialState = {
    log_warn: [],
    log_error: [],
};

const LogWarnReducer = (state, action) => {
    if (action.type === types.LOG_WARN) {
        const result = state.slice();
        result.push(action.payload);
        return result;
    }
    if (action.type === types.CLEAR_LOG) {
        return initialState.log_warn;
    }
    return state;
};

const LogErrorReducer = (state, action) => {
    if (action.type === types.LOG_ERROR) {
        const result = state.slice();
        result.push(action.payload);
        return result;
    }
    if (action.type === types.CLEAR_LOG) {
        return initialState.log_error;
    }
    return state;
};

// Initial state is handled by each individual reducer where relevant
export default function UIStateReducer(state = initialState, action: {}) {
    return {
        current_page: PageRouterReducer(state.current_page, action),
        log_warn: LogWarnReducer(state.log_warn, action),
        log_error: LogErrorReducer(state.log_error, action),
    };
}
