module.exports = {
    version: '1.0.0',
    install: installVFlowGrid
};

function installVFlowGrid(Vue, options) {
    const INIT_FLAG = 'vflowgrid';

    /**
     * this will decide whether to update DOM
     */
    const shouldUpdate = (el, binding, vnode, oldVnode) => {
        const initialized     = () => !!el.getAttribute(INIT_FLAG);
        const bindingChanged  = () => binding.value !== binding.oldValue;
        const childrenChanged = () => vnode.children.length !== oldVnode.children.length;
        return !initialized() || bindingChanged() || childrenChanged();
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

    Vue.directive('flowgrid', {
        /**
         * hide each item as soon as they are inserted
         * to avoid flash of content.
         * here we use `visibility: hidden` instead of
         * `display: none`, because offsetHeight of items
         * are required when calculating
         */
        inserted: function (el, binding, vnode) {
            Array.from(el.children).forEach(li => li.style.visibility = 'hidden');
        },

        /**
         * on update
         */
        componentUpdated: function (el, binding, vnode, oldVnode) {
            // avoid unneccesary updates
            if (!shouldUpdate(el, binding, vnode, oldVnode)) {
                return;
            }

            // grids
            const items = vnode.children.map(i => i.elm);

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
            columns.map(c => el.appendChild(c));

            // start to append items
            items.forEach((item, i) => {
                columns[i < colNum ? i : getAppendCol(columns)].appendChild(item);
                item.style.visibility = 'visible';
            });

            // clearfix
            el.appendChild(clearfix());
        }
    });
}