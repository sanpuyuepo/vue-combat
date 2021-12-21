// trade 
import { reqUserAddressList, reqOrderInfo } from '@/api'

const state = {
  addressList: [],
  orderList: []
}

const mutations = {
  GET_USER_ADDRESS_LIST(state, addressList) {
    state.addressList = addressList;
  },
  GET_ORDER_LIST(state, orderList) {
    state.orderList = orderList;
  }
}

const actions = {
  async getUserAddressList({commit}) {
    let res = await reqUserAddressList();
    if (res.code === 200) {
      commit('GET_USER_ADDRESS_LIST', res.data)
    }
  },

  // order list
  async getOrderList({commit}) {
    let res = await reqOrderInfo()
    if (res.code === 200) {
      commit('GET_ORDER_LIST', res.data)
    }
  }
}

const getters = {
  addressList(state) {
    return state.addressList;
  },
  orderList(state) {
    return state.orderList;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}