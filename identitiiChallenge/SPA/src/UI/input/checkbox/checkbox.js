// @flow
import React from 'react';
import './checkbox.less';

type Props = {
    label?: string,
    onClick: (value: any) => void,
    checked: any,
};

class Checkbox extends React.Component<Props> {
    render() {
        return (
            <div className="custom-checkbox-wrapper" key={this.props.label}>
                <label htmlFor={this.props.label} className="label-cbx">
                    <input id={this.props.label} data={this.props.label} type="checkbox" className="invisible" onClick={() => this.props.onClick(!this.props.checked)} checked={this.props.checked} onChange={() => {}} />
                    <div className="custom-checkbox">
                        <svg width="20px" height="20px" viewBox="0 0 20 20">
                            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                            <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                    </div>
                </label>
            </div>
        );
    }
}

export default Checkbox;