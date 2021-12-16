// 二次封装 axios
// ? 为什么需要二次封装axios?
// * 为了使用axios的请求拦截器&响应拦截器，在请求之前处理一些业务以及服务器返回数据之后处理一些事情

import axios from 'axios';
// nprogress 展示请求进度条
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'

import store from '@/store';

// 创建 axios 实例
const req = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// ! 请求拦截器
req.interceptors.request.use(config => {
  // 进度条开始:
  nProgress.start();
  // config 配置对象，其中包含一个很重要的属性： headers 请求头
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (localStorage.getItem('TOKEN')) {
    config.headers.token = localStorage.getItem('TOKEN');
  }
  return config;
})

// ! 响应拦截器
req.interceptors.response.use(res => {
  // 进度条结束:
  nProgress.done();
  return res.data;
}, err => {
  return Promise.reject(new Error('Ops~~~'))
})


export default req;