// @flow
import React from 'react';
import SelectMUI from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';

type Props = {
    label?: string,
    onChange: (value: any) => void,
    items: Array<any>,
    value: any,
};

export default class Select extends React.Component<Props> {
    static defaultProps = {
        value: '',
    }
    generateItems() {
        return this.props.items.map((item) => (
            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
        ));
    }
    render() {
        return (
            <SelectMUI
                {...this.props}
                onChange={(event) => this.props.onChange(event.target.value)}
                name={this.props.label}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {this.generateItems()}
            </SelectMUI>
        );
    }
}
