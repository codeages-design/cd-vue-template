import store from '@/store';
import router from '@/router';
import * as types from '@/store/mutation-types';

// 状态码
const statusCode = {
  EXPIRED_CREDENTIAL: 5,
};

export default {
  request: [{
    success: (config) => {
      config.headers.Accept = 'application/vnd.edusoho.v2+json';

      if (store.state.token) {
        config.headers['X-CSRF-Token'] = store.state.token;
      }

      console.log('request', config);
      return config;
    },
    error: error => Promise.reject(error),
  }],
  response: [{
    success: (res) => {
      console.log('resSuccess', res.data);
      return res.data;
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
  }],
}