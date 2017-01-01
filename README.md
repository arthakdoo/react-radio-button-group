# react-radio-group
React component for a group of radio buttons

<h1> Dependencies </h1>

<ul>
<li>react</li>
<li>babel-core</li>
<li>babel-loader</li>
<li>babel-preset-es2015</li>
<li>babel-preset-react</li>
<li>react</li>
</ul>

<h1> Installation </h1>
<pre>
    npm install react-radio-button-group
</pre>

<h1> Usage </h1>
<pre>
    import ReactRadioButtonGroup from 'react-radio-button-group';

    ...

    &lt;form submit='...'&gt;
        &lt;[other form fields]...&gt;

        <b>&lt;ReactRadioButtonGroup {...props}/&gt;</b>

        &lt;[other form fields]...&gt;
        &lt;button type='submit'&gt;
    &lt;/form&gt;
</pre>

<h1> Syntax </h1>
<pre>
    &lt;<b>ReactRadioButtonGroup</b>
        <b>options</b>=array(string | {value <span style='color: green'>[required]</span>, label, itemClassName, inputClassName, labelClassName}) <span style='color: green'>[required]</span>
        <b>defaultValue</b>=string <span style='color: green'>[required]</span>
        <b>onChange</b>=func(checkedValue)
        <b>fireOnMount</b>=true|false
        <b>itemClassName</b>=string
        <b>inputClassName</b>=string
        <b>labelClassName</b>=string
        <b>groupClassName</b>=string
    /&gt;
</pre>

<h1> Description </h1>
<p>
    This component will generate a group of radio buttons, each enriched with a unique ID and accompanied by a label.
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

<h1> Props </h1>
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
    var options = [
        '<b>Apple</b>',
        {value: '<b>Mandarin_orange</b>', label: 'Mandarin Orange'},
        {value: 'Pear', label: 'Pear', itemClassName: '<b>pear-item</b>', labelClassName: '<b>pear-label</b>'}
    ];
    &lt;ReactRadioButtonGroup options={options}/&gt;
</pre>

<p>
    ...will yield:
</p>

<pre>
    &lt;div&gt;
        &lt;div&gt;
            &lt;input type='radio' name='<b>Apple</b>'/&gt;
            &lt;label&gt;<b>Apple</b>&lt;/label&gt;
        &lt;/div&gt;

        &lt;div&gt;
            &lt;input type='radio' name='<b>Mandarin_orange</b>'/&gt;
            &lt;label&gt;Mandarin Orange&lt;/label&gt;
        &lt;/div&gt;

         &lt;div class='<b>pear-item</b>'&gt;
            &lt;input type='radio' name='Pear'/&gt;
            &lt;label class='<b>pear-label</b>'&gt;Pear&lt;/label&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/pre&gt;
</pre>

<h2>defaultValue</h2>
<b>Type: string, required</b>
<p>
    The radio button to be checked on mount. The radio button to be checked is specified by its <b>value</b>. In example above, this could be <b>Apple</b> or <b>Mandarin_orange</b>.
</p>

<h2>onChange</h2>
<b>Type: func, optional</b>
<p>
    A function to be called when a different radio button is selected. If user clicks on a radio button which is already checked, this function will NOT be called. The function will be passed a single parameter - value of the newly checked radio button.
</p>

<h2>fireOnMount</h2>
<b>Type: boolean, optional</b>
<p>
    If set to true and onChange is specified, the onChange function will be called on mount with the defaultValue as parameter.
</p>

<h2>inputClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate all inputs' <em>class</em> attributes. If any option from <em>options</em> parameter specifies a different inputClassName, it will have priority over this one.
</p>

<h2>labelClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate all labels' <em>class</em> attributes. If any option from <em>options</em> parameter specifies a different labelClassName, it will have priority over this one.
</p>

<h2>itemClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate all <em>class</em> attributes of <em>div</em>'s containing radio-label groups. If any option from <em>options</em> parameter specifies a different itemClassName, it will have priority over this one.
</p>

<h2>groupClassName</h2>
<b>Type: string, optional</b>
<p>
    If specified, it will populate <em>class</em> attribute of the <em>div</em> encompassing the whole group of items.
</p>


