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

<h1> Description </h1>
<p>
    This component will generate a group of radio buttons, each enriched with a unique ID and accompanied by a label.
</p>

<p>
    The generated HTML will look like:
</p>

<pre>
        &lt;div&gt; <span class='comment'>&lt;!-- div for whole <b>group</b> --&gt;</span>

            &lt;div&gt; <span class='comment'>&lt;!--div for each <b>item</b> --&gt;</span>
                &lt;input type='radio' id='[ID]' name='[VALUE]' .../&gt;
                &lt;label for='[ID]'&gt;Label&lt;/label&gt;
            &lt;/div&gt;

            &lt;div&gt; <span class='comment'>&lt;!--div for <i>another</i> item --&gt;</span>
                &lt;input type='radio' id='[ID]' name='[VALUE]' .../&gt;
                &lt;label for='[ID]'&gt;Label&lt;/label&gt;
            &lt;/div&gt;

            ...

        &lt;/div&gt;
    </pre>

<p>
    In other words, as implied in Usage above, this component does not add any FORM element and leaves that entirely to consumer.
</p>

<h1> Props </h1>
<h2>options</h2>
<b>Type: array</b>
<p>
    An array in which each element specified a single radio button + label item. Each element can be either a <b>string</b> or an <b>object</b> of the following form:
</p>

<pre>
    {
        value: 'apple',                    <span class='comment'>// <b>name</b> attribute of input[type=radio]</span>
        label: 'Apple',                    <span class='comment'>// <b>text</b> contents of the accompanying label</span>
        itemClassName: 'radio-group-item', <span class='comment'>// <b>class</b> attribute of <b>item</b>, the div encompassing input and label</span>
        labelClassName: 'label-item',      <span class='comment'>// <b>class</b> attribute of <b>label</b></span>
        inputClassName: 'radio-item'       <span class='comment'>// <b>class</b> attribute of <b>input</b></span>
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
<b>Type: string</b>
<p>
    The radio button to be checked on mount. The radio button to be checked is specified by its <b>value</b>. In example above, this could be <b>Apple</b> or <b>Mandarin_orange</b>.
</p>

<h2>onChange</h2>
<b>Type: func</b>
<p>
    A function to be called when a different radio button is selected. If user clicks on a radio button which is already checked, this function will NOT be called. The function will be passed a single parameter - value of the newly checked radio button.
</p>

<h2>fireOnMount</h2>
<b>Type: boolean</b>
<p>
    If set to true and onChange is specified, the onChange function will be called on mount with the defaultValue as parameter.
</p>

<h2>inputClassName</h2>
<b>Type: string</b>
<p>
    If specified, it will populate all inputs' <em>class</em> attributes. If any option from <em>options</em> parameter specifies a different inputClassName, it will have priority over this one.
</p>

<h2>labelClassName</h2>
<b>Type: string</b>
<p>
    If specified, it will populate all labels' <em>class</em> attributes. If any option from <em>options</em> parameter specifies a different labelClassName, it will have priority over this one.
</p>

<h2>itemClassName</h2>
<b>Type: string</b>
<p>
    If specified, it will populate all <em>class</em> attributes of <em>div</em>'s containing radio-label groups. If any option from <em>options</em> parameter specifies a different itemClassName, it will have priority over this one.
</p>


