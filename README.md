# vue-awesome-grid

[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

# Build the component

```
$ npm install
$ npm run build
```

> **Component is build to**
> - CommonJS/UMD javascript module
> - an ES6 javascript module

# Usage

```js
import Vue from 'vue';
import VueAwesomeGrid from 'vue-awesome-grid';

Vue.use(VueAwesomeGrid);
```

## Tip: too many `props` to pass? [`v-bind`](https://vuejs.org/v2/api/#v-bind) can help

```html
<template>
  <div>
    <!-- Too much code: -->
    <simple-component
      :g="1"
      :r="2"
      :i="3"
      :d="4">
    </simple-component>

    <!-- Do the same thing but simplier -->
    <simple-component v-bind="$data" />
  </div>
</template>
<script>
export default {
  data: () => ({
    g: '1',
    r: '2',
    i: '3',
    d: '4'
  });
}
</script>
```

# How it works?
[demo](https://meold.github.io/vue-awesome-grid/)


# Reference

## VueAwesomeGrid `props`

| Property | Description | Type| Default | Mandatory |
|---|---|---|---|---|
| columns | definition of columns (see below) | array | - | Yes |
| data | data of the current page | array | - | Yes |
| total | total number of the records (if set to 0, then total block is disabled) | number | 0 | Yes |
| filtered | total number of filtered records | number | - | No |
| query | query object | object | - | Yes |
| summary | summary row | HTMLTableRowElement | - | No |
| headerSettings | whether to render headerSettings | boolean | true | No |
| pagination | whether to render pagination | boolean | true | No |
| pageSizeOptions | options for page size select | array | [10, 25, 100] | No |
| extraProps | object for extra props, which will be passed to dynamic components | object | - | No |

## `columns`

| Key | Description | Type | Default | Mandatory |
|---|---|---|---|---|
| title | displayed title of column | string | - | Yes |
| label | label in headerSettings (`title` will take its place if not set) | string | - | No |
| field | field name of the row in `data` structure | string | - | No |
| sortable | is sortable? | boolean | false | No |
| visible | is visible? | boolean | true | No |
| tdComp | dynamic component for 'td' | string/object | - | No |
| tdClass | classes for `td` | string or function(value, row) | - | No |
| tdStyle | inline styles for `td` | object | - | No |
| thClass | classes for `th` | string | - | No |
| render | formatting functions for display | function(value, row) | - | No |
| clickEvent | callback cell clicked | function(value, row) | - | No |

## `query`

| Key | Description | Type | Default |
|---|---|---|---|
| limit | count of entries to return | number | 10 |
| offset | return data since this entry number | number | 0 |
| order | direction, `asc` or `desc` | string | "" |
| sort | sort field name | string | "" |
| search | search string | string | "" |

And anything else you might need (this parameters must be implemented in backend).

## `summary`

Row that is located at the bottom of the table and shows additional resulting information about the data.
By default, the summary row is not showing.
To show it you must set it to object with similar structure, as the row in table.

## `extraProps`

Is used to pass additional properties to nested components.
For example, you can pass bus object for events.

## `ROW_UPDATED`

If the data of one row is updated and you don't need to update the whole data object, you can call `ROW_UPDATED` event to update only one row.
You must pass one parameter to event with the folowing structure: `{ id: idValue, data: newRowData}`.
