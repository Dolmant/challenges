// @flow
import {connect} from 'react-redux';
import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import MarsChallengeTextfield from './../../Components/Textfield';
import {actionCreators as navActions} from './../../PageRouterActions';
import {actionCreators} from './TerminalControlActions';

// This could be a pure component, I prefer the classic style as it is clearer and more consistent
class TerminalControl extends React.Component {
    props: {
        processInput: () => void,
        togglePage: () => void,
        errorText: string,
        warnText: string,
        result: string,
        raw_input: string,
    };

    result_text() {
        if (this.props.result) {
            return (
                <div className="result">
                    <div>{'Result:'}</div>
                    {this.props.result}
                </div>
            );
        }
        return (
            <div>{'The result from your input will be calculated when the input is blurred'}</div>
        );
    }

    render() {
        return (
            <div>
                <main className="main-content">
                    <h3 className="title">
                        {'The Mars Rover Challenge!'}
                    </h3>
                    <Divider />
                    <div className="body-content">
                        <div className="input">
                            <MarsChallengeTextfield
                                name="instructions"
                                onBlur={this.props.processInput}
                                hintText={'Please enter your instructions as per the challenge guidelines'}
                                multiLine
                                defaultValue={this.props.raw_input}
                                rows={4}
                                fullWidth
                            />
                        </div>
                        <Divider />
                        <div className="warning">
                            {this.props.warnText}
                        </div>
                        <div className="error">
                            {this.props.errorText}
                        </div>
                        {this.result_text()}
                        <div className="navigation">
                            <RaisedButton
                                onClick={this.props.togglePage}
                                label="Change Page"
                            />
                        </div>
                        <Divider />
                        <div className="assumptions">
                            <span>{'Assumptions:'}</span>
                            <span>{'1. Correct number of rovers is based on user input (this can be changed)'}</span>
                            <span>{'2. Collisions and boundary violations produce warnings only'}</span>
                            <span>{'3. All positive numbers are valid inputs'}</span>
                            <span className="paddingTop">{'Solution was designed to be flexible in case the requirements changed (e.g. diagonal movements, allow trailing whitespace, enforce numbrer of rovers, etc)'}</span>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errorText: state.ui_state.log_error.join('\n'),
    warnText: state.ui_state.log_warn.join('\n'),
    result: state.result,
    raw_input: state.raw_input,
});

const mapDispatchToProps = (dispatch) => ({
    processInput: (event) => {
        dispatch(actionCreators.rawInput(event.target.value));
        dispatch(actionCreators.processInput(event.target.value));
    },
    togglePage: () => {
        dispatch(navActions.togglePage('fancy_panel'));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TerminalControl);
