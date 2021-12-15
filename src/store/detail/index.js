// home module store
import { reqGetDetailInfo, reqAddCart } from '@/api/index'
import utils from '@/utils'

const state = {
  goodInfo: {},
  uuid_token: utils.getUUID(),
};

const mutations = {
  GET_DETAIL_INFO(state, value) {
    state.goodInfo = value;
  }
};

const actions = {
  async getDetailInfo({commit}, skuid) {
    let res = await reqGetDetailInfo(skuid);
    if (res.code === 200) {
      commit('GET_DETAIL_INFO', res.data)
    }
  },
  async addToCart({commit}, {skuId, skuNum}) {
    // 没有返回数据，不需要存入仓库
    let res = await reqAddCart(skuId, skuNum);
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
};
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  price(state) {
    return state.goodInfo.price || 999
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
  valueSkuJson(state) {
    return state.goodInfo.valueSkuJson || ''
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}