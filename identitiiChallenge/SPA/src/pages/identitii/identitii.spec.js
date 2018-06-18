import {actionCreators, types} from './identitiiActions';
import {PostUILoadingReducer} from './identitiiReducers';
import React from 'react';
import {Identitii} from './identitii';
import {shallow} from 'enzyme';

const header = 'YOUR SHARED DETAILS';

describe('Page: identitii', () => {
    describe('Component: Identitii', () => {
        describe('func: render', () => {
            it('Renders the correct header', () => {
                const wrapper = shallow(
                    <Identitii
                        getUIData={() => {}}
                    />);
                const text = wrapper.find('h2');
                expect(text.props().children).toBe(header);
            });
        });
    });
    describe('func: ActionCreators', () => {
        describe('func: overrideUIData', () => {
            it('Returns a valid action', () => {
                const result = actionCreators.overrideUIData();
                expect(result.type).toBe(types.GET_UI_DATA_REPLY);
            });
        });
    });
    describe('func: Reducers', () => {
        describe('func: PostUILoadingReducer', () => {
            it('Returns true if a request was just passed', () => {
                const result = PostUILoadingReducer(false, {type: types.POST_UI_DATA_REQUEST});
                expect(result).toBe(true);
            });
            it('Returns false if a reply was just passed', () => {
                const result = PostUILoadingReducer(true, {type: types.POST_UI_DATA_REPLY});
                expect(result).toBe(false);
            });
            it('Remembers its state', () => {
                let result = PostUILoadingReducer(true, {type: types.GET_UI_DATA_REPLY});
                expect(result).toBe(true);
                result = PostUILoadingReducer(false, {type: types.GET_UI_DATA_REPLY});
                expect(result).toBe(false);
            });
        });
    });
});
