import Vue from 'vue'
import Vuex from 'vuex'
import { addPackage, getPackage, updatePackage } from '../src/api/package'

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
      await updatePackage(payload.data.id, payload.data.item)
      dispatch('initPackage')
    },
    changeCategory({commit}, payload) {
      commit('changeCategory', payload)
    }
  }
})
