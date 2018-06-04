### jsonrpc 下载与使用

* 下载

```js
yarn add jsonrpc-dispatch
```

* 引入

在api中引入该库，在中后台解决方案中位于 ./src/api/jsonrpc/index.js

```js
import jsonRpcConfig from '@/api/jsonRpc-config';
```


初始化jsonrpc，规定请求行为和回调。

```js
// axios调用
const jsonrpc = new JSONRPC((message) => {
  axios({
    url: '/adminrpc', // 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://live-service.local.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    jsonrpc.handle.bind(jsonrpc, res.data); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});

export default jsonrpc;

// 在需要的组件中引入jsonrpc
import jsonrpc from '@/api/jsonrpc.js',
// 发送信息
jsonrpc.request('add', [1,2]).then((result) => {
  // 回调
  // some code...
});




//可初始化多个jsonrpc消息对象，方便对不同域名的内容发送请求
const live = new JSONRPC((message) => {
  axios({
    url: '/adminrpc', 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://live-service.local.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    live.handle.bind(live, res.data); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});
const log = new JSONRPC((message) => {
  axios({
    url: '/adminrpc', 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://log.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    log.handle.bind(log, res.data); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});
export default{
	live,
	log,
};

```
请求拦截部分在 ./src/api/jsonrpc/interceptors.js 中，有详细描述

