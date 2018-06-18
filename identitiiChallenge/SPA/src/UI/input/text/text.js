// @flow
import React from 'react';
import TextField from 'material-ui/TextField';

type Props = {
    label?: string,
    onChange: (value: any) => void,
    value: any,
    type: string,
};

export default class Text extends React.Component<Props> {
    render() {
        let error;
        let label;
        switch (this.props.type) {
        case 'email':
            error = !/^.+@.+\..+$/.test(this.props.value);
            if (error && this.props.value) {
                label = 'Warning: invalid email address';
            }
            break;
        default:
            break;
        }
        return (
            <TextField
                {...this.props}
                label={label}
                error={error}
                onChange={(event) => this.props.onChange(event.target.value)}
            />
        );
    }
}
