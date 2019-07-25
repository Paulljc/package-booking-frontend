import Vue from 'vue'
import Vuex from 'vuex'
import { addPackage, getPackage, updatePackage, getPackageByStatus } from './http/order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageList:[],
    status:'haven'
  },
  mutations: {
    initPackage(state, payload) {
      console.log(payload)
      state.packageList = payload
      console.log(state.packageList)
    },
    changeCategory(state, payload){
      state.status = payload
    }
  },
  actions: {
    async initPackage({commit}) {
      const result = await getPackage();
      commit('initPackage', result.data)
    },
    async createPackage({dispatch}, payload) {
      await addPackage(payload)
      dispatch('initPackage')
    },
    async modifyPackage({dispatch}, payload) {
      await updatePackageByTime(payload.billno, payload.apptime)
      dispatch('initPackage')
    },
    async updatePackageStatus({dispatch}, payload) {
      await updatePackage(payload.id, payload)
      dispatch('initPackage')
    },
    async getPackageByStatus({commit}, payload) {
      const result = await getPackageByStatus(payload);
      console.log(result)
      commit('initPackage', result.data)
    }
  }
})
