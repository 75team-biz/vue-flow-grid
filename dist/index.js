(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.FlowGrid = factory());
}(this, (function () { 'use strict';

var index = {
    version: '1.0.0',
    install: installVFlowGrid
};

var INIT_FLAG = 'vflowgrid';

/**
 * this will decide whether to update DOM
 */
var shouldUpdate = function (el, binding, vnode, oldVnode) {
    var attr = +binding.value;

    if (isNaN(attr) || attr <= 0 || Math.round(attr) !== attr) {
        console.warn('the value `v-flow-grid` must be a positive number');
        return false;
    }

    var initialized     = function () { return !!el.getAttribute(INIT_FLAG); };
    var bindingChanged  = function () { return attr !== binding.oldValue; };
    var childrenChanged = function () { return vnode.children.length !== oldVnode.children.length; };
    return !initialized() || bindingChanged() || childrenChanged();
};

/**
 * calculate appropriate index of the column to which
 * we should append the next item
 */
var getAppendCol = function (columns) {
    var minH = columns[0].offsetHeight;
    return columns.slice(1).reduce(function (accu, col, i) {
        if (col.offsetHeight < minH) {
            minH = col.offsetHeight;
            accu = i + 1;
        }
        return accu;
    }, 0);
};

/**
 * add an element for clearfix
 */
var clearfix = function (el) {
    var cf = document.createElement('i');
    var style = cf.style;
    style.clear = 'both';
    style.visibility = 'hidden';
    style.width = 0;
    style.height = 0;
    return cf;
};

function installVFlowGrid(Vue, options) {
    Vue.directive('flowgrid', {
        inserted: function (el, binding, vnode, oldVnode) {
            /**
             * hide each item as soon as they are inserted
             * to avoid flash of content.
             * here we use `visibility: hidden` instead of
             * `display: none`, because offsetHeight of items
             * are required when calculating
             */
            Array.from(el.children).forEach(function (li) {
                li.style && (li.style.visibility = 'hidden');
            });

            // do reflow
            reflow(el, binding, vnode, oldVnode);
        },
        componentUpdated: reflow
    });
}

function reflow(el, binding, vnode, oldVnode) {
    // avoid unneccesary updates
    if (!shouldUpdate(el, binding, vnode, oldVnode)) {
        return;
    }

    // grids
    var items = vnode.children.reduce(function (accu, item) {
        if (!!item.tag) {
            accu.push(item.elm);
        }
        return accu;
    }, []);
    
    if (items.length === 0) {
        return;
    }

    // colums
    var colNum  = Math.min(binding.value, items.length);
    var columns = Array.from({ length: colNum }, function () {
        var col = document.createElement('div');
        col.style.width = (100 / colNum) + "%";
        col.style.float = 'left';
        return col;
    });

    // mark `el` as initialized
    el.setAttribute(INIT_FLAG, true);

    // remove elements first
    Array.from(el.children).map(function (item) { return el.removeChild(item); });

    // append col to element
    columns.map(function (c) { return el.appendChild(c); });

    // start to append items
    items.forEach(function (item, i) {
        columns[i < colNum ? i : getAppendCol(columns)].appendChild(item);
        item.style && (item.style.visibility = 'visible');
    });

    // clearfix
    el.appendChild(clearfix());
}

return index;

})));
//# sourceMappingURL=index.js.map
