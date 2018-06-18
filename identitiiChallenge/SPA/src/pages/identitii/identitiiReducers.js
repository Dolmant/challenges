// @flow
import {types} from './identitiiActions';

type actionType = {
    payload: any,
    type: string,
}

const getUILoading = false;

function GetUILoadingReducer(state: typeof getUILoading = getUILoading, action: actionType) {
    if (action.type === types.GET_UI_DATA_REPLY) {
        return false;
    }
    if (action.type === types.GET_UI_DATA_REQUEST) {
        return true;
    }
    return state;
}

const postUILoading = false;

export function PostUILoadingReducer(state: typeof postUILoading = postUILoading, action: actionType) {
    if (action.type === types.POST_UI_DATA_REPLY) {
        return false;
    }
    if (action.type === types.POST_UI_DATA_REQUEST) {
        return true;
    }
    return state;
}

function GetUIReducer(state, action: actionType) {
    if (action.type === types.GET_UI_DATA_REPLY) {
        return action.payload;
    }
    return state;
}

function PostUIReducer(state, action: actionType) {
    if (action.type === types.POST_UI_DATA_REPLY) {
        return action.payload;
    }
    return state;
}

const combinedInitialState = {
    getData: {},
    postData: {},
    getLoading: false,
    postLoading: false,
};

export default function CombinedIdentitiiReducer(state: typeof combinedInitialState = combinedInitialState, action: actionType) {
    return {
        getLoading: GetUILoadingReducer(state.getLoading, action),
        postLoading: PostUILoadingReducer(state.postLoading, action),
        getData: GetUIReducer(state.getData, action),
        postData: PostUIReducer(state.postData, action),
    };
}
