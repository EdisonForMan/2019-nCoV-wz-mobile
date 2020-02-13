<template>
  <div class="xq">
    <div class="redFlag">
      <div class="head">
        <p>{{this.title}}红白阵地分布图</p>
        <span @click="back()"><<&nbsp&nbsp返回</span>
      </div>
      <div class="xq_contain">
        <ul class="bl">
          <li v-for="(bitem,bindex) in bl" :key="bindex">
            <div>
              <span>{{bitem.label}}</span>
              <span :style="{color:bitem.color}">{{bitem.value}}例</span>
            </div>
          </li>
        </ul>
        <div
          class="Flagbl"
          style="text-align: left;font-size: 16px;margin-bottom: 4px;height: 100px;"
        >
          <ul style="list-style: none;">
            <li style="display: flex;flex-direction: row;justify-content: space-between;">
              <div>
                <span style="line-height: 29px;">
                  当前
                  <span style="color:red;">红旗</span>
                </span>
                <br />
                <span>{{qz_flag.red}}</span>
              </div>
              <div>
                <span style="line-height: 29px;">当前白旗</span>
                <br />
                <span>{{qz_flag.white}}</span>
              </div>
              <div>
                <img src="./img/rflag.png" style="position: relative;
    right: 0px;" />
                <img src="./img/zx.png" style="position: relative;
    right: 0px;" />
                <img src="./img/wflag.png" style="position: relative;
    right: -4px;" />
                <br />
                <span>{{qz_flag.rw}}</span>
              </div>
              <div>
                <img src="./img/rflag.png" style="position: relative;
    left: 0px;" />
                <img src="./img/zx.png" style="position: relative;
    right: 0px;" />
                <img src="./img/wflag.png" style="position: relative;
    right: 0px;" />
                <br />
                <span>{{qz_flag.wr}}</span>
              </div>
            </li>
          </ul>
          <div class="Flagbl_tip">
            <div>
              <p class="red">红旗（红色阵地）</p>
              <p>三天内无新增确诊病例</p>
            </div>
            <div>
              <p>白旗（白色阵地）</p>
              <p>三天内出现新增确诊病例</p>
            </div>
          </div>
        </div>
        <!-- <div class="img" v-show="show" @click="imgShow()">
          <img :src="`${this.server}img/map/${this.title}.png`" @error="errorImg()" />
        </div>-->
        <!-- <div class="img" v-show="show" @click="imgShow()">
          <img :src="`${this.server}img/map/${title}_${fk_imgtag}.png`" @error="errorImg()" />
        </div>-->
        <div class="mapDiv">
          <div id="xq-map"></div>
          <div id="xq-map2" v-if="title == '瑞安市' || title == '平阳县'"></div>
        </div>
        <span style="font-size: 12px;">
          下滑可查看更多
          <img src="./img/jt.png" style="position: relative; top: 5px;width: 20px;" />
        </span>
      </div>
      <!-- <div class="head">
      <p>{{this.title}}疫情小报</p>
      </div>-->

      <p>病例信息</p>
      <ul class="xq1">
        <li v-for="(bitem,bindex) in xq" :key="bindex">
          <span>{{++bindex}}</span>
          <span>.{{bitem.dzzssj.split(" ")[0]}}确诊，{{bitem.xb}}，现住{{bitem.xq}}，{{bitem.bz}}</span>
        </li>
      </ul>
      <div class="slipe">
        <!-- <span>
          下滑可查看更多
          <img src="./img/jt.png" style="position: relative;
    top: 5px;" />
        </span>-->
        <span
          style="font-size:10px;line-height:15px"
        >表中病例信息来源温州市新型冠状病毒感染的肺炎疫情防控工作领导小组于2020年1月28日起至今公布的信息，部分病例信息缺失。</span>
      </div>
    </div>
    <div class="footer">
      <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">24</span>时
      </p>
      <span style="font-size: 13px;">温州设计集团勘测院&nbsp&nbsp&nbsp制作</span>
    </div>
    <bigimg v-if="showImg" @clickit="viewImg" :imgSrc="`${this.server}img/map/${this.title}.png`"></bigimg>
  </div>
</template>

