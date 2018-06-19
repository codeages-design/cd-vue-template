import axios from 'axios';
import { parseUrl, addPrefix } from './utils';

// API配置
import config from '@/api/config';

// 模拟数据
import '@/api/mock';

// 拦截器
import interceptorsList from '@/api/interceptors';

const restAxios = axios.create();

Object.keys(interceptorsList).map((key) => {
  const list = interceptorsList[key];
  list.map((item) => {
    console.log(item, key, 'restAxios');
    restAxios.interceptors[key].use(item.success, item.error);
  });
});

const Api = {};

const axiosApi = () => {
  config.map((item) => {
    Api[item.name] = (options) => {
      let url = item.url;
      url = options && options.query ? parseUrl(url, options.query) : url;
      url = addPrefix(url);

      return restAxios(Object.assign({}, item, options, { url }));
    }
  });
};

axiosApi();

export default Api;
