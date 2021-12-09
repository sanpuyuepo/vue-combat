// API 统一管理
import axios from './request';

// 三级联动接口 /api/product/getBaseCategoryList GET

export const reqCategoryList = () => {
  return axios({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}


