import React from 'react';
import DataView from './DataView';
import {shallow, mount} from 'enzyme';

const buttonText = 'SUBMIT';

describe('Page: DataView', () => {
    describe('Component: DataView', () => {
        describe('func: render', () => {
            it('Renders the correct Button', () => {
                const wrapper = shallow(
                    <DataView
                        getUIData={() => {}}
                    />);
                const text = wrapper.find('.submit');
                expect(text.props().children.props.children).toBe(buttonText);
            });
        });
        describe('func: getDerivedStateFromProps', () => {
            it('Correctly parses the given input', () => {
                const wrapper = shallow(
                    <DataView />);
                const state = wrapper.state();
                expect(state.name_value).toBe('Three Amigos');
            });
        });
        describe('func: defaultProps', () => {
            it('Correctly delivers default props', () => {
                const wrapper = mount(
                    <DataView />);
                const props = wrapper.props();
                expect(props.formTypes.entityType.uiType).toBe('select');
            });
        });
    });
});
