import Vue from 'vue';
import panel from './panel/';
import modal from './modal/';
import tableList from './table/index';
import form from './form/index';
import pagination from './pagination/index';

Vue.component('cd-panel', panel);
Vue.component('cd-modal', modal);
Vue.component('cd-table', tableList);
Vue.component('cd-pagination', pagination);
Vue.component('cd-form', form);
