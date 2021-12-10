// API 统一管理
import requests from './request';

// mock request
import mockRequests from './mockAjax'

// 三级联动接口 /api/product/getBaseCategoryList GET

export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// =========================== mock request ==============================
// get banner data
export const reqBannerList = () => mockRequests.get('/banner')

// get floor data
export const reqFloorList = () => mockRequests.get('/floor')



