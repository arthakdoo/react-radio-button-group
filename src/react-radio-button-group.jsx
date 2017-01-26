import React from 'react';
import ReactRadioButton from './react-radio-button';
import {isString} from './util';
import {getNonEmptyAttr} from './util';
import {selectStringParam} from './util';

const CLASS_NAME = 'className';

class ReactRadioButtonGroup extends React.Component {
    getComponentName() {
        return 'react-radio-button-group';
    }

    getInputType() {
        return "radio";
    }

    constructor(props) {
        super(props);

        this.id = ReactRadioButtonGroup.generateId();

        if (this.isStateful()) {
            this.state = this.createInitialState(props);
        }

        this.handleChange = this.handleChange.bind(this);
    }

    isStateful() {
        return this.props.isStateful;
    }

    createInitialState(props) {
        return {currentValue: props.value};
    }

    createStateFromEvent(event) {
        return {
            currentValue: event.target.value
        };
    }

    fireOnChange(param) {
        if (this.props.onChange) {
            this.props.onChange(param);
        }
    }

    fireCurrentState() {
        this.fireOnChange(this.state.currentValue);
    }

    fireEventValue(event) {
        this.fireOnChange(event.target.value);
    }

    willStateChange(oldState, newState) {
        return oldState.currentValue !== newState.currentValue;
    }

    handleChange(event) {
        if (this.isStateful()) {
            const newState = this.createStateFromEvent(event);
            if (this.willStateChange(this.state, newState)) {
                this.setState(newState, function() {
                    this.fireCurrentState();
                }.bind(this));
            }
        }
        else {
            this.fireEventValue(event);
        }
    }

    componentDidMount() {
        if (this.isStateful() && this.props.fireOnMount) {
            this.fireCurrentState();
        }
    }

    getIsValueChecked(value) {
        return (this.isStateful() && this.state.currentValue === value) ||
            (! this.isStateful() && this.props.value === value);
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
                                          name={this.props.name}
                                          value={value}
                                          inputType={this.getInputType()}
                                          isChecked={this.getIsValueChecked(value)}
                                          groupId={groupId}
                                          option={option}
                                          onChange={this.handleChange}
                                          defaultValue={this.props.defaultValue}
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
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    inputClassName: React.PropTypes.string,
    labelClassName:  React.PropTypes.string,
    itemClassName: React.PropTypes.string,
    groupClassName: React.PropTypes.string,
    fireOnMount: React.PropTypes.bool
};

export default ReactRadioButtonGroup;
