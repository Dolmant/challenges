// @flow
import TextField from 'material-ui/TextField';
import React from 'react';
import {connect} from 'react-redux';

class MarsChallengeTextfield extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };
    }
    state: {
        value: string,
    }

    props: {
        name: string,
        value: string,
        hintText: string,
        onBlur: ({}) => void,
    };

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    render() {
        const {onBlur, hintText, ...otherprops} = this.props;
        const onBlurEvent = onBlur;

        return (
            <TextField
                {...otherprops}
                value={this.state.value}
                hintText={this.state.value ? undefined : hintText}
                onChange={(event) => this.handleChange(event)}
                onBlur={onBlurEvent}
                className="textfield"
            />
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarsChallengeTextfield);
