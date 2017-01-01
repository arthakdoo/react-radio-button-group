import React from 'react';
import ReactRadioButton from './react-radio-button';
import {isString} from './util';
import {getNonEmptyAttr} from './util';

const CLASS_NAME = 'className';

const selectionChanged = (newValue, currentValue) => {
    return newValue !== currentValue;
}

class ReactRadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);

        this.id = ReactRadioButtonGroup.generateId();
        this.state = {currentValue: this.props.defaultValue};
        this.handleChange = this.handleChange.bind(this);
        this.fireCurrentValue = this.fireCurrentValue.bind(this);
    }

    fireCurrentValue() {
        if (this.props.onChange) {
            this.props.onChange(this.state.currentValue);
        }
    }

    handleChange(event) {
        const newValue = event.target.name;
        if (selectionChanged(newValue, this.state.currentValue)) {
            this.setState({currentValue: newValue}, this.fireCurrentValue);
        }
    }

    componentDidMount() {
        if (this.props.fireOnMount) {
            this.fireCurrentValue();
        }
    }

    render() {
        const groupClassName = this.props.groupClassName || '';
        return (
            <div {...getNonEmptyAttr(CLASS_NAME, groupClassName)}>
                {this.props.options.map((option, i) => {
                    return (
                        <ReactRadioButton
                            groupId={this.id}
                            key={i}
                            currentValue={this.state.currentValue}
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