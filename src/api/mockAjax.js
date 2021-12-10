import axios from 'axios';
// nprogress 展示请求进度条
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'

// 创建 axios 实例
const req = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})

req.interceptors.request.use(config => {
  // config 配置对象，其中包含一个很重要的属性： headers 请求头
  // 进度条开始:
  nProgress.start();
  return config;
})

req.interceptors.response.use(res => {
  // 进度条结束:
  nProgress.done();
  return res.data;
}, err => {
  return Promise.reject(new Error('Ops~~~'))
})


export default req;