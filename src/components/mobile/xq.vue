<template>
  <div class="xq">
    <div class="redFlag">
      <div class="head">
        <p>
          {{this.title}}
          <span class="red">红</span>
          <span class="white">白</span>阵地分布图
        </p>
        <span @click="back()"><<&nbsp&nbsp返回</span>
      </div>
      <div class="xq_contain">
        <ul class="bl">
          <li v-for="(bitem,bindex) in bl" :key="bindex">
            <div>
              <span>{{bitem.label}}</span>
              <br />
              <span :style="{color:bitem.color}">{{bitem.value}}例</span>
            </div>
          </li>
        </ul>
        <div
          class="Flagbl"
          style="text-align: left;font-size: 16px;margin-bottom: 4px;height: 100px;"
        >
          <ul style="list-style: none;">
            <li
              v-for="(fitem,findex) in flagnum"
              :key="findex"
              style="display: flex;flex-direction: row;justify-content: space-between;"
            >
              <div>
                <span style="line-height: 29px;">
                  当前
                  <span style="color:red;">红旗</span>
                </span>
                <br />
                <span>{{fitem.red}}</span>
              </div>
              <div>
                <span style="line-height: 29px;">当前白旗</span>
                <br />
                <span>{{fitem.white}}</span>
              </div>
              <div>
                <img src="./img/rflag.png" style="position: relative;
    right: 0px;" />
                <img src="./img/zx.png" style="position: relative;
    right: 0px;" />
                <img src="./img/wflag.png" style="position: relative;
    right: -4px;" />
                <br />
                <span>{{fitem.rw}}</span>
              </div>
              <div>
                <img src="./img/rflag.png" style="position: relative;
    left: 0px;" />
                <img src="./img/zx.png" style="position: relative;
    right: 0px;" />
                <img src="./img/wflag.png" style="position: relative;
    right: 0px;" />
                <br />
                <span>{{fitem.wr}}</span>
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
        <div class="img" v-show="show" @click="imgShow()">
          <img :src="`${this.server}img/map/${title}_${fk_imgtag}.png`" @error="errorImg()" />
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
          <span>.{{bitem}}</span>
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
      flagnum: [],
      title: "",
      context,
      date,
      server: "https://lysb.lucheng.gov.cn/other/",
      fk_imgtag: 9,
      show: true,
      showImg: false,
      chart: undefined,
      mapHash: {
        鹿城区: [MAP_LUCHENG, GEO_LUCHENG, DATA_LUCHENG],
        瓯海区: [MAP_OUHAI, GEO_OUHAI, DATA_OUHAI],
        龙湾区: [MAP_LONGWAN, GEO_LONGWAN, DATA_LONGWAN],
        洞头区: [MAP_DONGTOU, GEO_DONGTOU, DATA_DONGTOU],
        永嘉县: [MAP_YONGJIA, GEO_YONGJIA, DATA_YONGJIA],
        泰顺县: [MAP_TAISHUN, GEO_TAISHUN, DATA_TAISHUN],
        苍南县: [MAP_CANGNAN, GEO_CANGNAN, DATA_CANGNAN],
        文成县: [MAP_WENCHENG, GEO_WENCHENG, DATA_WENCHENG],
        平阳县: [MAP_PINGYANG, GEO_PINGYANG, DATA_PINGYANG],
        乐清市: [MAP_YUEQING, GEO_YUEQING, DATA_YUEQING],
        瑞安市: [MAP_RUIAN, GEO_RUIAN, DATA_RUIAN],
        龙港市: [MAP_LONGGANG, GEO_LONGGANG, DATA_LONGGANG],
        浙南集聚区: [MAP_ZHENAN, GEO_ZHENAN, DATA_ZHENAN],
        瓯江口: [MAP_OUJIANGKOU, GEO_OUJIANGKOU, DATA_OUJIANGKOU]
      },
      cur_map: null,
      cur_geo: null,
      cur_data: null
    };
  },
  props: {},
  watch: {},
  created() {
    this.xqxx();
  },
  mounted() {
    console.log(this.title);
    const [map, geo, data] = this.mapHash[this.title];
    this.cur_map = map;
    this.cur_geo = geo;
    this.cur_data = data;
    // this.XQMapInit();
    // this.XQMap();
  },
  components: { bigimg },
  methods: {
    xqxx() {
      var o;
      for (o in this.context) {
        if (this.$route.query.label == o) {
          this.bl = this.context[o].bl;
          this.xq = this.context[o].xq;
          this.flagnum = this.context[o].flag;
          this.title = o;
          console.log(this.bl, this.xq, this.flagnum, this.title);
        }
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
          zoom: this.title == "洞头区" ? 0.7 : 1,
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
            zoom: this.title == "洞头区" ? 0.7 : 1,
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
                  ? "#f82727"
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
                  color: item.new == 0 ? "#fff" : "#f82727"
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
                  fontWeight: "bolder"
                },
                formatter: function(params) {
                  return (
                    params.name.replace("街道", "") + " " + params.value[2]
                  );
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
                  fontWeight: "bolder"
                },
                formatter: function(params) {
                  return (
                    params.name.replace("街道", "") + " " + params.value[2]
                  );
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
          background-color: #483088;
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
    .red {
      float: unset !important;
      font-size: 20px !important;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#f44336),
        to(#f44336)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .white {
      float: unset !important;
      font-size: 20px !important;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#fff),
        to(#fff)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
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
    height: 400px;

    #xq-map {
      height: 100%;
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
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding-top: 10px;
      li {
        background-color: #483088;
        width: 73px;
        height: 40px;
        border-radius: 5px;
        span {
          font-size: 14px;
          color: #fff;
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
      height: 500px;
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
  .footer {
    p {
      color: #fff;
      font-size: 16px;
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
    height: 500px;
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