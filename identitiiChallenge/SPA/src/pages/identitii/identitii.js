// @flow
import {connect} from 'react-redux';
import React from 'react';
import DataView from './../../components/DataView/DataView';
import './identitii.less';
import {actionCreators} from './identitiiActions';

type Props = {
    getUIData: () => void,
    postUIData: () => void,
    overrideUIData: (any) => void,
    attributes: any,
    formTypes: any,
    loading: boolean,
};

export class Identitii extends React.Component<Props> {
    componentDidMount() {
        this.props.getUIData();
        window.overrideData = this.props.overrideUIData;
    }
    render() {
        return (
            <div className="identitii">
                <div className="form">
                    <div className="info">
                        <h2>YOUR SHARED DETAILS</h2>
                        <div className="italics">For optimal speed of settlement, the following details about you will be shared with parties in the transaction.</div>
                    </div>
                    <DataView
                        handleSubmission={this.props.postUIData}
                        attributes={this.props.attributes}
                        formTypes={this.props.formTypes}
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    attributes: state.identitii.getData.attributes,
    formTypes: state.identitii.getData.formTypes,
    loading: state.identitii.getLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getUIData: () => {
        dispatch(actionCreators.getUIData());
    },
    postUIData: (data: any) => {
        dispatch(actionCreators.postUIData(data));
    },
    overrideUIData: (data: any) => {
        dispatch(actionCreators.overrideUIData(data));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Identitii);
