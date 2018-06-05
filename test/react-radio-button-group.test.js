import React from 'react';
import ReactRadioButtonGroup from '../src/react-radio-button-group';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import sinon from 'sinon';

test("Three text options yield three labels", () => {
    expect(
        renderer.create(
            <ReactRadioButtonGroup
                name='media'
                options={["TV", "Radio", "Youtube"]}/>
        ).toJSON()
    ).toMatchSnapshot();
});

test("Value provided means checked input", () => {
    expect(
        renderer.create(
            <ReactRadioButtonGroup
                name='media'
                options={["TV", "Radio", "Youtube"]}
                value="Radio"/>
        ).toJSON()
    ).toMatchSnapshot();
});

test("CSS classes all placed accordingly", () => {
    expect(
        renderer.create(
            <ReactRadioButtonGroup
                name='media'
                options={["TV", "Radio", "Youtube"]}
                value="Radio"
                groupClassName='cssGroup' itemClassName='cssItem'
                labelClassName='cssLabel' inputClassName='cssInput'/>
        ).toJSON()
    ).toMatchSnapshot();
});

test("CSS in option is stronger than general CSS", () => {
    expect(
        renderer.create(
            <ReactRadioButtonGroup
                name='media'
                options={
                [
                    {
                        value: "TV",
                        itemClassName: "cssItemTV",
                        labelClassName: "cssLabelTV"
                    },
                    {
                        value: "Youtube",
                        inputClassName: "cssInputYoutube"
                    },
                    "Radio"
                ]}
                value="Radio"
                groupClassName='cssGroup' itemClassName='cssItem'
                labelClassName='cssLabel' inputClassName='cssInput'/>
        ).toJSON()
    ).toMatchSnapshot();
});

test("Label is used when present, not value", () => {
    expect(
        renderer.create(
            <ReactRadioButtonGroup
                name='media'
                options={[
                    { value: "TV",      label: "Television" },
                    { value: "Youtube", label: "YouTube" },
                    { value: "Radio",   label: "Radio Station" }
                ]}/>
        ).toJSON()
    ).toMatchSnapshot();
});

test("fireOnMount set to true causes onChange when mounted", () => {
    const spy = sinon.spy();
    const group = mount(
        <ReactRadioButtonGroup
            name='media'
            options={["One", "Two", "Three"]}
            fireOnMount={true}
            isStateful={true}
            onChange={spy}
        />
    );
    expect(spy.callCount).toEqual(1);
});

test("fireOnMount not fired when stateless mode", () => {
    const spy = sinon.spy();
    const group = mount(
        <ReactRadioButtonGroup
            name='media'
            options={["One", "Two", "Three"]}
            fireOnMount={true}
            onChange={spy}
        />
    );
    expect(spy.callCount).toEqual(0);
});

test("onChange works correctly when radio clicked", () => {
    const spy = sinon.spy();
    const group = mount(
        <ReactRadioButtonGroup
            name='media'
            options={["One", "Two", {value: "Three", inputClassName: "cssThree"}]}
            isStateful={true}
            onChange={spy}
        />
    );
    expect(spy.callCount).toEqual(0);
    group.find('.cssThree').simulate('change');
    expect(spy.callCount).toEqual(1);
    expect(spy.firstCall.args.length).toEqual(1);
    expect(spy.firstCall.args[0]).toEqual('Three');
});


test("Clicking on an input in stateless mode has no independent effect", () => {
    const spy = sinon.spy();
    const group = mount(
        <ReactRadioButtonGroup
            name='media'
            options={[
                { value: "One", inputClassName: "cssOne" },
                "Two",
                { value: "Three", inputClassName: "cssThree" }
            ]}
            value="One"
            onChange={spy}
        />
    );
    group.find('.cssThree').simulate('change');
    expect(spy.callCount).toEqual(1);
    expect(spy.firstCall.args.length).toEqual(1);
    expect(spy.firstCall.args[0]).toEqual('Three');

    expect(group.find('.cssOne').  props().checked).toBe(true);
    expect(group.find('.cssThree').props().checked).toBe(false);
});

test("Clicking on an input in stateful mode has immediate effect", () => {
    const spy = sinon.spy();
    const group = mount(
        <ReactRadioButtonGroup
            name='media'
            options={[
                { value: "One", inputClassName: "cssOne" },
                "Two",
                { value: "Three", inputClassName: "cssThree" }
            ]}
            value="One"
            isStateful={true}
            onChange={spy}
        />
    );
    expect(group.find('.cssOne').props().checked).toBe(true);
    group.find('.cssThree').simulate('change');
    expect(spy.callCount).toEqual(1);
    expect(spy.firstCall.args.length).toEqual(1);
    expect(spy.firstCall.args[0]).toEqual('Three');

    expect(group.find('.cssOne').  first().props().checked).toBe(false);
    expect(group.find('.cssThree').first().props().checked).toBe(true);
});

test("Passing invalid onChange function does not crash and means no callback", () => {
    const group = mount(
        <ReactRadioButtonGroup
            name='media'
            options={["One", "Two", "Three"]}
            value="One"
            onChange={null}
        />
    );
    group.find('input').first().simulate('change');
    expect(2 + 2).toEqual(4);
});

test("Test disabled prop works", () => {
    expect(
        renderer.create(
            <ReactRadioButtonGroup
                name='media'
                options={["TV", "Radio", "Youtube"]}
                disabled={true}/>
        ).toJSON()
    ).toMatchSnapshot();
});
