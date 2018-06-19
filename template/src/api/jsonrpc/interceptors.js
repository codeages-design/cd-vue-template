import store from '@/store';

// 状态码
const statusCode = {
  EXPIRED_CREDENTIAL: 5,
};

export default {
  // 请求拦截（配置发送请求的信息）
  request: [{
    success: (config) => {
      // 处理请求之前的配置config
      config.headers.Accept = 'application/vnd.edusoho.v2+json';

      if (store.state.token) {
        config.headers['X-CSRF-Token'] = store.state.token;
      }

      console.log('request', config);
      return config;
      // 下方的error为请求失败的处理
    },
    error: error => Promise.reject(error),
  }],
  // 响应拦截（控制返回信息的数据内容）
  response: [{
    success: (res) => {
      console.log('resSuccess', res);
      return res;
    },
    error: (error) => {
      console.log('resError', error);

      if (!error.response) {
        console.log(error);
        error.message = '网络问题，请联系管理员';
        return Promise.reject(error);;
      }

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
    },
  }]
}