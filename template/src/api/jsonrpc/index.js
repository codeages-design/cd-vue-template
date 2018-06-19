import axios from 'axios';
import JSONRPC from 'jsonrpc-dispatch'

// 拦截器
import interceptorsList from '@/api/jsonrpc/interceptors';

const jsonrpcAxios = axios.create();

Object.keys(interceptorsList).map((key) => {
  const list = interceptorsList[key];
  list.map((item) => {
    console.log(item, key, 'jsonrpcAxios');
    jsonrpcAxios.interceptors[key].use(item.success, item.error);
  });
});

const jsonrpc = new JSONRPC((message) => {
  jsonrpcAxios({
    url: '/adminrpc', // 请求路由
    method: 'post', // 请求方式
    baseURL: 'http://live-service.local.cg-dev.cn', // 请求基础路由
    data: message, // 发送消息主体
    responseType: 'json', // 发送消息格式json
  }).then((res) => {
    jsonrpc.handle(res); //回调后使用jsonrpc.handle触发其本身的回调。
  });
});

export {
  jsonrpc
};