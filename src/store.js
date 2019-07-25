import Vue from 'vue'
import Vuex from 'vuex'
import OrderApi from './http/order.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: []
  },
  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    }
  },
  actions: {
    fetchAllOrders: async ({ commit }) => {
      const orders = await OrderApi.fetchOrders()
      commit('setOrders', orders)
    },
    updateOrderStatus: async ({ dispatch }, { id, status }) => {
      await OrderApi.updateOrderStatus(id, status)
      dispatch('fetchAllOrders')
    },
    updateOrderTimeAndStatusByOrderNo: async (store, { appointmentTime, orderNo, status }) => {
      await OrderApi.updateOrderTimeAndStatusByOrderNo(orderNo, appointmentTime, status)
    },
    findByStatus: async ({ commit }, status) => {
      const orders = await OrderApi.fetchOrdersByStatus(status)
      commit('setOrders', orders)
    },
    createOrder: async ({ dispatch }, order) => {
      await OrderApi.createOrder(order)
      dispatch('fetchAllOrders')
    }
  }
})
