/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { wz_qzjcysj, wz_bqztb, wz_jdqdhbqb, wz_qzkjhzbb, wz_sfxxbb, view_qzcytjz, view_zytj } from "@/api/beans/fetch";
export default new Vuex.Store({
  state: {
    /** 首页病例 */
    blList: [],
    cyList: [],
    flagList: [],
    communityList: [],
    qushiData: {
      mapData: {},
      dateArr: []
    },
    zyRateData: {
      dateArr: [],
      value: []
    },
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
    updateReliXYList(state, val) {
      state.mapReli = val;
    },
    updateQfList(state, val) {
      state.QfList = val;
    },
    updateFgList(state, val) {
      state.FgList = val;
    },
    updatequshiData(state, val) {
      state.qushiData = val;
    },
    updateZyRateData(state, val) {
      state.zyRateData = val;
    }
  },
  actions: {
    async fetchBlList({ state, commit }) {
      const { data } = await wz_qzjcysj();
      commit('updateBlList', data)
    },
    async fetchCyList({ state, commit }) {
      const { data } = await wz_bqztb();
      commit('updateCyList', data)
    },
    async fetchFlagList({ state, commit }) {
      const { data } = await wz_jdqdhbqb();
      commit('updateFlagList', data)
    },
    async fetchCommunityList({ state, commit }) {
      const { data } = await wz_jdqdhbqb();
      commit('updateCommunityList', data)
    },
    async fetchZyRateData({ state, commit }, option) {
      const { data } = await view_zytj();
      const dateArr = [];
      const value = [];
      data.map(item => {
        dateArr.push(item.date);
        value.push(item['治愈率']);
      });
      commit('updateZyRateData', {
        dateArr,
        value
      });
    },
    async fetchQushiData({ state, commit }, option) {
      const { data } = await view_qzcytjz();
      const xqArr = ['鹿城', '龙湾', '瓯海', '洞头', '瑞安', '乐清', '永嘉', '文成', '平阳', '泰顺', '苍南', '龙港', '浙南', '瓯江口'];
      var dateArr = [];
      var mapData = {};
      for (let i = 0; i < data.length; i++) {
        if (dateArr.indexOf(data[i].date) === -1) {
          dateArr.push(data[i].date);
          mapData[data[i].date] = {};
          xqArr.map((item) => {
            const allDATA = data.filter((n) => {
              return n.xq == item && n.date == data[i].date;
            });
            let qz = 0,
              zz = 0,
              zy = 0,
              srqz = 0,
              srzy = 0;
            allDATA.map((k) => {
              qz += k['累计确诊人数'];
              zz += k['当日重症'];
              zy += k['治愈累积量'];
              srqz += k['当日新增确诊'];
              srzy += k['当日新增出院'];
            });
            mapData[data[i].date][item] = {
              qz,
              zz,
              zy,
              srqz,
              srzy,
            };
          });
        }
      }
      dateArr = dateArr.sort();
      commit('updatequshiData', {
        mapData,
        dateArr
      });
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
        reliData[item.sjc].push([item.x, item.y, 50]);
      });
      commit('updateReliXYList', {
        dateArr,
        reliData,
        reliMapData: []
      });
      return Promise.resolve();
    },
    async fetchQfList({ state, commit }) {
      const { data } = await wz_sfxxbb();
      const _data_ = data.map(item => {
        const _item_ = item;
        for (let v in _item_) {
          ["id", "qx_name", "qx_order", "qx_id", "xz_name", "xz_order", "xz_id", "gxsj"].indexOf(v) < 0 &&
            (_item_[v] = _item_[v] ? parseInt(_item_[v]) : 0)
        }
        return _item_;
      })
      commit('updateQfList', _data_);
      return Promise.resolve();
    },
    async fetchFgList({ state, commit }) {
      const { data } = await wz_sfxxbb(['jhhw', 'jhhw_hb', 'qx_name']);
      commit('updateFgList', data);
      return Promise.resolve();
    },
  }
});
