// @flow
import {connect} from 'react-redux';
import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import MarsChallengeTextfield from './../../Components/Textfield';
import {actionCreators as navActions} from './../../PageRouterActions';
import {actionCreators} from './../TerminalControl/TerminalControlActions';

// This could be a pure component, I prefer the classic style as it is clearer and more consistent
class GridControl extends React.Component {
    props: {
        processInput: () => void,
        togglePage: () => void,
        errorText: string,
        warnText: string,
        result: string,
        raw_input: string,
        processed_input: any,
        processed_output: any,
    };

    original_position(x, y) {
        let result = false;
        this.props.processed_input.rover_positions.forEach((position, index) => {
            if (position.x === x && position.y === y) {
                result = index + 1;
            }
        });
        return result;
    }

    new_position(x, y) {
        let result = false;
        this.props.processed_output.forEach((position, index) => {
            if (position.x === x && position.y === y) {
                result = index + 1;
            }
        });
        return result;
    }

    generate_grid() {
        if (this.props.result) {
            const grid_x = this.props.processed_input.grid_x;
            const grid_y = this.props.processed_input.grid_y;
            
            const grid = [];
            for (let y = grid_y; y >= 0; y -= 1) {
                const row = [];
                for (let x = 0; x < grid_x + 1; x += 1) {
                    const original_pos = this.original_position(x, y);
                    const new_pos = this.new_position(x, y);
                    if (original_pos && new_pos) {
                        row.push(<div className="element both" key={`both ${x}${y}`}>{`Start for rover ${original_pos} and End for rover ${new_pos}.`}</div>);
                    } else if (original_pos) {
                        row.push(<div className="element original" key={`original ${x}${y}`}>{`Start for rover ${original_pos}.`}</div>);
                    } else if (new_pos) {
                        row.push(<div className="element new" key={`new ${x}${y}`}>{`End for rover ${new_pos}.`}</div>);
                    } else {
                        row.push(<div className="element" key={`element ${x}${y}`}></div>);
                    }
                }
                grid.push(<div className="row" key={`row ${y}`}>{row}</div>);
            }
            return (
                <div className="grid">
                    {grid}
                </div>
            );
        }
        return null;
    }

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
            <div>{'The result from your input will be calculated when the input is blurred.'}</div>
        );
    }

    render() {
        return (
            <div>
                <main className="main-content">
                    <h3 className="title">
                        {'The Mars Rover Challenge - Grid View'}
                    </h3>
                    <Divider />
                    <div className="body-content">
                        <div className="input">
                            <MarsChallengeTextfield
                                name="instructions"
                                onBlur={this.props.processInput}
                                hintText={'Please enter your instructions as per the challenge guidelines'}
                                multiLine
                                rows={4}
                                fullWidth
                                defaultValue={this.props.raw_input}
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
                        {this.generate_grid()}
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
    processed_input: state.processed_input,
    processed_output: state.processed_output,
});

const mapDispatchToProps = (dispatch) => ({
    processInput: (event) => {
        dispatch(actionCreators.rawInput(event.target.value));
        dispatch(actionCreators.processInput(event.target.value));
    },
    togglePage: () => {
        dispatch(navActions.togglePage('minimal_panel'));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GridControl);
