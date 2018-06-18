import Text from './text';
import React from 'react';
import {shallow} from 'enzyme';

const warningLabel = 'Warning: invalid email address';

describe('UI: text', () => {
    describe('func: render', () => {
        it('Passes email correctly', () => {
            const wrapper = shallow(
                <Text
                    type="email"
                    value="www.checkemail.com"
                />);
            const passedProps = wrapper.find('TextField').props();
            expect(passedProps.value).toBe('www.checkemail.com');
        });
        it('Correctly passes warning labels', () => {

            const textInputs = [
                'correct@gmail.com',
                'notemail@',
                'allstring',
                '$other()*&^%characters',
                '@empty.com',
            ];
            const textOutputs = [
                undefined,
                warningLabel,
                warningLabel,
                warningLabel,
                warningLabel,
            ];
            const results = textInputs.map((input) => shallow(
                <Text
                    type="email"
                    value={input}
                />));
            textOutputs.forEach((output, index) => {
                expect(output).toBe(results[index].find('TextField').props().label);
            });
        });
    });
});
