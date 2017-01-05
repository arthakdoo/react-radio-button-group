# react-radio-group
Stateful or Stateless React component for a group of radio buttons

<h1> Table of Contents </h1>

<ul>
	<li><a href='#Description'>Description</a></li>
	<li><a href='#Usage'>Usage</a></li>
	<li><a href='#Syntax'>Syntax</a></li>
	<li><a href='#Props'>Props</a>
	    <ul>
		    <li><a href='#options'>options</a></li>
		    <li><a href='#isStateful'>isStateful</a></li>
		    <li><a href='#value'>value</a></li>
		    <li><a href='#onChange'>onChange</a></li>
		    <li><a href='#fireOnMount'>fireOnMount</a></li>
		    <li><a href='#inputClassName'>inputClassName</a></li>
		    <li><a href='#labelClassName'>labelClassName</a></li>
		    <li><a href='#itemClassName'>itemClassName</a></li>
		    <li><a href='#groupClassName'>groupClassName</a></li>
	    </ul>
	</li>
</ul>

<a name='Description'></a>
<h1> Description </h1>
<p>
    This component will generate a group of radio buttons, each enriched with a unique ID and accompanied by a label. It may be stateless or stateful, depending on parameter isStateful. As such it can be used as independent and self-maintained (stateful), or within a managed framework like Redux, Flux etc. (stateless). Please see below <a name='#isStateful'>about isStateful parameter</a> for details.
</p>

<p>
    The generated HTML will look like:
</p>

<pre>
        &lt;div class='<b>groupClassName</b>'}&gt; <span style='color: green'>&lt;!-- div for whole <b>group</b> --&gt;</span>

            &lt;div class='<b>itemClassName</b>'&gt; <span style='color: green'>&lt;!--div for each <b>item</b> --&gt;</span>
                &lt;input type='radio' class='<b>inputClassName</b> id='[unique-id]' name='<b>value</b>' /&gt;
                &lt;label class='<b>labelClassName</b>' for='[unique-id]'&gt;<b>Label</b>&lt;/label&gt;
            &lt;/div&gt;

            ...

        &lt;/div&gt;
    </pre>

<p>
    In other words, as implied in Usage above, this component does not add any FORM element and leaves that entirely to consumer.
</p>

<a name='Usage'></a>
<h1> Usage </h1>
<pre>
    import ReactRadioButtonGroup from 'react-radio-button-group';
    ReactDOM.render(
        &lt;form submit='...'&gt;
            &lt;[other form fields]...&gt;
            <b>&lt;ReactRadioButtonGroup {...props}/&gt;</b>
            &lt;[other form fields]...&gt;
            &lt;button type='submit'&gt;
        &lt;/form&gt;
    );
</pre>

<a name='Syntax'></a>
<h1> Syntax </h1>
<pre>
    &lt;ReactRadioButtonGroup
        options={['One', 'Two', 'Three']} <span style='color: green'>[required param]</span>
        name="number" <span style='color: green'>[required param]</span>
        isStateful={true}</b>
        value="Two"
        onChange={function(checkedValue) {console.log("New value: ", checkedValue);}}
        fireOnMount={false}
        itemClassName="cssForItem"
        inputClassName="cssForInput"
        labelClassName="cssForLabel"
        groupClassName="cssForAll"
    /&gt;
</pre>

<a name='Props'></a>
<h1> Props </h1>

<a name='options'></a>
<h2>options</h2>
<b>Type: array, required</b>
<p>
    An array in which each element specifies a single item in the group (item = option = radio + its label). Each element can be either a <b>string</b> or an <b>object</b> of the following form:
</p>

<pre>
    {
        value: 'apple',                    <span style='color: green'>// required; <b>name</b> attribute of input[type=radio]</span>
        label: 'Apple',                    <span style='color: green'>// <b>text</b> label text; if not specified, uses <b>value</b></span>
        itemClassName: 'radio-group-item', <span style='color: green'>// <b>class</b> attribute of <b>item</b>, the div encompassing input and label</span>
        labelClassName: 'label-item',      <span style='color: green'>// <b>class</b> attribute of <b>label</b></span>
        inputClassName: 'radio-item'       <span style='color: green'>// <b>class</b> attribute of <b>input</b></span>
    }
