// @flow
import fetch from 'isomorphic-fetch';
import {toastr} from 'react-redux-toastr';


export const types = {
    GET_UI_DATA_REQUEST: 'GET_UI_DATA_REQUEST',
    GET_UI_DATA_REPLY: 'GET_UI_DATA_REPLY',
    POST_UI_DATA_REQUEST: 'POST_UI_DATA_REQUEST',
    POST_UI_DATA_REPLY: 'POST_UI_DATA_REPLY',
};

export const actionCreators = {
    getUIData: () => (dispatch: ({ type: string, payload: any }) => void) => {
        dispatch({
            type: types.GET_UI_DATA_REQUEST,
            payload: true,
        });
        fetch('/v1/data/ui', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                if (json && json.data) {
                    return dispatch({
                        type: types.GET_UI_DATA_REPLY,
                        payload: json.data,
                    });
                }
                throw new Error('No data in response');
            })
            .catch((err) => {
                console.log('Something went wrong! Probably couldnt find the API endpoint or it didnt respond correctly.');
                console.log(err);
                toastr.error('Something went wrong! :(');
            });
    },
    overrideUIData: (data: any) => ({
        type: types.GET_UI_DATA_REPLY,
        payload: data,
    }),
    postUIData: (data: any) => (dispatch: ({ type: string, payload: any }) => void) => {
        dispatch({
            type: types.POST_UI_DATA_REQUEST,
            payload: true,
        });
        console.log('Posting selected data to console and endpoint:');
        console.log(data);
        fetch('/v1/data/ui', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json && json.data) {
                    return dispatch({
                        type: types.POST_UI_DATA_REPLY,
                        payload: json.data,
                    });
                }
                throw new Error('No data in response');
            })
            .catch((err) => {
                console.log('Something went wrong! Probably couldnt find the API endpoint, it didnt respond correctly or your input is incorrect.');
                console.log(err);
                toastr.error('Something went wrong! :(');
            });
    },
};
