/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { wz_qzjcysj, wz_bqztb, wz_jdqdhbqb } from "@/api/beans/fetch";
export default new Vuex.Store({
  state: {
    /** 首页病例 */
    blList: [],
    cyList: [],
    flagList: [],
    communityList: []
  },
  mutations: {
    updateBlList(state, val) {
      state.blList = val;
    },
    updateCyList(state, val) {
      state.cyList = val;
    },
    updateFlagList(state, val) {
      state.flagList = val;
    },
    updateCommunityList(state, val) {
      state.communityList = val;
    }
  },
  actions: {
    async fetchBlList({ state, commit }, option) {
      const { data } = await wz_qzjcysj();
      commit('updateBlList', data)
    },
    async fetchCyList({ state, commit }, option) {
      const { data } = await wz_bqztb();
      commit('updateCyList', data)
    },
    async fetchFlagList({ state, commit }, option) {
      const { data } = await wz_jdqdhbqb();
      commit('updateFlagList', data)
    },
    async fetchCommunityList({ state, commit }, option) {
      const { data } = await wz_jdqdhbqb();
      commit('updateCommunityList', data)
    },
  }
});
