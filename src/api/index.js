// API 统一管理
import requests from './request';

// mock request
import mockRequests from './mockAjax'

// 三级联动接口 /api/product/getBaseCategoryList GET
const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 搜索商品
const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params,
  })
}

// 详情
const reqGetDetailInfo = skuid => {
  return requests({
    url: `/item/${skuid}`,
    method: 'get'

  })
}

// 添加购物车
const reqAddCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// 删除购物车 byId
const reqDeleteCartBySkuId = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})

// 获取购物车列表
const reqShopCart = () => requests({url: '/cart/cartList', method: 'get'})

// =========================== mock request ==============================
// get banner data
const reqBannerList = () => mockRequests.get('/banner')

// get floor data
const reqFloorList = () => mockRequests.get('/floor')

const reqUpdateCheckStatus = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})

export {
  reqCategoryList,
  reqGetSearchInfo,
  reqGetDetailInfo,
  reqAddCart,
  reqDeleteCartBySkuId,
  reqShopCart,
  reqBannerList,
  reqFloorList,
  reqUpdateCheckStatus,
}



