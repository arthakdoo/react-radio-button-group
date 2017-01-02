import React from 'react';
import ReactRadioButton from './react-radio-button';
import {isString} from './util';
import {getNonEmptyAttr} from './util';
import {selectStringParam} from './util';

const CLASS_NAME = 'className';

const selectionChanged = (newValue, currentValue) => {
    return newValue !== currentValue;
}

class ReactRadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);

        this.id = ReactRadioButtonGroup.generateId();

        this.state = this.createInitialState(props);

        this.handleChange = this.handleChange.bind(this);
        this.fireCurrentValue = this.fireCurrentValue.bind(this);
    }

    getComponentName() {
        return 'react-radio-button-group';
    }

    createInitialState(props) {
        return {currentValue: props.defaultValue};
    }

    getOnChangeCallbackParam() {
        return this.state.currentValue;
    }

    fireCurrentValue() {
        if (this.props.onChange) {
            this.props.onChange(this.getOnChangeCallbackParam());
        }
    }

    updateState(event, callback) {
        const newValue = event.target.name;
        this.setState({currentValue: newValue}, callback);
    }

    stateChanged(oldState, newState) {
        return oldState.currentValue !== newState.currentValue;
    }

    handleChange(event) {
        const oldState = JSON.parse(JSON.stringify(this.state));
        this.updateState(event, function() {
            if (this.stateChanged(oldState, this.state)) {
                this.fireCurrentValue();
            }
        }.bind(this));
    }

    componentDidMount() {
        if (this.props.fireOnMount) {
            this.fireCurrentValue();
        }
    }

    getInputType() {
        return "radio";
    }

    getIsValueChecked(value) {
        return this.state.currentValue === value;
    }

    render() {
        const groupClassName = this.props.groupClassName || '';
        const groupId = this.getComponentName() + '-' + this.id;

        return (
            <div {...getNonEmptyAttr(CLASS_NAME, groupClassName)}>
                {this.props.options.map((option, i) => {
                    const value = selectStringParam(option, option.value);
                    return (
                        <ReactRadioButton key={i}
                            value={value}
                            inputType={this.getInputType()}
                            isChecked={this.getIsValueChecked(value)}
                            groupId={groupId}
                            option={option}
                            onChange={this.handleChange}
                            inputClassName={this.props.inputClassName}
                            labelClassName={this.props.labelClassName}
                            itemClassName={this.props.itemClassName}
                        />
                    );
                })}
            </div>
        );
    }
}

ReactRadioButtonGroup.idGenerator = 1;
ReactRadioButtonGroup.generateId = () => ReactRadioButtonGroup.idGenerator++;

ReactRadioButtonGroup.propTypes = {
    options: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.shape({
                value: React.PropTypes.string.isRequired,
                label: React.PropTypes.string,
                inputClassName: React.PropTypes.string,
                itemClassName: React.PropTypes.string,
                labelClassName: React.PropTypes.string
            }),
            React.PropTypes.string
        ])
    ).isRequired,
    defaultValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    inputClassName: React.PropTypes.string,
    labelClassName:  React.PropTypes.string,
    itemClassName: React.PropTypes.string,
    groupClassName: React.PropTypes.string,
    fireOnMount: React.PropTypes.bool
};

export default ReactRadioButtonGroup;