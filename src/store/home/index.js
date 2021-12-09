// home module store
import { reqCategoryList } from '@/api/index'

const state = {
  categoryList: [],
};

const mutations = {
  GET_BASE_CATEGORY_LIST(state, value) {
    state.categoryList = value;
    state.categoryList.length = 16;
    
  }
};

const actions = {
  getBaseCategoryList({commit}) {
    reqCategoryList().then(res => {
      if (res.code === 200) {
        commit('GET_BASE_CATEGORY_LIST', res.data);
      }
    });
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}