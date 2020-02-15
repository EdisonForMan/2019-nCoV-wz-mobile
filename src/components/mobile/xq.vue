<template>
  <div class="xq">
    <!-- 弹框 -->
    <pop ref="pop" />
    <div class="head">
      <img src="./img/back.png" @click="back()" />
      <p>
        {{this.title}}
        <span>红</span>
        <span>白</span>阵地分布图
      </p>
    </div>
    <div class="redFlag">
      <div class="xq_contain">
        <div class="qz">
          <div class="qz_num">
            <ul>
              <li>
                <div style="width: 37%;position: relative;">
                  <img style="width: 65%;float: left;" src="./img/hq.png" />
                  <p style="left: 64%;top: 22%;">
                    <span>{{flagnum[0].red}}</span>
                  </p>
                </div>
                <div style="width: 26%;">
                  <img @click="showzd" style="width:100%;margin-top: 5px;" src="./img/zd.png" />
                </div>
                <div style="width: 37%;position: relative;">
                  <img style="width: 65%;float: right;" src="./img/bq.png" />
                  <p style="right: 64%;top: 22%;color:#fff">
                    <span>{{flagnum[0].white}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ul class="bl">
          <li v-for="(bitem,bindex) in tabdata" :key="bindex">
            <div :class="`${bitem.color}`"></div>
            <span>{{bitem.label}}</span>
            <span
              :style="`color:${bitem.color1};font-size: 21px;font-weight: bold;`"
            >{{bitem.value}}</span>
            <span>例</span>
          </li>
        </ul>
        <!-- <div class="mapborder">
          <div
            class="mapDiv"
            :style="{height:mapheight +'px',width:mapwidth+'%',left: mapleft +'px'}"
          >
            <div id="xq-map"></div>
            <div id="xq-map2" v-if="title == '瑞安市' || title == '平阳县'"></div>
          </div>
        </div>-->
        <div class="mapDiv">
          <div id="xq-map"></div>
          <div id="xq-map2" v-if="title == '瑞安市' || title == '平阳县'"></div>
        </div>
        <!-- <span style="font-size: 12px;">
          下滑可查看更多
          <img src="./img/jt.png" style="position: relative; top: 5px;width: 20px;" />
        </span>-->
        <div class="bltitle">
          <img src="./img/blxq.png" />
          <p>病例信息</p>
        </div>
        <ul class="xq1">
          <li v-for="(bitem,bindex) in xq" :key="bindex">
            <!-- <div>
              <span>{{++bindex}}</span>
            </div>
            <div>
              <span>{{bitem.slice(0,19)}}</span>
              <span>{{bitem.slice(19)}}</span>
            </div>-->
            <span>{{++bindex}}.</span>
            <span>{{bitem.slice(0,19)}}</span>
            <span>{{bitem.slice(19)}}</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="sjlz">数据来源：温州市新冠肺炎工作领导小组</div>
        <div class="float" v-show="logoshow">
          <span>技术支持:温州设计集团</span>
        </div>
        <p>
          <span class="text">截至</span> 2020年 2月
          <span class="time">{{date}}</span>日
          <span class="time">24</span>时
          <img style src="./img/logo.png" @click="showLogo()" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import context from "./xq";
// import { date, qz_num } from "./mapdata";
import pop from "./chart/popDiv"; //阵地详情弹框
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

// import {
//   DATA_LUCHENG,
//   DATA_OUHAI,
//   DATA_LONGWAN,
//   DATA_DONGTOU,
//   DATA_OUJIANGKOU,
//   DATA_ZHENAN,
//   DATA_YUEQING,
//   DATA_RUIAN,
//   DATA_YONGJIA,
//   DATA_LONGGANG,
//   DATA_TAISHUN,
//   DATA_CANGNAN,
//   DATA_WENCHENG,
//   DATA_PINGYANG
// } from "./data/chart_Data";

export default {
  name: "sbDate",
  data() {
    return {
      bl: [],
      xq: [],
      flagnum: [],
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
        鹿城区: [MAP_LUCHENG, GEO_LUCHENG, window.chart_Data.DATA_LUCHENG],
        瓯海区: [MAP_OUHAI, GEO_OUHAI, window.chart_Data.DATA_OUHAI],
        龙湾区: [MAP_LONGWAN, GEO_LONGWAN, window.chart_Data.DATA_LONGWAN],
        洞头区: [MAP_DONGTOU, GEO_DONGTOU, window.chart_Data.DATA_DONGTOU],
        永嘉县: [MAP_YONGJIA, GEO_YONGJIA, window.chart_Data.DATA_YONGJIA],
        泰顺县: [MAP_TAISHUN, GEO_TAISHUN, window.chart_Data.DATA_TAISHUN],
        苍南县: [MAP_CANGNAN, GEO_CANGNAN, window.chart_Data.DATA_CANGNAN],
        文成县: [MAP_WENCHENG, GEO_WENCHENG, window.chart_Data.DATA_WENCHENG],
        平阳县: [
          MAP_PINGYANG,
          GEO_PINGYANG,
          window.chart_Data.DATA_PINGYANG,
          MAP_PINGYANG2
        ],
        乐清市: [MAP_YUEQING, GEO_YUEQING, window.chart_Data.DATA_YUEQING],
        瑞安市: [
          MAP_RUIAN,
          GEO_RUIAN,
          window.chart_Data.DATA_RUIAN,
          MAP_RUIAN2
        ],
        龙港市: [MAP_LONGGANG, GEO_LONGGANG, window.chart_Data.DATA_LONGGANG],
        浙南: [MAP_ZHENAN, GEO_ZHENAN, window.chart_Data.DATA_ZHENAN],
        瓯江口: [
          MAP_OUJIANGKOU,
          GEO_OUJIANGKOU,
          window.chart_Data.DATA_OUJIANGKOU
        ]
      },
      cur_map: null,
      cur_map2: null,
      cur_geo: null,
      cur_data: null,
      logoshow: false,
      tabdata: []
      // mapheight: 400,
      // mapwidth: 120,
      // mapleft: -24
    };
  },
  props: {},
  watch: {},
  created() {
    const context = window.context;
    const date = window.date;
    this.context = context;
    this.date = date;
    this.xqxx();
  },
  mounted() {
    const [map, geo, data] = this.mapHash[this.title];
    this.cur_map = map;
    this.cur_geo = geo;
    this.cur_data = data;
    this.XQMapInit();
    this.XQMap();

    if (this.title == "瑞安市" || this.title == "平阳县") {
      this.cur_map2 = this.mapHash[this.title][3];
      this.XQMapInit2();
      this.XQMap2();
    }
  },
  components: { pop },
  methods: {
    xqxx() {
      var o;
      for (o in this.context) {
        if (this.$route.query.label == o) {
          this.bl = this.context[o].bl;
          this.xq = this.context[o].xq;
          this.flagnum = this.context[o].flag;
          this.title = o;
        }
      }
      // if (this.title == "乐清市") {
      //   this.mapheight = 480;
      //   this.mapleft = 0;
      // } else if (this.title == "鹿城区" || this.title == "平阳县" ) {
      //   this.mapheight = 300;
      //   this.mapwidth = 130;
      // } else if (this.title == "泰顺县") {
      //   this.mapheight = 350;
      // } else if (this.title == "苍南县") {
      //   this.mapheight = 350;
      //   this.mapwidth = 130;
      //   this.mapleft = 0;
      // } else if (this.title == "永嘉县") {
      //   this.mapheight = 330;
      //   this.mapleft = -28;
      // }else if(this.title == "文成县"){
      //   this.mapleft = -16;
      //   this.mapheight = 350;
      // }else if(this.title == "瓯海区"){
      //   this.mapleft = 0;
      //   this.mapheight = 300;
      //   this.mapwidth = 130;
      // }
      this.tabdata = [
        {
          label: "确诊",
          value: this.bl[0].value,
          color: "qz",
          color1: "#f67a32"
        },
        {
          label: "重症",
          value: this.bl[1].value,
          color: "zz",
          color1: "rgb(255,79,85)"
        },
        {
          label: "出院",
          value: this.bl[2].value,
          color: "cy",
          color1: "rgb(9,252,255)"
        }
      ];
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
    showzd() {
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
          aspectScale: 1,
          zoom:
            this.title == "洞头区"
              ? 1
              : this.title == "苍南县"
              ? 1.5
              : ~["永嘉县", "文成县"].indexOf(this.title)
              ? 1.1
              : ~["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
              ? 1.3
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "乐清市"
              ? 1.2
              : 1.2,
          top:
            this.title == "洞头区"
              ? "35%"
              : this.title == "苍南县"
              ? "35%"
              : this.title == "乐清市"
              ? "10%"
              : "15%",
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
            aspectScale: 1,
            zoom:
              this.title == "洞头区"
                ? 1
                : this.title == "苍南县"
                ? 1.5
                : ~["永嘉县", "文成县"].indexOf(this.title)
                ? 1.1
                : ~["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
                ? 1.3
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "乐清市"
                ? 1.2
                : 1.2,
            top:
              this.title == "洞头区"
                ? "35%"
                : this.title == "苍南县"
                ? "35%"
                : this.title == "乐清市"
                ? "10%"
                : "15%",
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
                this.title == "龙港市" ||
                this.title == "瓯江口" ||
                this.title == "浙南" ||
                this.title == "龙湾区"
                  ? "#fff2d2"
                  : null
            },
            // textFixed: {
            //   Alaska: [200, 0]
            // },
            data: this.cur_data.map(item => {
              return {
                name: item.name,
                value: item.value,
                coord: this.cur_geo[item.name],
                itemStyle: {
                  // color: item.new == 0 ? "#fff" : "#f82727"
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
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACu2vZrAAABu0lEQVRYCWNkwAMiMzP+w6Tn79sPY9KV5rh5E2wfE11tpcCyUYdSEHhYtY6GKNZgoUBwNEQpCDysWkdDFGuwUCA4GqIUBB5WraMhijVYKBAcDVEKAg+r1tEQxRosFAiyEKsX1tImVj211Q2ZqCc6RKEhxEjtkCLWvCEToqMOJTZKiVU3GqLEhhSx6kZDlNiQIlbdaIgSG1LEqhsNUWJDilh1KHX9zJkzWe/fvmHPwPDXmoGRQf/hl18o5lSW5r75z8D4hpHhP4h+xfCf4SIDA/NRRVWNg+np6b9RFFOZA25kVFUVSP77/a+cgeF/AtByfpgdD78i7F4+fQZDRUkuTAqVZmT4yMDAuICJlamzrW3Cc1RJ6vCYqsvzbf7/+neF4f//fGRHkmQ8yHNA/SBzKksLrEnSS6Riln9//80Hjn8LYVMvz80KF8YZmnAVwPhg+C/E+P/vAqCQKpIwVZhDJ9czMTMlMjIwvqOGt0HmgMyjhlnoZjAfPnrykZ2D5eL//xhYgDldE6iAA10RQT4oMzEyzmRiY4pu65h4jaB6MhSgdC3QiydgMSQGLIZEgLQIMFcDS4P/HweqeAIAULZyhSyru3QAAAAASUVORK5CYII=",
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
                  // return params.name.replace("街道,乡,镇","") + params.value[2];
                  return params.name.replace("街道", "").replace("乡","").replace("镇","").replace("市","") + params.value[2];
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: this.cur_data
              .filter(item => item.new == 0)
              .map(item => {
                return {
                  name: item.name,
                  value: this.cur_geo[item.name].concat(item.value)
                };
              })
          },
          {
            id: "白旗",
            name: "",
            type: "scatter",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACu2vZrAAABvElEQVRYCWNkwAMiMzP+w6SXTZsOY9KVZmRkBNvHRFdbKbBs1KEUBB5WraMhijVYKBAcDVEKAg+r1tEQxRosFAiOhigFgYdV62iIYg0WCgRHQ5SCwMOqdTREsQYLBYIsxOqFtbSJVU9tdUMm6okOUWgIQTow1A4uIswbMiE66lAiYpMkJaMhSlJwEaF4NESJCCSSlIyGKEnBRYTi0RAlIpBIUoJS18+cOZP1/u0b9gwMf60ZGBn0H375hWJYZWnum/8MjG8YGf6D6FcM/xkuMjAwH1VU1TiYnp7+G0UxlTngRkZVVYHkv9//yhkY/icALeeH2fHwK8Lu5dNnMFSU5MKkUGlGho8MDIwLmFiZOtvaJjxHlaQOj6m6PN/m/69/Vxj+/89HdiRJxoM8B9QPMqeytMCaJL1EKmb59/fffOD4txA29fLcrHBhnKEJVwGMD4b/Qoz//y4ACqkiCVOFOXRyPRMzUyIjA+M7angbZA7IPGqYhW4G8+GjJx/ZOVgu/v+PgQWY0zWBCjjQFRHkgzITI+NMJjam6LaOidcIqidDAUrXAr14AhZDYsBiSARIiwBzNbA0+P9xoIonAAAXbs5yUf12AAAAAElFTkSuQmCC",
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
                  // return params.name.replace("街道", "") + params.value[2];
                  return params.name.replace("街道", "").replace("乡","").replace("镇","").replace("市","") + params.value[2];

                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: this.cur_data
              .filter(item => item.new != 0)
              .map(item => {
                return {
                  name: item.name,
                  value: this.cur_geo[item.name].concat(item.value)
                };
              })
          }
        ]
      });
    },
    // XQMap() {
    //   const that = this;
    //   this.chart.setOption({
    //     geo: {
    //       map: "wenzhou",
    //       aspectScale: 1,
    //       // roam:true,
    //       zoom:
    //         this.title == "洞头区"
    //           ? 1
    //           : this.title == "苍南县"
    //           ? 1.6
    //           : ~["永嘉县", "文成县"].indexOf(this.title)
    //           ? 1.1
    //           : ~["鹿城区", "瓯海区"].indexOf(this.title)
    //           ? 1.3
    //           : this.title == "瑞安市"
    //           ? 1.2
    //           : this.title == "乐清市"
    //           ? 1.1
    //           : this.title == "平阳县"
    //             ? 1.2
    //           : this.title == "泰顺县"
    //           ? 1.25
    //           : 1.2,
    //       top:
    //         this.title == "洞头区"
    //           ? "35%"
    //           : this.title == "苍南县"
    //           ? "25%"
    //           : this.title == "泰顺县"
    //           ? "12%"
    //           : this.title == "乐清市"
    //           ? "1%"
    //           : "15%",
    //       left: this.title == "苍南县" ? "15%" :this.title == "乐清市"?"1%": "center",
    //       label: {
    //         normal: {
    //           show: false
    //         },
    //         emphasis: {
    //           show: false
    //         }
    //       }
    //     },
    //     series: [
    //       {
    //         type: "map",
    //         map: "wenzhou",
    //         aspectScale: 1,
    //         zoom:
    //           this.title == "洞头区"
    //             ? 1
    //             : this.title == "苍南县"
    //             ? 1.6
    //             : ~["永嘉县", "文成县"].indexOf(this.title)
    //             ? 1.1
    //             : ~["鹿城区", "瓯海区"].indexOf(this.title)
    //             ? 1.3
    //             : this.title == "瑞安市"
    //             ? 1.2
    //             : this.title == "乐清市"
    //             ? 1.1
    //             : this.title == "泰顺县"
    //             ? 1.25
    //             : this.title == "平阳县"
    //             ? 1.2
    //             : 1.2,
    //         top:
    //           this.title == "洞头区"
    //             ? "35%"
    //             : this.title == "苍南县"
    //             ? "25%"
    //             : this.title == "泰顺县"
    //             ? "12%"
    //             : this.title == "乐清市"
    //             ?"1%"
    //             : "15%",
    //         left: this.title == "苍南县" ? "15%" :this.title == "苍南县"?"1%": "center",
    //         emphasis: {
    //           label: {
    //             show: true
    //           }
    //         },
    //         label: {
    //           normal: {
    //             show: false,
    //             textStyle: {
    //               color: "#fff"
    //             }
    //           },
    //           emphasis: {
    //             show: false,
    //             textStyle: {
    //               color: "#fff"
    //             }
    //           }
    //         },
    //         itemStyle: {
    //           areaColor:
    //             this.title == "龙港市" || this.title == "瓯江口"
    //               ? "#fff2d2"
    //               : null
    //         },
    //         // textFixed: {
    //         //   Alaska: [200, 0]
    //         // },
    //         data: this.cur_data.map(item => {
    //           return {
    //             name: item.name,
    //             value: item.value,
    //             coord: this.cur_geo[item.name],
    //             itemStyle: {
    //               // color: item.new == 0 ? "#fff" : "#f82727"
    //               color: "#fff2d2"
    //             }
    //           };
    //         })
    //       },
    //       {
    //         id: "红旗",
    //         name: "",
    //         type: "scatter",
    //         symbol:
    //           "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACu2vZrAAABu0lEQVRYCWNkwAMiMzP+w6Tn79sPY9KV5rh5E2wfE11tpcCyUYdSEHhYtY6GKNZgoUBwNEQpCDysWkdDFGuwUCA4GqIUBB5WraMhijVYKBAcDVEKAg+r1tEQxRosFAiyEKsX1tImVj211Q2ZqCc6RKEhxEjtkCLWvCEToqMOJTZKiVU3GqLEhhSx6kZDlNiQIlbdaIgSG1LEqhsNUWJDilh1KHX9zJkzWe/fvmHPwPDXmoGRQf/hl18o5lSW5r75z8D4hpHhP4h+xfCf4SIDA/NRRVWNg+np6b9RFFOZA25kVFUVSP77/a+cgeF/AtByfpgdD78i7F4+fQZDRUkuTAqVZmT4yMDAuICJlamzrW3Cc1RJ6vCYqsvzbf7/+neF4f//fGRHkmQ8yHNA/SBzKksLrEnSS6Riln9//80Hjn8LYVMvz80KF8YZmnAVwPhg+C/E+P/vAqCQKpIwVZhDJ9czMTMlMjIwvqOGt0HmgMyjhlnoZjAfPnrykZ2D5eL//xhYgDldE6iAA10RQT4oMzEyzmRiY4pu65h4jaB6MhSgdC3QiydgMSQGLIZEgLQIMFcDS4P/HweqeAIAULZyhSyru3QAAAAASUVORK5CYII=",
    //         symbolSize: [12, 12],
    //         coordinateSystem: "geo",
    //         label: {
    //           normal: {
    //             show: true,
    //             textStyle: {
    //               color: "#000",
    //               fontSize: 10,
    //               fontWeight: "bolder",
    //               textBorderColor: "#fff",
    //               textBorderWidth: 1
    //             },
    //             formatter: function(params) {
    //               return params.name.replace("街道", "") + params.value[2];
    //             },
    //             position: "bottom"
    //           }
    //         },
    //         itemStyle: {
    //           opacity: 1
    //         },
    //         data: this.cur_data
    //           .filter(item => item.new == 0)
    //           .map(item => {
    //             return {
    //               name: item.name,
    //               value: this.cur_geo[item.name].concat(item.value)
    //             };
    //           })
    //       },
    //       {
    //         id: "白旗",
    //         name: "",
    //         type: "scatter",
    //         symbol:
    //           "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACu2vZrAAABvElEQVRYCWNkwAMiMzP+w6SXTZsOY9KVZmRkBNvHRFdbKbBs1KEUBB5WraMhijVYKBAcDVEKAg+r1tEQxRosFAiOhigFgYdV62iIYg0WCgRHQ5SCwMOqdTREsQYLBYIsxOqFtbSJVU9tdUMm6okOUWgIQTow1A4uIswbMiE66lAiYpMkJaMhSlJwEaF4NESJCCSSlIyGKEnBRYTi0RAlIpBIUoJS18+cOZP1/u0b9gwMf60ZGBn0H375hWJYZWnum/8MjG8YGf6D6FcM/xkuMjAwH1VU1TiYnp7+G0UxlTngRkZVVYHkv9//yhkY/icALeeH2fHwK8Lu5dNnMFSU5MKkUGlGho8MDIwLmFiZOtvaJjxHlaQOj6m6PN/m/69/Vxj+/89HdiRJxoM8B9QPMqeytMCaJL1EKmb59/fffOD4txA29fLcrHBhnKEJVwGMD4b/Qoz//y4ACqkiCVOFOXRyPRMzUyIjA+M7angbZA7IPGqYhW4G8+GjJx/ZOVgu/v+PgQWY0zWBCjjQFRHkgzITI+NMJjam6LaOidcIqidDAUrXAr14AhZDYsBiSARIiwBzNbA0+P9xoIonAAAXbs5yUf12AAAAAElFTkSuQmCC",
    //         symbolSize: [12, 12],
    //         coordinateSystem: "geo",
    //         label: {
    //           normal: {
    //             show: true,
    //             textStyle: {
    //               color: "#000",
    //               fontSize: 10,
    //               fontWeight: "bolder",
    //               textBorderColor: "#fff",
    //               textBorderWidth: 1
    //             },
    //             formatter: function(params) {
    //               return params.name.replace("街道", "") + params.value[2];
    //             },
    //             position: "bottom"
    //           }
    //         },
    //         itemStyle: {
    //           opacity: 1
    //         },
    //         data: this.cur_data
    //           .filter(item => item.new != 0)
    //           .map(item => {
    //             return {
    //               name: item.name,
    //               value: this.cur_geo[item.name].concat(item.value)
    //             };
    //           })
    //       }
    //     ]
    //   });
    // },
    XQMapInit2() {
      this.chart2 = this.$echarts.init(document.getElementById("xq-map2"));
      this.$echarts.registerMap("wenzhou2", this.cur_map2);
    },
    XQMap2() {
      const that = this;
      this.chart2.setOption({
        geo: {
          map: "wenzhou2",
          aspectScale: 1,
          zoom:
            this.title == "洞头区"
              ? 1
              : this.title == "永嘉县"
              ? 1.2
              : this.title == "文成县"
              ? 1.2
              : this.title == "苍南县"
              ? 1.5
              : this.title == "泰顺县"
              ? 1.25
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "鹿城区"
              ? 1.3
              : this.title == "瓯海区"
              ? 1.25
              : this.title == "龙湾区"
              ? 1.1
              : this.title == "乐清市"
              ? 1.2
              : 0.15,
          // top:
          //   this.title == "平阳县"
          //     ? "45%"
          //     : // : this.title == "乐清市"
          //       // ? "20%"
          //       "middle",
          // left:
          //   this.title == "苍南县"
          //     ? "20%"
          //     : // : this.title == "乐清市"
          //       // ? "20%"
          //       "center",
          // top:
          //   this.title == "洞头区"
          //     ? "35%"
          //     : this.title == "苍南县"
          //     ? "35%"
          //     : this.title == "乐清市"
          //     ? "10%"
          //     : "15%",
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
            aspectScale: 1,
            zoom:
              this.title == "洞头区"
                ? 1
                : this.title == "永嘉县"
                ? 1.2
                : this.title == "文成县"
                ? 1.2
                : this.title == "苍南县"
                ? 1.5
                : this.title == "泰顺县"
                ? 1.25
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "鹿城区"
                ? 1.3
                : this.title == "瓯海区"
                ? 1.25
                : this.title == "龙湾区"
                ? 1.1
                : this.title == "乐清市"
                ? 1.1
                : 0.15,
            // top:
            //   this.title == "洞头区"
            //     ? "35%"
            //     : this.title == "苍南县"
            //     ? "35%"
            //     : this.title == "乐清市"
            //     ? "10%"
            //     : "15%",

            // left:
            //   this.title == "苍南县"
            //     ? "20%"
            //     : // : this.title == "乐清市"
            //       // ? "20%"
            //       "center",
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
                this.title == "龙港市" ||
                this.title == "瓯江口" ||
                this.title == "浙南" ||
                this.title == "龙湾区"
                  ? "#fff2d2"
                  : null
            },
            // textFixed: {
            //   Alaska: [200, 0]
            // },
            data: this.cur_data.map(item => {
              return {
                name: item.name,
                value: item.value,
                coord: this.cur_geo[item.name],
                itemStyle: {
                  // color: item.new == 0 ? "#fff" : "#f82727"
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
                  // return params.name.replace("街道,乡,镇","") + params.value[2];
                  return params.name.replace("街道", "").replace("乡","").replace("镇","").replace("市","") + params.value[2];

                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: this.cur_data
              .filter(item => item.new == 0)
              .map(item => {
                return {
                  name: item.name,
                  value: this.cur_geo[item.name].concat(item.value)
                };
              })
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
                  // return params.name.replace("街道", "") + params.value[2];
                  return params.name.replace("街道", "").replace("乡","").replace("镇","").replace("市","") + params.value[2];

                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: this.cur_data
              .filter(item => item.new != 0)
              .map(item => {
                return {
                  name: item.name,
                  value: this.cur_geo[item.name].concat(item.value)
                };
              })
          }
        ]
      });
    }
    // XQMap2() {
    //   const that = this;
    //   this.chart2.setOption({
    //     geo: {
    //       map: "wenzhou2",
    //       aspectScale: 1,
    //       // roam:true,
    //       zoom:
    //         this.title == "洞头区"
    //           ? 1
    //           : this.title == "永嘉县"
    //           ? 1.2
    //           : this.title == "文成县"
    //           ? 1.1
    //           : this.title == "苍南县"
    //           ? 1.6
    //           : this.title == "泰顺县"
    //           ? 1.25
    //           : this.title == "瑞安市"
    //           ? 1.2
    //           : this.title == "鹿城区"
    //           ? 1.3
    //           : this.title == "瓯海区"
    //           ? 1.25
    //           : this.title == "龙湾区"
    //           ? 1.1
    //           : 0.15,
    //       // top:
    //       //   this.title == "平阳县"
    //       //     ? "45%"
    //       //     : // : this.title == "乐清市"
    //       //       // ? "20%"
    //       //       "middle",
    //       // left:
    //       //   this.title == "苍南县"
    //       //     ? "20%"
    //       //     : // : this.title == "乐清市"
    //       //       // ? "20%"
    //       //       "center",
    //       right: "right",
    //       label: {
    //         normal: {
    //           show: false
    //         },
    //         emphasis: {
    //           show: false
    //         }
    //       }
    //     },
    //     series: [
    //       {
    //         type: "map",
    //         map: "wenzhou2",
    //         aspectScale: 1,
    //         zoom:
    //           this.title == "洞头区"
    //             ? 1
    //             : this.title == "永嘉县"
    //             ? 1.2
    //             : this.title == "文成县"
    //             ? 1.1
    //             : this.title == "苍南县"
    //             ? 1.6
    //             : this.title == "泰顺县"
    //             ? 1.25
    //             : this.title == "瑞安市"
    //             ? 1.2
    //             : this.title == "鹿城区"
    //             ? 1.3
    //             : this.title == "瓯海区"
    //             ? 1.25
    //             : this.title == "龙湾区"
    //             ? 1.1
    //             : 0.15,
    //         // top:
    //         //   this.title == "平阳县"
    //         //     ? "45%"
    //         //     : // : this.title == "乐清市"
    //         //       // ? "20%"
    //         //       "middle",

    //         // left:
    //         //   this.title == "苍南县"
    //         //     ? "20%"
    //         //     : // : this.title == "乐清市"
    //         //       // ? "20%"
    //         //       "center",
    //         right: "right",
    //         emphasis: {
    //           label: {
    //             show: true
    //           }
    //         },
    //         label: {
    //           normal: {
    //             show: false,
    //             textStyle: {
    //               color: "#fff"
    //             }
    //           },
    //           emphasis: {
    //             show: false,
    //             textStyle: {
    //               color: "#fff"
    //             }
    //           }
    //         },
    //         itemStyle: {
    //           areaColor:
    //             this.title == "龙港市" || this.title == "瓯江口"
    //               ? "#fff2d2"
    //               : null
    //         },
    //         // textFixed: {
    //         //   Alaska: [200, 0]
    //         // },
    //         data: this.cur_data.map(item => {
    //           return {
    //             name: item.name,
    //             value: item.value,
    //             coord: this.cur_geo[item.name],
    //             itemStyle: {
    //               // color: item.new == 0 ? "#fff" : "#f82727"
    //               color: "#fff2d2"
    //             }
    //           };
    //         })
    //       },
    //       {
    //         id: "红旗",
    //         name: "",
    //         type: "scatter",
    //         symbol:
    //           "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAABIklEQVRYhe3XIUtDURiH8d+VgUVwWBaMxoUDghaVNYPdL2AZLFg0aTcahIUVP4htqB9gwegHsOgEDQa5hp0whXm2XRXDeeAt9/x573M4L5x7i7IsTaLdbkMJF/3+xNxPsvAnb5mBLJQiC6XIQimyUIoslCILpfh3QrUZssWvWYwxtdBhq6XX6/2mC/7hkWWhFFkoRRZKkYVSFN1ud+LiYDAg/rmiCCFM1bTT6cwtNH51LGILO2hiLYTQiFJCCCWGeMUD7nGHa9zibW6LL0J1nOIAK4l8PdYq1rEfnz/iEmd4qip0hY0qTYw2cowWNqsKvX8XmHZuIpU/URawh3Oj+ZiXYeyxW1WoZnTmRzjBdqwm1tDAEpZj/hkvPg/1TawfGeoPZMIzUjM1AqcAAAAASUVORK5CYII=",
    //         symbolSize: [12, 12],
    //         coordinateSystem: "geo",
    //         label: {
    //           normal: {
    //             show: true,
    //             textStyle: {
    //               color: "#000",
    //               fontSize: 10,
    //               fontWeight: "bolder",
    //               textBorderColor: "#fff",
    //               textBorderWidth: 1
    //             },
    //             formatter: function(params) {
    //               return params.name.replace("街道", "") + params.value[2];
    //             },
    //             position: "bottom"
    //           }
    //         },
    //         itemStyle: {
    //           opacity: 1
    //         },
    //         data: this.cur_data
    //           .filter(item => item.new == 0)
    //           .map(item => {
    //             return {
    //               name: item.name,
    //               value: this.cur_geo[item.name].concat(item.value)
    //             };
    //           })
    //       },
    //       {
    //         id: "白旗",
    //         name: "",
    //         type: "scatter",
    //         symbol:
    //           "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAABFElEQVRYhe3XoU7DUBiG4afLEgQknMwgkEgcCRggOASeG0DOgiq+cm6WC8ECl4DkAjCsJCAQpAhOCExsZ2lHJs6b/Kb58vdN+yU9LZqmMYuqqqCBsixnZrui9y93WZAslUqWSiVLpZKlUslSqWSpVFZSqr9gvliKxRQLPal4tlo6K/n6slQqWSqVLJVKlkqlGI/HMwN1XRP/kFGEEOYuHQ6HraR+f/vWcIhj7GIHWyGE9SgmhDDBO57xhEfc4QEfrUympAKucYHBnHyIs409nMfrL7hBhUkXUrfYb7lngCuc4KALqc95oZQeRTo52vRwhhHqFnvquOO0C6m+7w5cosRRnJ+iYwObMf+KN3+Lfh+ns6J/AfA2MDMsqM06AAAAAElFTkSuQmCC",
    //         symbolSize: [12, 12],
    //         coordinateSystem: "geo",
    //         label: {
    //           normal: {
    //             show: true,
    //             textStyle: {
    //               color: "#000",
    //               fontSize: 10,
    //               fontWeight: "bolder",
    //               textBorderColor: "#fff",
    //               textBorderWidth: 1
    //             },
    //             formatter: function(params) {
    //               return params.name.replace("街道", "") + params.value[2];
    //             },
    //             position: "bottom"
    //           }
    //         },
    //         itemStyle: {
    //           opacity: 1
    //         },
    //         data: this.cur_data
    //           .filter(item => item.new != 0)
    //           .map(item => {
    //             return {
    //               name: item.name,
    //               value: this.cur_geo[item.name].concat(item.value)
    //             };
    //           })
    //       }
    //     ]
    //   });
    // }
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
      span:nth-child(1) {
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 bottom,
          from(#ff0505),
          to(#ff0505)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      span:nth-child(2) {
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 bottom,
          from(#ffffff),
          to(#ffffff)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
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
        li:nth-child(1) {
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
        height: 300px;

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
      // .mapborder {
      //   width: 100%;
      //   height: 300px;
      //   overflow: auto;
      //   .mapDiv {
      //     position: relative;
      //     height: 500px;
      //     width: 120%;
      //     #xq-map {
      //       height: 100%;
      //     }

      //     #xq-map2 {
      //       position: absolute;
      //       width: 60%;
      //       height: 80px;
      //       bottom: 5%;
      //       right: 1%;
      //       border: 1px solid #fff;
      //     }
      //   }
      // }
      .bltitle {
        width: 100%;
        display: inline-block;
        text-align: left;
        margin-bottom: 2px;
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
        height: 300px;
        overflow: auto;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #4e5fd5;
        // li {
        //   line-height: 20px;
        //   border: 1px solid #4e5fd5;
        //   text-align: left;
        //   padding: 5px;
        //   margin-bottom: 5px;
        //   text-align: left;
        //   div:nth-child(1) {
        //     display: inline-block;
        //     width: 5%;
        //     vertical-align: top;
        //     box-sizing: border-box;
        //     padding-top: 8px;
        //     span {
        //       font-size: 16px;
        //       color: rgb(9, 252, 255);
        //     }
        //   }
        //   div:nth-child(2) {
        //     display: inline-block;
        //     width: 85%;
        //     padding: 5px 10px;
        //     // border-bottom: 1px solid rgb(39, 45, 119);
        //     span {
        //       font-size: 14px;
        //     }
        //     span:nth-child(1) {
        //       color: rgb(9, 252, 255);
        //     }
        //   }
        // }
        li {
          width: 97%;
          border-bottom: 1px solid #ccc;
          padding: 4px;
          line-height: 20px;
          margin-bottom: 10px;
          text-align: left;
          span {
            font-size: 12px;
            color: #fff;
          }
          span:nth-child(1) {
            color: rgb(9, 252, 255);
          }
          span:nth-child(2) {
            color: rgb(9, 252, 255);
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
        position: fixed;
        right: 32%;
        color: #000;
        width: 160px;
        display: block;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        padding: 5px;
        border-radius: 10px;
        bottom: 2%;
        span {
          font-size: 12px;
        }
      }
      img {
        font-size: 12px;
        width: 14px;
        margin-left: 4px;
        position: relative;
        top: 2px;
        background-color: #fff;
        border-radius: 3px;
      }
    }
  }
}
</style>