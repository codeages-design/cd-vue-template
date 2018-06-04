import Vue from 'vue';
import panel from './panel/';
import modal from './modal/';
import tableList from './table/index';
import form from './form/index';
import pagination from './pagination/index';

Vue.component('x-panel', panel);
Vue.component('x-modal', modal);
Vue.component('x-table', tableList);
Vue.component('x-pagination', pagination);
Vue.component('x-form', form);
