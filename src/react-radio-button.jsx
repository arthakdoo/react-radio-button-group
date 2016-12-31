import React from 'react';
import {isString} from './util';
import {getUniqueId} from './util';

export default class ReactRadioButton extends React.Component {
    render() {
        const option = this.props.option;
        const value = isString(option) ? option : option.value;
        const label = isString(option) ? option : option.label;

        const inputClassName = option.inputClassName || this.props.inputClassName || '';
        const labelClassName = option.labelClassName || this.props.labelClassName || '';
        const itemClassName = option.itemClassName || this.props.itemClassName || '';

        const inputId = getUniqueId(value);

        return (
            <div className={itemClassName}>
                <input
                    type="radio"
                    checked={this.props.checked}
                    id={inputId}
                    onChange={this.props.onChange}
                    className={this.props.inputClassName}
                    name={value}/>
                <label htmlFor={inputId} className={labelClassName}>
                    {label}
                </label>
            </div>
        );
    }
}

