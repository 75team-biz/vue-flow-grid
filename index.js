import deepDiff from 'deep-diff';

export default {
    version: '1.0.0',
    install: installVFlowGrid
};

const INIT_FLAG = 'vflowgrid';

/**
 * this will decide whether to update DOM
 */
const shouldUpdate = (el, binding, vnode, oldVnode) => {
    const attr = +binding.value;

    if (isNaN(attr) || attr <= 0 || Math.round(attr) !== attr) {
        console.warn('the value `v-flow-grid` must be a positive integer');
        return false;
    }

    // initializing, or attr changes
    if (!el.getAttribute(INIT_FLAG) || attr !== binding.oldValue) {
        return true;
    }

    const diff = deepDiff(vnode.children, oldVnode.children);
    return !!(diff && diff.length);
};

/**
 * calculate appropriate index of the column to which
 * we should append the next item
 */
const getAppendCol = function (columns) {
    let minH = columns[0].offsetHeight;
    return columns.slice(1).reduce((accu, col, i) => {
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
const clearfix = (el) => {
    const cf = document.createElement('i');
    const style = cf.style;
    style.clear = 'both';
    style.visibility = 'hidden';
    style.width = 0;
    style.height = 0;
    return cf;
};

function installVFlowGrid(Vue, options) {
    const checkUpdate = function (el, binding, vnode, oldVnode) {
        // avoid unneccesary updates
        if (shouldUpdate(el, binding, vnode, oldVnode)) {
            Vue.nextTick(() => {
                reflow(el, binding, vnode, oldVnode);
            });
        }
    };

    Vue.directive('flowgrid', {
        inserted(el, binding, vnode, oldVnode) {
            /**
             * hide each item as soon as they are inserted
             * to avoid flash of content.
             * here we use `visibility: hidden` instead of
             * `display: none`, because offsetHeight of items
             * are required when calculating
             */
            Array.from(el.children).forEach(li => {
                li.style && (li.style.visibility = 'hidden');
            });

            // do reflow
            checkUpdate(el, binding, vnode, oldVnode);
        },
        componentUpdated: checkUpdate
    });
}

function reflow(el, binding, vnode, oldVnode) {
    // grids
    const items = vnode.children.reduce((accu, item) => {
        if (!!item.tag) {
            accu.push(item.elm);
        }
        return accu;
    }, []);
    
    if (items.length === 0) {
        return;
    }

    // colums
    const colNum  = binding.value;
    const columns = Array.from({ length: colNum }, () => {
        const col = document.createElement('div');
        col.style.width = `${100 / colNum}%`;
        col.style.float = 'left';
        return col;
    });

    // mark `el` as initialized
    el.setAttribute(INIT_FLAG, true);

    // remove elements first
    Array.from(el.children).map(item => el.removeChild(item));

    // append col to element
    columns.forEach(c => el.appendChild(c));

    // start to append items
    items.forEach((item, i) => {
        columns[i < colNum ? i : getAppendCol(columns)].appendChild(item);
    });

    // show items at one time
    items.forEach(item => {
        item.style && (item.style.visibility = 'visible');
    });

    // clearfix
    el.appendChild(clearfix());
}
