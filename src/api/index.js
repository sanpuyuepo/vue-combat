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

// 删除购物车byId
const reqDeleteCartBySkuId = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})

// 获取购物车列表
const reqShopCart = () => requests({url: '/cart/cartList', method: 'get'})

// =========================== mock request ==============================
// get banner data
const reqBannerList = () => mockRequests.get('/banner')

// get floor data
const reqFloorList = () => mockRequests.get('/floor')
// ========================================================================

const reqUpdateCheckStatus = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})

const reqVerificationCode = phone => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})

const reqUserRegister = data => requests({url: '/user/passport/register', data, method: 'post'})

const reqUserLogin = data => requests({url: '/user/passport/login', data, method: 'post'})

const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})

const reqLogout = () => requests({url: '/user/passport/logout', method: 'get'})

const reqUserAddressList = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})

const reqOrderInfo = () => requests({url: '/order/auth/trade', method: 'get'})

// 提交订单
const reqSubmitOrder = (tradeNo, data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'})

// 支付信息
const reqPayInfo = orderId => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})

// 支付状态
const reqPaymentStatus = orderId => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})

// 获取我的订单 /api/order/auth/{page}/{limit}
const reqMyOrderList = (page, limit) => requests({url: `order/auth/${page}/${limit}`, method: 'get'})



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
  reqVerificationCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
  reqUserAddressList,
  reqOrderInfo,
  reqSubmitOrder,
  reqPayInfo,
  reqPaymentStatus,
  reqMyOrderList,
}



