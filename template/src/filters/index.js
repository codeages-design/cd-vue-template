import moment from 'moment';

const courseStatus = {
  published: '发布',
  closed: '已关闭',
  draft: '未发布',
};

const courseType = {
  normal: '普通课程',
  live: '直播课程',
  liveOpen: '直播公开课',
  open: '公开课',
};
const filters = [
  {
    name: 'trim',
    handler(value) {
      return value.replace(/(^\s*)|(\s*$)/g, '');
    },
  },
  {
    name: 'datetime',
    handler(value) {
      return moment(+new Date(value)).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    name: 'courseStatus',
    handler(value) {
      return courseStatus[value];
    },
  },
  {
    name: 'courseType',
    handler(value) {
      return courseType[value];
    },
  },
]

export default {
  install(Vue) {
    Vue.formatter = {};
    filters.map((item) => {
      Vue.filter(item.name, item.handler);
      Vue.formatter[item.name] = item.handler;
    });
    Object.defineProperty(Vue.prototype, '$formatter', {
      get() {
        return Vue.formatter
      }
    });
  },
};
