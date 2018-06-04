# 容器

约定index.vue为页面的入口文件，其他名称为页面的片段，除了全局的模块和组件

## 常规页面开发流程

在containers中相应类别文件夹中添加.vue文件,更新router文件夹下的信息。

如: 

* 为保证项目整洁，拟定如下规则，即：
1. 拟定所有路由/单一组件的入口文件命名为index.vue。
2. 路由信息与文件路径信息保持完全统一。
3. 仅当前路由所需的vue组件放置位置与入口文件同级。
4. 仅个别路由使用的组件放置于./src/containers/components文件夹中，在需要使用时单独引入。
5. 全局使用的组件放置于./src/components文件夹中。
6. 入口文件体积过大需对当前组件做拆分，拆分后的父子组件通信在./src/docs中有详细描述。

* 当前需要开发一个用户列表页面，路由为user/list，需严格按照路由在containers中创建文件夹，如当前路由为user/list，则创建出文件路径为/src/containers/user/list/index.vue的文件。其内容模版为：

```html
<template>
  <div class="container"></div>
</template>

<script>
export default {
  name: 'user-list',
  components: {
    // 存放引入的子组件的变量
  },
  data() {
    return {
      // 存放监听的数据data
    };
  },
  props: [
    // 存放该组件在其它未知引入的时候用 v-on: 或 : 绑定的变量名，可在props中声明相同变量名后用this.xxx的方式获取。
  ],
  computed: {
    // 声明computed属性，这里的变量名不可与其它变量名，如props/data中的数据名称重名
  },
  watch: {
    // 声明watch监听器
  },
  methods: {
    // 设置方法，例如声明方法xxx可在template中用 @click="xxx" 或 v-bind:click="xxx" 通过点击事件调用xxx方法，也可在生命周期中调用this.xxx()调用。
    fetchData() {
      // 获取参数方法，现将获取页面加载所需数据的请求行为固定命名为fetchData。
    },
  },
  // 以下为常用组件生命周期， 按照顺序依次执行
  beforeCreate() {
    // 组件实例化之前， 还不能获取data以及组件中其余属性。在这里可以做与组件数据无关的异步请求。
  },
  created() {
    // 组件已经实例化但未在页面中显示。这是可获取组件中声明的所有信息，但是涉及dom尺寸等信息的操作还无法执行。 this.$refs的操作还拿不到dom信息。
  },
  mounted() {
    // 组件实例化成功且在dom中显示，此时执行环境如主程序js环境类似。
  },
  // 上述三个生命周期同步执行，所以所有的异步请求操作和延时操作的回调都会在mounted之后执行。
};
</script>

<style lang="less" scoped>
/* 样式文件编写位置，scoped表示样式仅在当前环境中有效，不能覆盖到全局且对其子组件无效 */
</style>

```

* 生成文件后可以在router文件夹下对该文件声明路由信息。具体操作为，在router创建user.js(有则不创建)，添加路由信息后该文件格式为:

```js
export default [{
  path: 'userAdmin/:courseId',
  name: 'userAdmin',
  component: (resolve) => require(['@/containers/user/admin/index.vue'], resolve),
}, {
  path: 'user/list', //设置虚拟路由信息
  name: 'userList', // 路由名称设置
  meta: {
    title: '用户列表', // 浏览器标题设置
  },
  component: (resolve) => require(['@/containers/user/list/index.vue'], resolve), // 组件位置引入
}];
```

* 如该文件未在router/index.js中被引入，则：

```js
import homepage from './homepage';
import course from './course';
// 引入 user
import user from './user';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'layout',
  redirect: {
    name: 'homepage',
  },
  component: (resolve) => require(['@/containers/layout.vue'], resolve),
  children: [
    ...homepage,
    ...course,
    // 在layout的children中使用
    ...user,
  ],
}, {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
  },
  component: (resolve) => require(['@/containers/login.vue'], resolve),
}, {
  path: '/logout',
  name: 'logout',
}];
```

* 可检查在 http://localhost:10000/#/user/list 路由下是否可以见到新的页面。

* 如要对侧边栏内容进行添加或修改，可在./src/data文件夹中设置，在data文件夹中有具体说明。