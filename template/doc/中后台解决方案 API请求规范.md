### 中后台解决方案 API请求规范

针对单页应用，请求的数据分为两种，一种是全局数据(跨路由数据)，即多个container都需要获取的数据。例如： 用户信息，loading状态等。一种是路由内数据，即获取的信息仅在当前路由内使用，不会在其他地方使用，例如某个课程列表的数据。

以上两类请求在项目中的请求写法稍有不同。

#### 路由内数据

* 配置方法名称和路由信息，文件位于 ./src/api/config.js，添加一项，试例如下，方法名为getPayOrderStatistic，请求路由./pay_order/statistic，GET请求

```js
  {
    name: 'getPayOrderStatistic',
    url: '/pay_order/statistic',
    method: 'GET',
  }
```

* 组件内引用，在需要的vue组件的script中最上方引入请求方法，且在需要的逻辑处理位置直接调用。

```js
// 引入api请求对象
import Api from '@/api';
// 也可以直接根据方法名称获取若干方法
import { getPayOrderStatistic, login } from '@/api'; //引入了api中的getPayOrderStatistic与login方法

// 调用也只是稍有不同。这里data的格式参照axios库的要求填入，在另一份文档中会有详细介绍。

// res中不只有包含返回数据，也包含了如状态码，response数据等一系列信息，返回数据在res.data中，已经经过了json转义，可以直接使用。

// 引入Api
Api.getPayOrderStatistic(data).then((res) => {
	// some code...
});

//引入getPayOrderStatistic
getPayOrderStatistic(data).then((res) => {
	// some code...
});

// 当一个页面需要若干个请求都请求到数据时，可以不用请求互相嵌套，采用如下方式。下方的res结构为
[getPayOrderStatistic的返回数据, userData的返回数据]，都包含状态码等一系列信息。

const getPayOrderData = getPayOrderStatistic(data);
const getUserData = userData(data);
const getAllData = Promise.all([getPayOrderData, getUserData]).then((res) => {
	// some code...
});
```

#### 全局请求数据

* 全局请求数据分请求，设置，获取与调用三个部分。

1.请求

请求的第一步设置config数据和局部数据请求一致

2.设置

api的操作放在vuex中，文件位于./src/store，根据数据类别不同放在modules文件夹下不同的文件中，该文件夹下每一个文件都含有固定格式，可根据其它文件模仿。

```js
// 引入mutation别称和Api
import * as types from '../mutation-types';
import Api from '@/api';

// 设置当前这一模块的全局数据，仅有在state定义的数据内容才能在组件中用computed进行监听
const state = {
  todayData: [],
  orderData: [],
  payOrderData: [],
};

// 定义调用不同mutation时，数据对当前模块全局数据的操作，第二个参数payload为commit传入数据，state为这一模块的全局数据存储位置。
const mutations = {
  [types.GET_HOME_TODAY_DATA](state, payload) {
    state.todayData = payload;
  },
  [types.GET_HOME_ORDER_STATISTIC](state, payload) {
    state.orderData = payload
  },
  [types.GET_HOME_PAY_ORDER_STATISTIC](state, payload) {
    state.payOrderData = payload
  },
};

// 定义api请求的行为
const actions = {
  getTodayData({ commit }) {
    return Api.getTodayData().then((res) => {
    	// 调用mutation方法，types.GET_HOME_TODAY_DATA为mutaion中的方法名。
      commit(types.GET_HOME_TODAY_DATA, res);
      // 返回数据，在组件内用then方法拿到的就是这里return的数据
      return res;
    });
  },
  getOrderStatistic({ commit }) {
    return Api.getOrderStatistic().then((res) => {
      commit(types.GET_HOME_ORDER_STATISTIC, res);
      return res;
    });
  },
  getPayOrderStatistic({ commit }) {
    return Api.getPayOrderStatistic().then((res) => {
      commit(types.GET_HOME_PAY_ORDER_STATISTIC, res);
      return res;
    });
  },
};

// 导出这一固定格式的数据，会在store/index.js中被引入
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

```

3.获取与调用

```js
// 引入必要内容， mapActions为全局信息中所有的actions内容， mapState同理。
import { mapActions, mapState } from 'vuex';

// 全局数据获取
// 在computed中从mapState提取自己需要的数据。如数据在modules中，则需要按照state.模块名.数据获取，如不在则省略模块名。
// 声明后可以在template或逻辑中使用courseData(this. courseData)数据。
computed: {
  ...mapState({
    courseData: state => state.course.courseSet,
    paging: state => state.course.paging
  })
},

// 方法提取
  methods: {
    // 从mapActions提取方法，如方法不在modules中，则可以直接写...mapActions(['getCourses']),
    // 上述声明后可直接用this.getCourses调用vuex中的action。
	...mapActions('course', [
	  'getCourses'
	]),
	fetchData(params = {}) {
	  this.getCourses(params).then((res) => {
	    console.log('res', res);
	  })
	},
  }

```


