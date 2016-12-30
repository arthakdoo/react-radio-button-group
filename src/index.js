import React from 'react';

const isString = (obj) => typeof obj === "string";

class ReactRadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentValue: this.props.defaultValue};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newValue = event.target.id;

        if (newValue === this.state.currentValue) {
            return;
        }

        this.setState({
            currentValue: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    render() {
        return (
            <span>
                {this.props.options.map(option => {
                    const value = isString(option) ? option : option.value;
                    const label = isString(option) ? option : option.label;
                    const isChecked = this.state.currentValue === value;

                    return (
                        <span key={value}>
                            <input
                                type="radio"
                                checked={isChecked}
                                id={value}
                                onChange={this.handleChange}
                                className={this.props.inputClassName}
                            />
                            <label
                                htmlFor={value}
                                className={this.props.labelClassName}
                            >
                                {label}
                            </label>
                        </span>
                    );
                })}
            </span>
        );
    }
}

ReactRadioButtonGroup.propTypes = {
    options: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.shape({
                value: React.PropTypes.string,
                label: React.PropTypes.string
            }),
            React.PropTypes.string
        ])
    ).isRequired,
    defaultValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    inputClassName: React.PropTypes.string,
    labelClassName:  React.PropTypes.string
};

export default ReactRadioButtonGroup;