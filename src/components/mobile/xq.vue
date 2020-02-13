<template>
  <div class="xq">
    <!-- 弹框 -->
    <pop ref="pop" />
    <div class="head">
      <img src="./img/back.png" @click="back()" />
      <p>{{this.title}}红白阵地分布图</p>
    </div>
    <div class="redFlag">
      <div class="xq_contain">
        <div class="qz">
          <div class="qz_num">
            <ul>
              <li>
                <div style="width: 37%;position: relative;">
                  <img style="width: 65%;float: left;" src="./img/hq.png" />
                  <p style="left: 64%;top: 35%;">
                    <span>{{qz_flag.red}}</span>
                  </p>
                </div>
                <div style="width: 26%;">
                  <img @click="showzd" style="width:100%;margin-top: 5px;" src="./img/zd.png" />
                </div>
                <div style="width: 37%;position: relative;">
                  <img style="width: 65%;float: right;" src="./img/bq.png" />
                  <p style="right: 64%;top: 35%;color:#fff">
                    <span>{{qz_flag.white}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ul class="bl">
          <li v-for="(bitem,bindex) in bl" :key="bindex">
            <div :class="`${bitem.imgurl}`"></div>
            <span>{{bitem.label}}</span>
            <span
              :style="`color:${bitem.color};font-size: 23px;font-weight: bold;`"
            >{{bitem.value}}</span>
            <span>例</span>
          </li>
        </ul>
        <div class="mapDiv">
          <div id="xq-map"></div>
          <div id="xq-map2" v-if="title == '瑞安市' || title == '平阳县'"></div>
        </div>
        <div class="bltitle">
          <img src="./img/blxq.png" />
          <p>病例信息</p>
        </div>
        <ul class="xq1">
          <li v-for="(bitem,bindex) in xq" :key="bindex">
            <div>
              <span>{{++bindex}}</span>
            </div>
            <div>
              <span>{{bitem.dzzssj.split(" ")[0]}}确诊，{{bitem.xb}}，现住{{bitem.xq}}，</span>
              <span>{{bitem.bz}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="sjlz">数据来源：温州市新冠肺炎工作领导小组</div>
        <div class="float" v-show="logoshow">
          <span>温州设计集团勘察院</span>
        </div>
        <p>
          <img style src="./img/logo.png" @click="showLogo()" />
          <span class="text">截至</span> 2020年 2月
          <span class="time">{{date}}</span>日
          <span class="time">24</span>时
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import context from "./xq";
import { date, qz_num } from "./mapdata";
import pop from "./chart/popDiv"; //阵地详情弹框
import { mapState } from "vuex";
import MAP_YONGJIA from "./geoJson/map_YongJia";
import MAP_LUCHENG from "./geoJson/map_LuCheng";
import MAP_OUHAI from "./geoJson/map_OuHai";
import MAP_LONGWAN from "./geoJson/map_LongWan";
import MAP_DONGTOU from "./geoJson/map_DongTou";
import MAP_OUJIANGKOU from "./geoJson/map_OuJiangKou";
import MAP_ZHENAN from "./geoJson/map_ZheNan";
import MAP_YUEQING from "./geoJson/map_YueQing";
import MAP_RUIAN from "./geoJson/map_RuiAn";
import MAP_LONGGANG from "./geoJson/map_LongGang";
import MAP_TAISHUN from "./geoJson/map_TaiShun";
import MAP_CANGNAN from "./geoJson/map_CangNan";
import MAP_WENCHENG from "./geoJson/map_WenCheng";
import MAP_PINGYANG from "./geoJson/map_PingYang";
import MAP_RUIAN2 from "./geoJson/map_RuiAn2";
import MAP_PINGYANG2 from "./geoJson/map_PingYang2";

import {
  GEO_LUCHENG,
  GEO_OUHAI,
  GEO_LONGWAN,
  GEO_DONGTOU,
  GEO_OUJIANGKOU,
  GEO_ZHENAN,
  GEO_YUEQING,
  GEO_RUIAN,
  GEO_YONGJIA,
  GEO_LONGGANG,
  GEO_TAISHUN,
  GEO_CANGNAN,
  GEO_WENCHENG,
  GEO_PINGYANG
} from "./data/geo_Data";

import {
  DATA_LUCHENG,
  DATA_OUHAI,
  DATA_LONGWAN,
  DATA_DONGTOU,
  DATA_OUJIANGKOU,
  DATA_ZHENAN,
  DATA_YUEQING,
  DATA_RUIAN,
  DATA_YONGJIA,
  DATA_LONGGANG,
  DATA_TAISHUN,
  DATA_CANGNAN,
  DATA_WENCHENG,
  DATA_PINGYANG
} from "./data/chart_Data";

export default {
  name: "sbDate",
  data() {
    return {
      bl: [],
      xq: [],
      qz_flag: { red: 0, white: 0, rw: 0, wr: 0 },
      title: "",
      context,
      date,
      server: "https://lysb.lucheng.gov.cn/other/",
      fk_imgtag: 9,
      show: true,
      showImg: false,
      chart: undefined,
      chart2: undefined,
      mapHash: {
        鹿城区: [MAP_LUCHENG, GEO_LUCHENG, DATA_LUCHENG],
        瓯海区: [MAP_OUHAI, GEO_OUHAI, DATA_OUHAI],
        龙湾区: [MAP_LONGWAN, GEO_LONGWAN, DATA_LONGWAN],
        洞头区: [MAP_DONGTOU, GEO_DONGTOU, DATA_DONGTOU],
        永嘉县: [MAP_YONGJIA, GEO_YONGJIA, DATA_YONGJIA],
        泰顺县: [MAP_TAISHUN, GEO_TAISHUN, DATA_TAISHUN],
        苍南县: [MAP_CANGNAN, GEO_CANGNAN, DATA_CANGNAN],
        文成县: [MAP_WENCHENG, GEO_WENCHENG, DATA_WENCHENG],
        平阳县: [MAP_PINGYANG, GEO_PINGYANG, DATA_PINGYANG, MAP_PINGYANG2],
        乐清市: [MAP_YUEQING, GEO_YUEQING, DATA_YUEQING],
        瑞安市: [MAP_RUIAN, GEO_RUIAN, DATA_RUIAN, MAP_RUIAN2],
        龙港市: [MAP_LONGGANG, GEO_LONGGANG, DATA_LONGGANG],
        浙南: [MAP_ZHENAN, GEO_ZHENAN, DATA_ZHENAN],
        瓯江口: [MAP_OUJIANGKOU, GEO_OUJIANGKOU, DATA_OUJIANGKOU]
      },
      cur_map: null,
      cur_map2: null,
      cur_geo: null,
      cur_data: null,
      flag_data: null,
      logoshow:false
    };
  },
  computed: {
    ...mapState({
      blList: state => state.blList,
      flagList: state => state.flagList
    })
  },
  created() {},
  mounted() {
    this.title = this.$route.query.label;
    this.$nextTick(() => {
      const [map, geo] = this.mapHash[this.$route.query.label];
      this.cur_map = map;
      this.cur_geo = geo;
      this.XQMapInit();
      this.xqxx();
    });
  },
  components: { pop },
  watch: {
    blList() {
      this.xqxx();
    }
  },
  methods: {
    xqxx() {
      const today = this.$util.getTime();
      const _xq_ = this.$route.query.label;
      //  旗子
      const qz_flag = { red: 0, white: 0, rw: 0, wr: 0 };
      const flag_data = {};
      const flag = this.flagList.filter(({ qx }) => qx == _xq_);
      flag.map(item => {
        parseInt(item.hbqqk) ? (qz_flag.white += 1) : (qz_flag.red += 1);
        parseInt(item.hqzbq) && (qz_flag.rw += 1);
        parseInt(item.bqzhq) && (qz_flag.wr += 1);
        flag_data[item.jd] = parseInt(item.hbqqk);
      });
      this.flag_data = flag_data;
      this.qz_flag = qz_flag;
      //  病例
      const bl = [
        { label: "确诊", value: 0, color: "#f67a32",imgurl:"qz" },
        { label: "重症", value: 0, color: "rgb(255,79,85)",imgurl:"zz" },
        { label: "出院", value: 0, color: "rgb(9,252,255)" ,imgurl:"cy"},
        // { label: "死亡", value: 0, color: "rgb(255,246,11)" }
      ];
      const mapData = {};
      const mapArr = [];
      const xq = this.blList.filter(({ xq }) => xq == _xq_);
      xq.map(item => {
        bl[0].value += 1;
        item.lcyzcd.includes("重症") && (bl[1].value += 1);
        item.cysj && (bl[2].value += 1);
        //  地图
        !mapData[item.xjjd] &&
          (mapData[item.xjjd] = { name: item.xjjd, value: 0, new: 0 });
        mapData[item.xjjd].value += 1;
        item.dzzssj.includes(today) && (mapData[item.xjjd].new += 1);
      });
      this.xq = xq;
      this.bl = bl;
      this.cur_data = mapData;
      //  地图初始化
      this.XQMap();
      if (this.title == "瑞安市" || this.title == "平阳县") {
        this.cur_map2 = this.mapHash[this.title][3];
        this.XQMapInit2();
        this.XQMap2();
      }
    },
    viewImg() {
      this.showImg = false;
    },
    imgShow() {
      this.showImg = true;
    },
    showLogo() {
      this.logoshow = true;
       const that = this;
      setTimeout(function() {
        that.logoshow = false;
      }, 3000);
    },
    showzd(){
      this.$refs.pop.popzdShowFun();
    },
    back() {
      this.$router.go(-1);
    },
    XQMapInit() {
      this.chart = this.$echarts.init(document.getElementById("xq-map"));
      this.$echarts.registerMap("wenzhou", this.cur_map);
    },
    XQMap() {
      const that = this;
      this.chart.setOption({
        geo: {
          map: "wenzhou",
          zoom:
            this.title == "洞头区"
              ? 1
              : this.title == "苍南县"
              ? 1.5
              : ~["永嘉县", "文成县"].indexOf(this.title)
              ? 1.1
              : ~["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
              ? 1.2
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "乐清市"
              ? 1.15
              : 1.2,
          top:
            this.title == "洞头区"
              ? "35%"
              : this.title == "苍南县"
              ? "35%"
              : "middle",
          left: this.title == "苍南县" ? "20%" : "center",
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        series: [
          {
            type: "map",
            map: "wenzhou",
            zoom:
              this.title == "洞头区"
                ? 1
                : this.title == "苍南县"
                ? 1.5
                : ~["永嘉县", "文成县"].indexOf(this.title)
                ? 1.1
                : ~["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
                ? 1.2
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "乐清市"
                ? 1.15
                : 1.2,
            top:
              this.title == "洞头区"
                ? "35%"
                : this.title == "苍南县"
                ? "35%"
                : "middle",
            left: this.title == "苍南县" ? "20%" : "center",
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              areaColor:
                this.title == "龙港市" || this.title == "瓯江口"
                  ? "#fff2d2"
                  : null
            },
            // textFixed: {
            //   Alaska: [200, 0]
            // },
            data: Object.keys(this.cur_geo).map(item => {
              return {
                name: item,
                value: this.cur_data[item] ? this.cur_data[item].value : 0,
                coord: this.cur_geo[item],
                itemStyle: {
                  color: "#fff2d2"
                }
              };
            })
          },
          {
            id: "红旗",
            name: "",
            type: "scatter",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAABIklEQVRYhe3XIUtDURiH8d+VgUVwWBaMxoUDghaVNYPdL2AZLFg0aTcahIUVP4htqB9gwegHsOgEDQa5hp0whXm2XRXDeeAt9/x573M4L5x7i7IsTaLdbkMJF/3+xNxPsvAnb5mBLJQiC6XIQimyUIoslCILpfh3QrUZssWvWYwxtdBhq6XX6/2mC/7hkWWhFFkoRRZKkYVSFN1ud+LiYDAg/rmiCCFM1bTT6cwtNH51LGILO2hiLYTQiFJCCCWGeMUD7nGHa9zibW6LL0J1nOIAK4l8PdYq1rEfnz/iEmd4qip0hY0qTYw2cowWNqsKvX8XmHZuIpU/URawh3Oj+ZiXYeyxW1WoZnTmRzjBdqwm1tDAEpZj/hkvPg/1TawfGeoPZMIzUjM1AqcAAAAASUVORK5CYII=",
            symbolSize: [12, 12],
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 10,
                  fontWeight: "bolder",
                  textBorderColor: "#fff",
                  textBorderWidth: 1
                },
                formatter: function(params) {
                  return params.name.replace("街道", "") + params.value[2];
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: Object.keys(this.cur_geo)
              .map(item => {
                return {
                  name: item,
                  value: this.cur_geo[item].concat(this.flag_data[item] || 0)
                };
              })
              .filter(item => item.value[2] == 0)
          },
          {
            id: "白旗",
            name: "",
            type: "scatter",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAABFElEQVRYhe3XoU7DUBiG4afLEgQknMwgkEgcCRggOASeG0DOgiq+cm6WC8ECl4DkAjCsJCAQpAhOCExsZ2lHJs6b/Kb58vdN+yU9LZqmMYuqqqCBsixnZrui9y93WZAslUqWSiVLpZKlUslSqWSpVFZSqr9gvliKxRQLPal4tlo6K/n6slQqWSqVLJVKlkqlGI/HMwN1XRP/kFGEEOYuHQ6HraR+f/vWcIhj7GIHWyGE9SgmhDDBO57xhEfc4QEfrUympAKucYHBnHyIs409nMfrL7hBhUkXUrfYb7lngCuc4KALqc95oZQeRTo52vRwhhHqFnvquOO0C6m+7w5cosRRnJ+iYwObMf+KN3+Lfh+ns6J/AfA2MDMsqM06AAAAAElFTkSuQmCC",
            symbolSize: [12, 12],
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 10,
                  fontWeight: "bolder",
                  textBorderColor: "#fff",
                  textBorderWidth: 1
                },
                formatter: function(params) {
                  return params.name.replace("街道", "") + params.value[2];
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: Object.keys(this.cur_geo)
              .map(item => {
                return {
                  name: item,
                  value: this.cur_geo[item].concat(this.flag_data[item] || 0)
                };
              })
              .filter(item => item.value[2] != 0)
          }
        ]
      });
    },
    XQMapInit2() {
      this.chart2 = this.$echarts.init(document.getElementById("xq-map2"));
      this.$echarts.registerMap("wenzhou2", this.cur_map2);
    },
    XQMap2() {
      const that = this;
      this.chart2.setOption({
        geo: {
          map: "wenzhou2",
          zoom:
            this.title == "洞头区"
              ? 1
              : this.title == "永嘉县"
              ? 1.1
              : this.title == "文成县"
              ? 1.2
              : this.title == "苍南县"
              ? 1.5
              : this.title == "泰顺县"
              ? 1.25
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "鹿城区"
              ? 1.25
              : this.title == "瓯海区"
              ? 1.25
              : this.title == "龙湾区"
              ? 1.1
              : 0.15,
          right: "right",
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        series: [
          {
            type: "map",
            map: "wenzhou2",
            zoom:
              this.title == "洞头区"
                ? 1
                : this.title == "永嘉县"
                ? 1.1
                : this.title == "文成县"
                ? 1.2
                : this.title == "苍南县"
                ? 1.5
                : this.title == "泰顺县"
                ? 1.25
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "鹿城区"
                ? 1.25
                : this.title == "瓯海区"
                ? 1.25
                : this.title == "龙湾区"
                ? 1.1
                : 0.15,
            right: "right",
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              areaColor:
                this.title == "龙港市" || this.title == "瓯江口"
                  ? "#fff2d2"
                  : null
            },
            data: Object.keys(this.cur_geo).map(item => {
              return {
                name: item,
                value: this.cur_data[item] ? this.cur_data[item].value : 0,
                coord: this.cur_geo[item],
                itemStyle: {
                  color: "#fff2d2"
                }
              };
            })
          },
          {
            id: "红旗",
            name: "",
            type: "scatter",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAABIklEQVRYhe3XIUtDURiH8d+VgUVwWBaMxoUDghaVNYPdL2AZLFg0aTcahIUVP4htqB9gwegHsOgEDQa5hp0whXm2XRXDeeAt9/x573M4L5x7i7IsTaLdbkMJF/3+xNxPsvAnb5mBLJQiC6XIQimyUIoslCILpfh3QrUZssWvWYwxtdBhq6XX6/2mC/7hkWWhFFkoRRZKkYVSFN1ud+LiYDAg/rmiCCFM1bTT6cwtNH51LGILO2hiLYTQiFJCCCWGeMUD7nGHa9zibW6LL0J1nOIAK4l8PdYq1rEfnz/iEmd4qip0hY0qTYw2cowWNqsKvX8XmHZuIpU/URawh3Oj+ZiXYeyxW1WoZnTmRzjBdqwm1tDAEpZj/hkvPg/1TawfGeoPZMIzUjM1AqcAAAAASUVORK5CYII=",
            symbolSize: [12, 12],
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 10,
                  fontWeight: "bolder",
                  textBorderColor: "#fff",
                  textBorderWidth: 1
                },
                formatter: function(params) {
                  return params.name.replace("街道", "") + params.value[2];
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: Object.keys(this.cur_geo)
              .map(item => {
                return {
                  name: item,
                  value: this.cur_geo[item].concat(this.flag_data[item] || 0)
                };
              })
              .filter(item => item.value[2] == 0)
          },
          {
            id: "白旗",
            name: "",
            type: "scatter",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAABFElEQVRYhe3XoU7DUBiG4afLEgQknMwgkEgcCRggOASeG0DOgiq+cm6WC8ECl4DkAjCsJCAQpAhOCExsZ2lHJs6b/Kb58vdN+yU9LZqmMYuqqqCBsixnZrui9y93WZAslUqWSiVLpZKlUslSqWSpVFZSqr9gvliKxRQLPal4tlo6K/n6slQqWSqVLJVKlkqlGI/HMwN1XRP/kFGEEOYuHQ6HraR+f/vWcIhj7GIHWyGE9SgmhDDBO57xhEfc4QEfrUympAKucYHBnHyIs409nMfrL7hBhUkXUrfYb7lngCuc4KALqc95oZQeRTo52vRwhhHqFnvquOO0C6m+7w5cosRRnJ+iYwObMf+KN3+Lfh+ns6J/AfA2MDMsqM06AAAAAElFTkSuQmCC",
            symbolSize: [12, 12],
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 10,
                  fontWeight: "bolder",
                  textBorderColor: "#fff",
                  textBorderWidth: 1
                },
                formatter: function(params) {
                  return params.name.replace("街道", "") + params.value[2];
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: Object.keys(this.cur_geo)
              .map(item => {
                return {
                  name: item,
                  value: this.cur_geo[item].concat(this.flag_data[item] || 0)
                };
              })
              .filter(item => item.value[2] != 0)
          }
        ]
      });
    }
  }
};
</script>

<style scoped  lang="less">
.xq {
  box-sizing: border-box;
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  .head {
    display: block;
    width: 100%;
    height: 35px;
    p {
      text-align: center;
      font-size: 20px;
      font-weight: bolder;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#5ef2f5),
        to(#0b3cca)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 15px;
    }
    img {
      width: 45px;
      height: 25px;
      float: left;
      padding-top: 15px;
    }
  }
  .redFlag {
    padding: 15px;

    .xq_contain {
      width: 100%;
      margin-bottom: 5px;
      .qz {
        width: 100%;
        top: 8%;
        // height: 135px;
        box-sizing: border-box;
        z-index: 2;
        p {
          position: absolute;
          color: #ff4242;
        }
        .qz_num {
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          ul {
            list-style: none;
            background-image: linear-gradient(
              to right,
              #15005b,
              #4855d6,
              #15005b
            );
            padding: 8px;
            li {
              display: flex;
              flex-direction: row;
              width: 100%;
              div {
                // img {
                //   width: 12px;
                //   padding-right: 7px;
                // }
                span {
                  font-size: 21px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
      .bl {
        list-style: none;
        display: block;
        height: 14px;
        margin-bottom: 7px;
        width: 100%;
        li:nth-child(1){
          width: 35%;
        }
        li {
          width: 30%;
          height: 100%;
          float: left;
          box-sizing: border-box;
          padding: 0 5px;
          div {
            width: 4px;
            height: 100%;
            display: inline-block;
            margin-right: 3px;
          }
          .qz {
            width: 4px;
            height: 100%;
            display: inline-block;
            margin-right: 3px;
            background-image: url("./img/qz.png");
            background-size: 100%;
          }
          .zz {
            width: 4px;
            height: 100%;
            display: inline-block;
            margin-right: 3px;
            background-image: url("./img/zz.png");
            background-size: 100%;
          }
          .zy {
            width: 4px;
            height: 100%;
            display: inline-block;
            margin-right: 3px;
            background-image: url("./img/zy.png");
            background-size: 100%;
          }
          .cy {
            width: 4px;
            height: 100%;
            display: inline-block;
            margin-right: 3px;
            background-image: url("./img/cy.png");
            background-size: 100%;
          }
          span {
            font-size: 14px;
            color: #fff;
            position: relative;
            top: -2px;
          }
        }
      }
      .mapDiv {
        position: relative;
        height: 400px;

        #xq-map {
          height: 100%;
        }

        #xq-map2 {
          position: absolute;
          width: 60%;
          height: 80px;
          bottom: 5%;
          right: 1%;
          border: 1px solid #fff;
        }
      }
      .bltitle {
        width: 100%;
        display: inline-block;
        text-align: left;
        img {
          width: 13px;
          margin-right: 6px;
        }
        p {
          font-size: 16px;
          color: #09fcff;
          text-align: left;
          width: 100px;
          display: inline-block;
        }
      }

      /*定义滑块 内阴影+圆角*/
      .xq1::-webkit-scrollbar {
        background-color: rgb(9, 15, 57);
        width: 10px;
      }
      .xq1::-webkit-scrollbar-thumb {
        background-color: rgb(111, 122, 236);
        height: 40px;
        box-shadow: 0px 1px 3px 0px rgba(44, 47, 49, 0.4);
      }
      .xq1 {
        list-style: none;
        display: inline-block;
        height: 240px;
        overflow: auto;
        box-sizing: border-box;
        li {
          width: 100%;
          line-height: 20px;
          // margin-bottom: 10px;
          text-align: left;
          div:nth-child(1) {
            display: inline-block;
            width: 5%;
            vertical-align: top;
            box-sizing: border-box;
            padding-top: 8px;
            span {
              font-size: 16px;
              color: rgb(9, 252, 255);
            }
          }
          div:nth-child(2) {
            display: inline-block;
            width: 85%;
            padding: 5px 10px;
            // border-bottom: 1px solid rgb(39, 45, 119);
            span {
              font-size: 14px;
            }
            span:nth-child(1) {
              color: rgb(9, 252, 255);
            }
          }
        }
      }
    }
    .bottom {
      width: 100%;
      text-align: center;
      z-index: 2;
      .sjlz {
        width: 100%;
        text-align: center;
        font-size: 12px;
      }
      .tips {
        width: 313px;
        font-size: 14px;
      }
      p {
        color: #fff;
        font-size: 12px;
        font-weight: bolder;
        margin: 0;
        display: inline-block;
        width: 100%;
      }
      .float {
        position: absolute;
        right: 53%;
        bottom: 5%;
        width: 126px;
        background-color: blue;
        box-sizing: border-box;
        padding: 5px;
        border-radius: 10px;
        span {
          font-size: 12px;
        }
      }
      img {
        font-size: 12px;
        width: 12px;
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>