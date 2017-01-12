;(function () {

  var vFlowGrid = {}

  vFlowGrid.install = function (Vue, options) {
    Vue.directive('flowgrid', {
        componentUpdated: function (el, binding, vnode) {
            options = options || {}

            //只运行一次
            if (el.querySelector("#vFlowgrid1")) {
                return;
            }

            //瀑布流要展示的项目
            var items = [];
            while(el.childNodes.length) {
                items.unshift(el.removeChild(el.childNodes[--el.childNodes.length]));
            }
            var itemCount = items.length;
            //瀑布流及数目
            var grids = [];
            var gridCount = binding.value;

            //插入gridCount数量的瀑布
            for (var i=0; i<gridCount; i++) {
                var grid = document.createElement("div");
                grid.id = "vFlowgrid" + (i+1);
                grid.style.width = 100/gridCount + '%';
                grid.style.float = 'left';
                grids.push(grid);
                el.appendChild(grid);
            }

            //获取下一个需要插入项目的瀑布
            function getNextAppendGrid() {
                var smallest = el.childNodes[0].offsetHeight;
                var smallestIndex = 0;
                Array.prototype.forEach.call(el.childNodes, (grid, index) => {
                    if(grid.offsetHeight < smallest) {
                        smallest = grid.offsetHeight;
                        smallestIndex = index;
                    }
                });
                return smallestIndex;
            }

            //按顺序插入所有item
            for (var i=0; i<itemCount; i++) {
                if (i<gridCount) {
                    el.childNodes[i].appendChild(items[i]);
                } else {
                    var appendGridIndex = getNextAppendGrid();
                    el.childNodes[appendGridIndex].appendChild(items[i]);
                }
            }

            //清除浮动
            var clearfix = document.createElement("div");
            clearfix.style.clear = 'both';
            el.appendChild(clearfix);
        }
    })
  }

  if (typeof exports == "object") {
    module.exports = vFlowGrid
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vFlowGrid
    })
  } else if (window.Vue) {
    window.vFlowGrid = vFlowGrid
    Vue.use(vFlowGrid)
  }

})()
