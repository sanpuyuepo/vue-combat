import { reqVerificationCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index'

const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userInfo: {},
};
const mutations = {
  GET_VERIFICATION_CODE(state, data) {
    state.code = data;
  },
  USER_LOGIN(state, data) {
    state.token = data;
  },
  GET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  CLEAR_USER_INFO(state) {
    state.token = '',
    state.userInfo = {},
    localStorage.removeItem('TOKEN')
  }

};

const actions = {
  // reqVerificationCode
  async getVerificationCode({ commit }, phone) {
    let res = await reqVerificationCode(phone);
    if (res.code === 200) {
      commit('GET_VERIFICATION_CODE', res.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('fail'));
    }
  },
  // reqUserRegister
  async userRegister({ commit }, data) {
    let res = await reqUserRegister(data);
    if (res.code === 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  // reqUserLogin (token)
  async userLogin({ commit }, data) {
    let res = await reqUserLogin(data);
    if (res.code === 200) {
      commit('USER_LOGIN', res.data.token)
      localStorage.setItem('TOKEN', res.data.token)
      return 'ok';
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  async getUserInfo({ commit }) {
    let res = await reqUserInfo();
    if (res.code === 200) {
      commit('GET_USER_INFO', res.data)
      return 'ok';
    } else {
      return Promise.reject(new Error('未登录'))
    }
  },

  // reqLogout
  async userLogout({commit}) {
    let res = await reqLogout();
    if (res.code === 200) {
      commit('CLEAR_USER_INFO')
    } else {
      return Promise.reject(new Error('fail'))
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

