import React from 'react';
import {getNonEmptyAttr} from './util';
import {selectStringParam} from './util';

export const getUniqueId = (groupId, value) => groupId + '-' + value;

const CLASS_NAME = 'className';

export default class ReactRadioButton extends React.Component {
    render() {
        const option = this.props.option;

        const label = selectStringParam(option, option.label, this.props.value);

        const itemClassName = selectStringParam(option.itemClassName, this.props.itemClassName, '');
        const inputClassName = selectStringParam(option.inputClassName, this.props.inputClassName, '');
        const labelClassName = selectStringParam(option.labelClassName, this.props.labelClassName, '');

        const inputId = getUniqueId(this.props.groupId, this.props.value);

        return (
            <div {...getNonEmptyAttr(CLASS_NAME, itemClassName)}>
                <input type={this.props.inputType}
                    checked={this.props.isChecked}
                    id={inputId}
                    onChange={this.props.onChange}
                    {...getNonEmptyAttr(CLASS_NAME, inputClassName)}
                    value={this.props.value}
                    name={this.props.name}
                />
                <label
                    htmlFor={inputId}
                    {...getNonEmptyAttr(CLASS_NAME, labelClassName)}>
                        {label}
                </label>
            </div>
        );
    }
}

