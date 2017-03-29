# vue-flow-grid

A simple flow grid component for Vue.js.

## How to use

### Install
    npm install vue-flow-grid

### import
    import Vue from 'vue'
    import FlowGrid from 'vue-flow-grid'
    Vue.use(FlowGrid);

### Example

```html
<ul v-flowgrid="3">
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Eum at possimus eos soluta.</li>
    <li>Veniam quidem, repudiandae blanditiis vitae.</li>
    <li>Et ratione, nobis placeat corporis.</li>
    <li>Facere dolore, tenetur incidunt facilis.</li>
    <li>Quis obcaecati a qui iusto.</li>
    <li>Necessitatibus, illum odit eius cum?</li>
    <li>Vel nisi vero eos velit?</li>
</ul>
```

The code above will be transformed to:

```html
<ul>
    <div style="width: 33.3333%; float: left;">
        <li style="visibility: visible;">Lorem ipsum dolor sit amet.</li>
        <li style="visibility: visible;">Et ratione, nobis placeat corporis.</li>
        <li style="visibility: visible;">Necessitatibus, illum odit eius cum?</li>
    </div>
    <div style="width: 33.3333%; float: left;">
        <li style="visibility: visible;">Veniam quidem, repudiandae blanditiis vitae.</li>
        <li style="visibility: visible;">Facere dolore, tenetur incidunt facilis.</li>
        <li style="visibility: visible;">Vel nisi vero eos velit?</li>
    </div>
    <div style="width: 33.3333%; float: left;">
        <li style="visibility: visible;">Eum at possimus eos soluta.</li>
        <li style="visibility: visible;">Quis obcaecati a qui iusto.</li>
    </div>
    <i style="clear: both;"></i>
</ul>
```
### TODO LIST
  - test
  - lazyload
