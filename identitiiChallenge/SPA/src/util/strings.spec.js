import {camelToName} from './strings';

describe('Util: strings', () => {
    describe('func: camelToName', () => {
        it('Returns a string', () => {
            const results = camelToName('string');

            expect(typeof results).toBe('string');
        });
        it('Correctly matches examples', () => {
            const camelToNameInputs = [
                'AndEntry',
                'anOddEntry',
                'ALLCAPS',
                'nocaps',
                '',
            ];
            const camelToNameOutputs = [
                ' and entry',
                'An odd entry',
                ' a l l c a p s',
                'Nocaps',
                '',
            ];
            const results = camelToNameInputs.map((input) => camelToName(input));
            camelToNameOutputs.forEach((output, index) => {
                expect(output).toBe(results[index]);
            });
        });
    });
});
