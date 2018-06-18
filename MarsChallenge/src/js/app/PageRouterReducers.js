// @flow
import {types} from './PageRouterActions';

const initialState = 'minimal_panel';

export default function PageRouterReducer(state: string = initialState, action: {}) {
    if (action.type === types.TOGGLE_PAGE) {
        return action.payload;
    }
    return state;
}
