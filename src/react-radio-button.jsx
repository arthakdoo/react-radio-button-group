import React from 'react';
import {getNonEmptyAttr} from './util';
import {selectStringParam} from './util';

const ComponentName = 'react-radio-button-group';
export const getUniqueId = (groupId, value) => ComponentName + '-' + groupId + '-' + value;

const CLASS_NAME = 'className';

export default class ReactRadioButton extends React.Component {
    render() {
        const option = this.props.option;

        const value = selectStringParam(option, option.value);
        const label = selectStringParam(option, option.label, value);

        const itemClassName = selectStringParam(option.itemClassName, this.props.itemClassName, '');
        const inputClassName = selectStringParam(option.inputClassName, this.props.inputClassName, '');
        const labelClassName = selectStringParam(option.labelClassName, this.props.labelClassName, '');

        const inputId = getUniqueId(this.props.groupId, value);
        const isChecked = this.props.currentValue === value;

        return (
            <div {...getNonEmptyAttr(CLASS_NAME, itemClassName)}>
                <input type="radio"
                    checked={isChecked}
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

