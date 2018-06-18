// @flow
export const types = {
    TOGGLE_PAGE: 'TOGGLE_PAGE',
};

export const actionCreators = {
    togglePage: (page) => {
        return {
            type: types.TOGGLE_PAGE,
            payload: page,
        };
    },
};
