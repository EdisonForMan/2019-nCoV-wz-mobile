/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { wz_qzjcysj, wz_bqztb, wz_jdqdhbqb, wz_qzkjhzbb, wz_sfxxbb } from "@/api/beans/fetch";
export default new Vuex.Store({
  state: {
    /** 首页病例 */
    blList: [],
    cyList: [],
    flagList: [],
    communityList: [],
    mapReli: {
      dateArr: [],
      reliData: [],
      reliMapData: []
    },
    QfList: {},
    FgList: {}
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
    },
    updateReliXYList (state, val) {
      state.mapReli = val;
    },
    updateQfList (state, val) {
      state.QfList = val;
    },
    updateFgList (state, val) {
      state.FgList = val;
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
    async fetchReliXYList({ state, commit }, option) {
      const { data } = await wz_qzkjhzbb();
      var dateArr = [];
      var reliData = {};
      for (let i = 0; i < data.length; i++) {
        if (dateArr.indexOf(data[i].sjc) === -1) {
          dateArr.push(data[i].sjc);
          reliData[data[i].sjc] = [];
        }
      }
      // 从头排序
      dateArr = dateArr.sort();
      data.map((item) => {
        if (!reliData[item.sjc]) reliData[item.sjc] = [];
        reliData[item.sjc].push([item.x, item.xy, (100 * Math.random())]);
      });
      commit('updateReliXYList', {
        dateArr,
        reliData,
        reliMapData: []
      });
      return Promise.resolve();
    },
    async fetchQfList({ state, commit }, option) {
      const { data } = await wz_sfxxbb(['cgqf_cnt', 'cgqfhb_cnt', 'AREA1']);
      console.log(data);
      commit('updateQfList', data);
      return Promise.resolve();
    },
    async fetchFgList({ state, commit }, option) {
      const { data } = await wz_sfxxbb(['jhhw_cnt', 'jhhwhb_cnt', 'AREA1']);
      console.log(data);
      commit('updateFgList', data);
      return Promise.resolve();
    },
  }
});
