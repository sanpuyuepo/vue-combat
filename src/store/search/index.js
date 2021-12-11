// search module store
import { reqGetSearchInfo } from '@/api'

const state = {
  searchList: {}
};

const mutations = {
  GET_SEARCH_LIST(state, value) {
    state.searchList = value;
  }
};

const actions = {
  async getSearchList({commit}, parms) {
    let res = await reqGetSearchInfo(parms);
    if (res.code === 200) {
      commit('GET_SEARCH_LIST', res.data)
    }
  }
};

// 计算属性：简化数据
const getters = {
  goodsList: state => {
    return state.searchList.goodsList || [] 
  },
  trademarkList: state => {
    return state.searchList.trademarkList || []
  },
  attrsList: state => {
    return state.searchList.attrsList || []
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}