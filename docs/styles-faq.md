# FAQ on Frontend Styling

This is a document to provide some rules to how you should approach 
the frontend when it comes to CSS.

## Applying Global CSS

Global CSS lives in the `App.vue` file (this may change) and is non-scoped. Rules in
this file permeate throughout the entire application and thus adding or removing
styles here should be avoided where possible.

That said, there are valid reasons to populate the global CSS scope. 
Things like resetting default browser styles, 'theme' level effects, 
and anything that needs to apply to the entire application that can't 
be seperated into a component (too narrow) or a `--var` (applies to more that one field or tag).

```css
/* examples of things that should live in global */
li {
    /* Application specific to override defaults */
    list-style-type: none;
}

/* normalising style behaviour across browsers */
html, body {
    margin: 0;
    padding: 0;
}
```

## Applying Component level CSS

Most of the time you'll want to apply CSS at the component level. You're creating a button
say and it needs a number of specific styles. These styles are _unique_ to the button
and will allow the button to retain a consistent look and feel throughout the application.

Here the best option is to use scoped styles inside the component. Nothing outside the
component will then be affected, and the component will always look the same
wherever it's used.

This could be a number of class, tag rules that combine together to make
your component look nice.

```css
/* maybe something like this I dunno */
.button-container {
    margin: 10px;
}

.button {
    font: inherit;
}

.button:hover {
    background-color: black;
}
```
## Applying --var styles for specific properties (Kinda global CSS)

Regular ole' CSS also allows the use of --var syntax to create a defined CSS property style that can be reused. This is useful if you're creating a rule, closer to the theme level
but shouldn't necessarily apply to all elements; that is you want more fine-grain control
on the application of the style. These should apply to; generally a specific element
or the `:root` tag if it's non-specific.

An example of this might be a specific type of header styling that you only want to apply
in some areas or a colour.

```css
:root {
  --border: 2px solid #f5f5f5;
  --border-dark: 2px solid rgba(129, 178, 178, 0.25);
  --theme: #00a99d;
}

/* Then later...*/
.special-text {
    color: var(--theme);
    border: var(--border);
}
```