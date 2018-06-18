// @flow
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import PageRouter from './app/PageRouter';
import store from './app/Store/Redux';
// You can use a CDN for jquery and react, that is probably recommended
// I am using an offline version since I have no internet currently
import $ from './jquery.min';

injectTapEventPlugin();

// Inject our NASA control panel into the DOM
$(document).ready(() => {
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <PageRouter />
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('app'));
});
