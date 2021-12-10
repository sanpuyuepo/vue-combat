// home module store
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const mutations = {
  // 获取分类列表
  GET_BASE_CATEGORY_LIST(state, value) {
    state.categoryList = value;
    state.categoryList.length = 16;
  },
  // 获取轮播图
  GET_BANNER_LIST(state, value) {
    state.bannerList = value;
  },
  // 获取 floor 数据
  GET_FLOOR_LIST(state, value) {
    state.floorList = value
  }
};

const actions = {
  // 获取分类列表
  getBaseCategoryList({ commit }) {
    reqCategoryList().then(res => {
      if (res.code === 200) {
        commit('GET_BASE_CATEGORY_LIST', res.data);
      }
    });
  },

  // 获取轮播图
  async getBannerList({ commit }) {
    let res = await reqBannerList()
    if (res.code === 200) {
      commit('GET_BANNER_LIST', res.data);
    }
  },

  // 获取 floor
  async getFloorList({commit}) {
    let res = await reqFloorList();
    if (res.code === 200) {
      commit('GET_FLOOR_LIST', res.data)
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}