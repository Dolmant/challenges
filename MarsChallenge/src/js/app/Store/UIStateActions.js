export const types = {
    LOG_ERROR: 'LOG_ERROR',
    LOG_WARN: 'LOG_WARN',
    CLEAR_LOG: 'CLEAR_LOG',
};

export const actionCreators = {
    clearLog: () => {
        return {
            type: types.CLEAR_LOG,
        };
    },
    logError: (error) => {
        return {
            type: types.LOG_ERROR,
            payload: error,
        };
    },
    logWarn: (error) => {
        return {
            type: types.LOG_WARN,
            payload: error,
        };
    },
};