<script>
/* eslint-disable */
import context from "./xq";
import { date } from "./mapdata";
import bigimg from "./bigImg";
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
      flag_data: null
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
  components: { bigimg },
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
        { label: "确诊", value: 0, color: "#f67a32" },
        { label: "重症", value: 0, color: "rgb(255,79,85)" },
        { label: "出院", value: 0, color: "rgb(9,252,255)" },
        { label: "死亡", value: 0, color: "rgb(255,246,11)" }
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
    errorImg() {
      this.show = false;
    },
    viewImg() {
      this.showImg = false;
    },
    imgShow() {
      this.showImg = true;
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
              : ["永嘉县", "文成县"].indexOf(this.title)
              ? 1.2
              : ["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
              ? 1.2
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "乐清市"
              ? 1.15
              : 1.1,
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
                : ["永嘉县", "文成县"].indexOf(this.title)
                ? 1.2
                : ["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
                ? 1.2
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "乐清市"
                ? 1.15
                : 1.1,
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
                  value: this.cur_geo[item].concat(
                    this.cur_data[item] ? this.cur_data[item].value : 0
                  ),
                  new: this.cur_data[item] ? this.cur_data[item].new : 0
                };
              })
              .filter(item => item.new == 0)
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
                  value: this.cur_geo[item].concat(
                    this.cur_data[item] ? this.cur_data[item].value : 0
                  ),
                  new: this.cur_data[item] ? this.cur_data[item].new : 0
                };
              })
              .filter(item => item.new != 0)
          }
        ]
      });
    }
  }
};
</script>

<style scoped  lang="less">
.xq {
  // display: flex;
  // flex-direction: column;
  box-sizing: border-box;
  padding: 15px;
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  .Flagbl {
    position: relative;
    .Flagbl_tip {
      > div:first-child {
        position: absolute;
        left: 0;
      }
      > div:last-child {
        p {
          text-align: right;
        }
        position: absolute;
        right: 0;
      }
      p {
        font-size: 12px !important;
      }
      .red {
        color: red;
      }
    }
    ul {
      li {
        div {
          // background-color: #483088;
          width: 73px;
          height: 56px;
          border-radius: 5px;
          text-align: center;
          display: inline-block;
          span {
            font-size: 14px;
            color: #fff;
          }
        }

        div:nth-child(1) {
          float: right;
        }

        // img {
        //   width: 20px;
        //   padding-right: 10px;
        // }
        // .flags {
        //   display: inline-block;
        //   background-color: #483088;
        //   height: 30px;
        //   line-height: 30px;
        //   text-align: center;
        //   border-radius: 5px;
        //   padding: 0 8px;
        // }
        // .flags:last-child {
        //   margin-left: 10px;
        // }
      }
    }
  }
  .head {
    display: block;
    width: 100%;
    height: 30px;
    cursor: pointer;
    // .red {
    //   float: unset !important;
    //   font-size: 20px !important;
    //   background-image: -webkit-gradient(
    //     linear,
    //     0 0,
    //     0 bottom,
    //     from(#f44336),
    //     to(#f44336)
    //   );
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    // }
    // .white {
    //   float: unset !important;
    //   font-size: 20px !important;
    //   background-image: -webkit-gradient(
    //     linear,
    //     0 0,
    //     0 bottom,
    //     from(#fff),
    //     to(#fff)
    //   );
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    // }
    p {
      float: left;
      text-align: left;
      font-size: 16px;
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
    }
    span:nth-child(2) {
      float: right;
      font-size: 14px;
      color: #fff;
      line-height: 28px;
    }
  }
  .img {
    width: 100%;
    // height: 420px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .mapDiv {
    position: relative;
    height: 500px;

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

  .msg {
    table {
      width: 100%;
      border: 1px solid #ccc;

      td {
        border-top: 1px solid #ccc;
      }
    }
  }

  .xq_contain {
    width: 100%;
    // display: flex;
    flex-direction: column;
    .bl {
      list-style: none;
      display: block;
      height: 60px;
      padding-top: 10px;
      li {
        width: 25%;
        height: 40px;
        border-radius: 5px;
        float: left;
        box-sizing: border-box;
        padding: 0 5px;
        div {
          width: 100%;
          border-radius: 5px;
          span {
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
    p {
      font-size: 16px;
      color: #fff;
      text-align: left;
    }
    .xq1 {
      list-style: none;
      // display: flex;
      flex-direction: column;
      height: 241px;
      overflow: auto;
      li {
        width: 97%;
        // border: 1px solid #4e5fd5;
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
      }
    }
  }
  .footer {
    p {
      color: #fff;
      font-size: 12px;
      font-weight: bolder;
      margin: 0;

      .text {
        color: #a7ecf7;
      }

      .time {
        color: #f3f998;
      }
    }
  }
  .xq1 {
    list-style: none;
    // display: flex;
    flex-direction: column;
    height: 241px;
    overflow: auto;
    li {
      width: 97%;
      border: 1px solid #4e5fd5;
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
    }
  }
}
</style>