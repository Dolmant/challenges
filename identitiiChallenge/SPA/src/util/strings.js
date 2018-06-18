// @flow
export const camelToName = (input: string) => {
    const processingString = input.replace(/([A-Z])/g, ' $1').toLowerCase();
    return processingString.charAt(0).toUpperCase() + processingString.slice(1);
};
