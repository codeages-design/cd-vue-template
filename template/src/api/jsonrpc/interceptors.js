import axios from 'axios';
import store from '@/store';
import router from '@/router';
import * as types from '@/store/mutation-types';

// 状态码
const statusCode = {
  EXPIRED_CREDENTIAL: 5,
};

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use((config) => {
  // 处理请求之前的配置config
  config.headers.Accept = 'application/vnd.edusoho.v2+json';

  if (store.state.token) {
    config.headers['X-CSRF-Token'] = store.state.token;
  }

  console.log('request', config);
  return config;
  // 下方的error为请求失败的处理
}, error => Promise.reject(error));

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use((res) => {
  // 处理响应数据
  console.log('resSuccess', res.data);

  return res.data;
}, (error) => {
  // 处理响应失败
  console.log('resError', error.response);

  switch (error.response.status) {
    case 401:
      const code = error.response.data.error.code;
      // token过期的情况
      if (code === statusCode.EXPIRED_CREDENTIAL) {
        store.commit(types.USER_LOGOUT);

        router.replace({
          name: 'login',
          query: { redirect: router.currentRoute.name },
        });
      }
      break;
    default:
      break;
  }

  return Promise.reject(error.response.data.error);
});
