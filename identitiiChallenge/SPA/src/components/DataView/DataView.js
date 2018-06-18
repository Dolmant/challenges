// @flow
import React from 'react';
import Grid from 'material-ui/Grid';
import './DataView.less';
import Button from 'material-ui/Button';
import Checkbox from './../../UI/input/checkbox/checkbox';
import Text from './../../UI/input/text/text';
import Select from './../../UI/input/select/select';

import {camelToName} from './../../util/strings';

// as state is shallowly merged, we are appending a suffix to the two items we need to store
// for each attribute (included and the value)
const keyValueSuffix = '_value';
const keyIncludedSuffix = '_included';

type Attributes = Array<{
    id: string,
    contentType: string,
    editable: boolean,
    value?: string
}>;

type Props = {
    loading: boolean,
    attributes: Attributes,
    formTypes: any,
    handleSubmission: ({selected: Attributes}) => void,
};

type State = {
    [string]: string|number,
};

export default class DataView extends React.Component<Props, State> {
    static defaultProps = { 
        attributes: [
          { id: "sender/name", contentType: "text/string", "value": "Three Amigos", editable: false },
          { id: "sender/entityType", contentType: "text/string", editable: true },
          { id: "sender/address", contentType: "text/string", editable: true },    
          { id: "sender/country", contentType: "text/string", "value": "US", editable: false },
          { id: "sender/postcode", contentType: "", editable: true },
          { id: "sender/email", contentType: "text/email", editable: true }
        ],
        formTypes: {
            name: {
                uiType: "input"
            },
            entityType: {
                uiType: "select",
                uiOptions: {
                    options: [
                        {
                            name: "Individual", value: "identitii/individual",
                        },
                        {
                            name: "Business", value: "identitii/business",
                        },
                    ],
                },
            },
            address: {
                uiType: "textarea",
                uiOptions: {
                    rows: 4,
                },
            },
            country: {
                uiType: "select",
                uiOptions: {
                    options: [
                        { name: "Australia", value: "AU" },
                        { name: "United States", value: "US" },
                    ],
                },
            },
            postcode: {
                uiType: "input",
            },
            email: {
                uiType: "input",
                uiOptions: {
                    type: "email",
                },
            },
        },
    }
    state = {};

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const newState = {};
        nextProps.attributes.forEach((attribute) => {
            const key = attribute.id.split('/')[1];
            newState[key + keyIncludedSuffix] = false;
            newState[key + keyValueSuffix] = attribute.value;
        });
        return newState;
    }

    handleSubmit() {
        const selected = [];
        this.props.attributes.forEach((attribute) => {
            const key = attribute.id.split('/')[1];
            if (this.state[key + keyIncludedSuffix]) {
                selected.push({
                    id: attribute.id,
                    contentType: attribute.contentType,
                    value: this.state[key + keyValueSuffix]
                });
            }
        });
        this.props.handleSubmission({selected});
    }

    generateItems() {
        if (this.props.loading) {
            return (
                <p>Loading...</p>
            );
        }
        if (!this.props.attributes || this.props.attributes.length === 0) {
            return (
                <p>Error, no attributes provided</p>
            );
        }
        if (Object.keys(this.props.formTypes).length !== this.props.attributes.length) {
            return (
                <p>Error, provided attributes do not match the provided form components</p>
            );
        }
        const componentMap = (key, key_value, attribute) => {
            const formTypes = this.props.formTypes[key];

            switch (formTypes.uiType) {
            default:
            case 'input':
                return (<Text
                    key={key}
                    margin="none"
                    fullWidth
                    value={this.state[key_value]}
                    id={attribute.id}
                    disabled={attribute.editable}
                    onChange={(value) => this.setState({[key_value]: value})}
                    type={formTypes.uiOptions && formTypes.uiOptions.type}
                />);
            case 'select':
                return (<Select
                    margin="none"
                    key={key}
                    id={attribute.id}
                    disabled={attribute.editable}
                    onChange={(value) => this.setState({[key_value]: value})}
                    items={formTypes.uiOptions && formTypes.uiOptions.options}
                    value={this.state[key_value]}
                />);
            case 'textarea':
                return (<Text
                    margin="none"
                    fullWidth
                    key={key}
                    id={attribute.id}
                    disabled={attribute.editable}
                    value={this.state[key_value]}
                    onChange={(value) => this.setState({[key_value]: value})}
                    rowsMax={formTypes.uiOptions && formTypes.uiOptions.rows}
                    multiline
                    type={formTypes.uiOptions && formTypes.uiOptions.type}
                />);
            }
        };

        return this.props.attributes.map((attribute) => {
            const key = attribute.id.split('/')[1];
            const key_value = key + keyValueSuffix;
            const key_included = key + keyIncludedSuffix;

            return [
                <Grid key={1} item xs={4}>
                    <div className="name">{camelToName(key)}:</div>
                </Grid>,
                <Grid key={2} item xs={7}>
                    {componentMap(key, key_value, attribute)}
                </Grid>,
                <Grid key={3} item xs={1}>
                    <Checkbox
                        checked={this.state[key_included]}
                        onClick={(value) => this.setState({[key_included]: value})}
                    />
                </Grid>,
            ];
        });
    }

    render() {
        return (
            <div className="data-view">
                <Grid className="data-table" container alignItems={'center'}>
                    <Grid item xs={11}>
                        <div />
                    </Grid>
                    <Grid item xs={1}>
                        <div>Incl.</div>
                    </Grid>
                    {this.generateItems()}
                </Grid>
                <div className="submit">
                    <Button variant="raised" color="primary" onClick={() => this.handleSubmit()}>
                        SUBMIT
                    </Button>
                </div>
            </div>
        );
    }
}
