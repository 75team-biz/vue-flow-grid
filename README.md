# vue-flow-grid
A simple flow grid component for Vue.js

## How to use

### Install
    npm install vue-flow-grid

### import
    import Vue from 'vue'
    import FlowGrid from 'vue-flow-grid'
    Vue.use(FlowGrid);

### example

    <ul v-flowgrid="3">
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>
        <li>666</li>
        <li>777</li>
        <li>888</li>
    </ul>
  
The code above will be compiled to:

    <ul>
        <div id="vFlowgrid1" style="width: 20%; float: left;">
            <li>111</li>
            <li>444</li>
            <li>777</li>
        </div>
        <div id="vFlowgrid2" style="width: 20%; float: left;">
            <li>222</li>
            <li>555</li>
            <li>888</li>
        </div>
        <div id="vFlowgrid3" style="width: 20%; float: left;">
            <li>333</li>
            <li>666</li>
        </div>
    </ul>
  
  
  
### TODO LIST
  - test
  - lazyload
