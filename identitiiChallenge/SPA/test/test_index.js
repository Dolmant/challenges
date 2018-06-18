import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Polyfill object.assign for phantomjs
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
                }
            }
            }
        }
        return to;
        },
        writable: true,
        configurable: true
    });
}

configure({adapter: new Adapter()});
// load all specs into one bundle
const testsContext = require.context('./../src', true, /.spec.js$/);
testsContext.keys().forEach(testsContext);
