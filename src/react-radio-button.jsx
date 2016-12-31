import React from 'react';
import {isString} from './util';
import {getNonEmptyAttr} from './util';

const ComponentName = 'react-radio-button-group';
export const getUniqueId = (groupId, value) => ComponentName + '-' + groupId + '-' + value;

const CLASS_NAME = 'className';

export default class ReactRadioButton extends React.Component {
    render() {
        const option = this.props.option;
        const value = isString(option) ? option : option.value;
        const label = isString(option) ? option : option.label;

        const itemClassName = option.itemClassName || this.props.itemClassName || '';
        const inputClassName = option.inputClassName || this.props.inputClassName || '';
        const labelClassName = option.labelClassName || this.props.labelClassName || '';

        const inputId = getUniqueId(this.props.groupId, value);

        return (
            <div {...getNonEmptyAttr(CLASS_NAME, itemClassName)}>
                <input
                    type="radio"
                    checked={this.props.checked}
                    id={inputId}
                    onChange={this.props.onChange}
                    {...getNonEmptyAttr(CLASS_NAME, inputClassName)}
                    name={value}/>
                <label
                    htmlFor={inputId}
                    {...getNonEmptyAttr(CLASS_NAME, labelClassName)}>
                        {label}
                </label>
            </div>
        );
    }
}

