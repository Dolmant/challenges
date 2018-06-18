// @flow
import {connect} from 'react-redux';
import React from 'react';
import GridControl from './Pages/GridControl/GridControl';
import TerminalControl from './Pages/TerminalControl/TerminalControl';

class PageRouter extends React.Component {
    props: {
        current_page: string,
    }

    page_content() {
        switch (this.props.current_page) {
        default:
        case 'fancy_panel':
            return (
                <GridControl />
            );
        case 'minimal_panel':
            return (
                <TerminalControl />
            );
        }
    }

    render() {
        return (
            <div>
                <div className="page">
                        {this.page_content()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    current_page: state.ui_state.current_page,
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PageRouter);
