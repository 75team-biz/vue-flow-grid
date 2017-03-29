import fs from 'fs';
import path from 'path';
import test from 'ava';
import { jsdom } from 'jsdom';

const loadScript = url => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = url;
  script.onload = resolve;
  script.onerror = reject;
  document.body.appendChild(script);
});

const htmlPath = path.join(process.cwd(), './test/test.html');
const window   = jsdom(fs.readFileSync(htmlPath)).defaultView;
const document = window.document;

const TEMPLATE = `
<ul v-flowgrid="colNum">
    <li>
      <div style="width: 300px;">1</div>
    </li>
    <li>
      <div style="width: 500px;">2</div>
    </li>
    <li>
      <div style="width: 600px;">3</div>
    </li>
    <li>
      <div style="width: 400px;">4</div>
    </li>
    <li>
      <div style="width: 250px;">5</div>
    </li>
    <li>
      <div style="width: 102px;">6</div>
    </li>
    <li>
      <div style="width: 330px;">7</div>
    </li>
    <li>
      <div style="width: 1300px;">8</div>
    </li>
    <li>
      <div style="width: 290px;">9</div>
    </li>
    <li>
      <div style="width: 40px;">10</div>
    </li>
    <li>
      <div style="width: 300px;">11</div>
    </li>
</ul>`;

import vueFlowGrid from '../index';

test.serial('点击测试', async t => {
  await loadScript('http://lib.baomitu.com/vue/2.2.6/vue.min.js');

  if (!window.Vue) {
    t.fail();
  }

  const Vue = window.Vue;
  Vue.use(vueFlowGrid);
  const vm = new Vue({
    template: TEMPLATE,
    colNum: 5
  }).$mount('#app');
  console.log(document.body.innerHTML);
  vm.colNum = 6;
  console.log(document.body.innerHTML);
  t.pass();
});
