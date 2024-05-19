import axios from "axios";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 10000,
    headers: {
        'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.2.1","e":"16817468513220357888606209"}'
    }
})

// 请求拦截，实现加载动画：
http.interceptors.request.use(function (config) {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

http.interceptors.response.use(function (response) {
    Toast.clear()
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default http