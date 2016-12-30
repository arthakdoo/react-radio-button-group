import React from 'react';

const isString = (obj) => typeof obj === "string";

const ComponentName = 'react-radio-button-group';
const getUniqueId = seed => ComponentName + '-' + seed;

class ReactRadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);
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

        if (newValue === this.state.currentValue) {
            return;
        }

        this.setState({
            currentValue: newValue
        });

        this.fireCurrentValue();
    }

    componentDidMount() {
        if (this.props.fireOnMount) {
            this.fireCurrentValue();
        }
    }

    render() {
        const groupClassName = this.props.groupClassName || '';
        const itemClassName = this.props.itemClassName || '';
        return (
            <div className={groupClassName}>
                {this.props.options.map(option => {
                    const value = isString(option) ? option : option.value;
                    const label = isString(option) ? option : option.label;
                    const inputClassName = option.inputClassName || this.props.inputClassName || '';
                    const labelClassName = option.labelClassName || this.props.labelClassName || '';
                    const inputId = getUniqueId(value);
                    const isChecked = this.state.currentValue === value;

                    return (
                        <div key={value} className={itemClassName}>
                            <input
                                type="radio"
                                checked={isChecked}
                                id={inputId}
                                onChange={this.handleChange}
                                className={inputClassName}
                                name={value}/>
                            <label htmlFor={inputId} className={labelClassName}>
                                {label}
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }
}

ReactRadioButtonGroup.propTypes = {
    options: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.shape({
                value: React.PropTypes.string,
                label: React.PropTypes.string,
                inputClassName: React.PropTypes.string,
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