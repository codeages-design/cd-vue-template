### jsonrpc 下载与使用

## 下载

```js
yarn add jsonrpc-dispatch
```

## 初始化jsonrpc，规定请求行为和回调。

```js
// 实例一个独立的axios，区分rest请求方式
const jsonrpcAxios = axios.create();
// 挂载拦截器
Object.keys(interceptorsList).map((key) => {
  const list = interceptorsList[key];
  list.map((item) => {
    jsonrpcAxios.interceptors[key].use(item.success, item.error);
  });
});

// axios调用
const jsonrpc = new JSONRPC((message) => {
  jsonrpcAxios({
    url: '/adminrpc', // 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://live-service.local.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    if (!res) {
      return;
    }
    if (res.error) {
      throw new Error(res.error);
    }
    jsonrpc.handle(res.data); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});

export {
  jsonrpc
};

// 在需要的组件中引入jsonrpc
import jsonrpc from '@/api/jsonrpc.js',
// 发送信息
jsonrpc.request('add', [1,2]).then((result) => {
  // 回调
  // some code...
});


//可初始化多个jsonrpc消息对象，方便对不同域名的内容发送请求
const live = new JSONRPC((message) => {
  jsonrpcAxios({
    url: '/adminrpc', 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://live-service.local.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    if (!res) {
      return;
    }
    if (res.error) {
      throw new Error(res.error);
    }
    live.handle(res.data); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});
const log = new JSONRPC((message) => {
  jsonrpcAxios({
    url: '/adminrpc', 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://log.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    if (!res) {
      return;
    }
    if (res.error) {
      throw new Error(res.error);
    }
    log.handle(res.data); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});
export {
	live,
	log,
};

```
请求拦截部分在 ./src/api/jsonrpc/interceptors.js 中，有详细描述

## 组件内引入

```js
import { jsonrpc } from '@/api/jsonrpc/index';
```

使用

```js
const requestData = {
  /* 请求所需参数 */
}
jsonrpc.request('方法名', requestData);
```

