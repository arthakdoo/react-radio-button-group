import React from 'react';

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
                    const isChecked = this.state.currentValue === option.value;
                    return (
                        <span key={option.value}>
                            <input
                                type="radio"
                                checked={isChecked}
                                id={option.value}
                                onChange={this.handleChange}
                                className={this.props.inputClassName}
                            />
                            <label
                                htmlFor={option.value}
                                className={this.props.labelClassName}
                            >
                                {option.label}
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
        React.PropTypes.shape({
            value: React.PropTypes.string,
            label: React.PropTypes.string
        })
    ).isRequired,
    defaultValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    inputClassName: React.PropTypes.string,
    labelClassName:  React.PropTypes.string
};

export default ReactRadioButtonGroup;