</pre>

<p>
    If an element of <i>options</i> is only a string, then <em>value</em> and <em>label</em> are both considered to be equal to this string, and itemClassName, labelClassName and inputClassName as unspecified in this element.
</p>

<p>
    String elements and object elements of above shape can be mixed. For example:
</p>

<pre>
    var fruits = [
        '<b>Apple</b>',
        {value: '<b>Mandarin_orange</b>', label: 'Mandarin Orange'},
        {value: 'Pear', label: 'Pear', itemClassName: '<b>pear-item</b>', labelClassName: '<b>pear-label</b>'}
    ];

    &lt;ReactRadioButtonGroup options={options} name="fruit" /&gt;
</pre>

<p>
    ...will yield:
</p>

<pre>
    &lt;div&gt;
        &lt;div&gt;
            &lt;input type='radio' name='fruit' value='<b>Apple</b>'/&gt;
            &lt;label&gt;<b>Apple</b>&lt;/label&gt;
        &lt;/div&gt;

        &lt;div&gt;
            &lt;input type='radio' name='fruit' value='<b>Mandarin_orange</b>'/&gt;
            &lt;label&gt;Mandarin Orange&lt;/label&gt;
        &lt;/div&gt;

         &lt;div class='<b>pear-item</b>'&gt;
            &lt;input type='radio' name='fruit' value='Pear'/&gt;
            &lt;label class='<b>pear-label</b>'&gt;Pear&lt;/label&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/pre&gt;
</pre>

<a name="name"></a>
<h2>name</h2>
<p>
    Attribute `name` for all inputs. This is needed when the radio-group is used within a form, because that is what is going to be sent in POST/GET request.
</p>

<a name='isStateful'></a>
<h2>isStateful</h2>
If isStateful=true, then state is maintained and inputs are controlled by this state. In this case, the <b>value</b> parameter is used only on mount to specify the initialy checked input. Later, use onChange callback to be notified about a new value of the group.

If isStateful=false (default), then state is not maintained and <i>checked</i> status of inputs is controlled purely by <b>value</b> parameter. Use this component in stateless group when you want to integrate it into a Redux framework. The onChange callback will signal when the user is trying to select a different radio button, which you should then use to generate a new <b>value</b> for this component and re-render it. If isStateful is false, the <i>fireOnMount</i> flag (below) has no effect because there is no initial state.

<a name='value'></a>
<h2>value</h2>
<b>Type: string, required</b>
<p>
    The radio button to be checked. The radio button to be checked is specified by its <b>value</b>. In example above, this could be <b>Apple</b> or <b>Mandarin_orange</b>.
</p>

<p>
    Note: This parameter has different meaning depending on value of isStateful parameter - please see description of this parameter for details.
</p>

<a name='onChange'></a>
<h2>onChange</h2>
<b>Type: func, optional</b>
<p>
    A function to be called when a different radio button is selected. If user clicks on a radio button which is already checked, this function will NOT be called. The function will be passed a single parameter - value of the radio button.
</p>

<p>
    Note: This parameter has different meaning depending on value of isStateful parameter - please see description of this parameter for details.
</p>

<a name='fireOnMount'></a>
<h2>fireOnMount</h2>
<b>Type: boolean, optional</b>
<p>
    If set to true and onChange is specified, the onChange function will be called on mount with the defaultValue as parameter.
</p>

<p>
    Note: in case isStateful is set to false, this flag has no effect, because there is no initial state to be fired.
</p>

<a name='inputClassName'></a>
<h2>inputClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate all inputs' <em>class</em> attributes. If any option from <em>options</em> parameter specifies a different inputClassName, it will have priority over this one.
</p>

<a name='labelClassName'></a>
<h2>labelClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate all labels' <em>class</em> attributes. If any option from <em>options</em> parameter specifies a different labelClassName, it will have priority over this one.
</p>

<a name='itemClassName'></a>
<h2>itemClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate all <em>class</em> attributes of <em>div</em>'s containing radio-label groups. If any option from <em>options</em> parameter specifies a different itemClassName, it will have priority over this one.
</p>

<a name='groupClassName'></a>
<h2>groupClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate <em>class</em> attribute of the <em>div</em> encompassing the whole group of items.
</p>
