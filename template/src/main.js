import Vue from 'vue';
import ElementUI from 'element-ui';
import router from '@/router';
import filters from '@/filters';
import utils from '@/utils';
import store from '@/store';
import plugins from '@/plugins';
import bus from '@/utils/bus';
import mixins from '@/mixins';
import '@/components';
import {
  Panel,
  CollapseTransition,
  Sidebar,
  VMenu,
  VSubmenu
} from 'cd-vue';

import '@/assets/styles/element-variables.scss';
import '@/assets/styles/main.less';

Vue.use(filters);
Vue.use(plugins);
Vue.use(ElementUI);
Vue.use(bus);

Vue.component('cd-panel', Panel);
Vue.component('el-collapse-transition', CollapseTransition);
Vue.component('cd-sidebar', Sidebar);
Vue.component('cd-v-menu', VMenu);
Vue.component('cd-v-submenu', VSubmenu);

Vue.mixin(mixins);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const a = new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view></router-view>',
});

console.log(a);