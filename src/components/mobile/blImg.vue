<template>
  <div class="xq">
    <div class="head">
      <img src="./img/back.png" @click="back()" />
      <p>{{$route.query.name}}病例小区分布图</p>
    </div>
    <div class="redFlag">
      <div class="xq_contain">
        <div class="title">
          <div></div>
          <p>
            病例小区合计
            <span style="color:red">{{this.num[4].value}}</span>
          </p>
        </div>
        <img :src="forceImg" style="width:100%;" v-if="title!='永嘉县'" />
        <div class="mapDiv" v-if="title=='永嘉县'">
          <div id="bl-map"></div>
        </div>
        <div class="kind">
          <div class="t1">一类区域</div>
          <div class="t2">二类区域</div>
          <div class="t3">三类区域</div>
          <div class="t4">四类区域</div>
        </div>
        <div class="msg" v-if="title=='永嘉县'">
          <p>病例小区详情</p>
          <table>
            <thead>
              <tr>
                <th>乡镇街道</th>
                <th>小区名</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in TEST_DATA_YONGJIA" :key="index">
              <tr v-for="(_item,_index) in item.value" :key="_index">
                <td>{{ item.name }}</td>
                <td>{{ _item}}</td>
              </tr>
            </tbody>
          </table>
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
              <span>{{bitem.slice(0,18)}}</span>
              <span>{{bitem.slice(18)}}</span>
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

import MAP_YONGJIA from "./geoJson/map_YongJia";

import { GEO_YONGJIA } from "./data/geo_Data";

import { DATA_YONGJIA, TEST_DATA_YONGJIA } from "./data/chart_Data";
import { num } from "./mapdata";
export default {
  name: "gk",
  data() {
    return {
      context,
      bl: [],
      xq: [],
      flagnum: [],
      title: "",
      forceImg: undefined,
      苍南县: require("./img/estate/苍南县.png"),
      洞头区: require("./img/estate/洞头区.png"),
      乐清市: require("./img/estate/乐清市.png"),
      龙港市: require("./img/estate/龙港市.png"),
      龙湾区: require("./img/estate/龙湾区.png"),
      鹿城区: require("./img/estate/鹿城区.png"),
      瓯海区: require("./img/estate/瓯海区.png"),
      瓯江口集聚区: require("./img/estate/瓯江口产业集聚区.png"),
      平阳县: require("./img/estate/平阳县.png"),
      瑞安市: require("./img/estate/瑞安市.png"),
      泰顺县: require("./img/estate/泰顺县.png"),
      文成县: require("./img/estate/文成县.png"),
      永嘉县: require("./img/estate/永嘉县.png"),
      浙南集聚区: require("./img/estate/浙南产业集聚区.png"),
      chart: undefined,
      msgObj: null,
      GEO_YONGJIA,
      DATA_YONGJIA,
      TEST_DATA_YONGJIA,
      num
    };
  },
  created() {
    this.forceImg = this[this.$route.query.name];
    this.xqxx();
  },
  mounted() {
    // this.forceImg = this[this.$route.query.name];
    // this.xqxx();

    if (this.title == "永嘉县") {
      this.BLMapInit();
      this.BLMap();
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    xqxx() {
      var o;
      for (o in this.context) {
        if (this.$route.query.name == o) {
          this.bl = this.context[o].bl;
          this.xq = this.context[o].xq;
          this.flagnum = this.context[o].flag;
          this.title = o;

          // console.log(o);
        }
      }
    },
    BLMapInit() {
      this.chart = this.$echarts.init(document.getElementById("bl-map"));
      this.$echarts.registerMap("wenzhou", MAP_YONGJIA);
    },
    BLMap() {
      const that = this;
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          position: "top",
          backgroundColor: "#021739",
          formatter: function(params) {
            if (params.seriesIndex == 1) {
              const ds = that.TEST_DATA_YONGJIA[params.dataIndex];
              return [
                `<span style='color: #0eade0; font-weight: bolder;'>${ds.name}（<span style='color: #b2ac88;'>${ds.value.length}</span>）</span>`,
                ds.value.join("<br />")
              ].join("<br />");
            }
          }
        },
        geo: {
          map: "wenzhou",
          zoom: 1.2,
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
            zoom: 1.2,
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
            textFixed: {
              Alaska: [200, 0]
            },
            data: this.DATA_YONGJIA.map(item => {
              return {
                name: item.name,
                value: item.value,
                coord: this.GEO_YONGJIA[item.name],
                itemStyle: {
                  color: item.color || "#fff"
                }
              };
            })
          },
          {
            id: "point",
            name: "",
            type: "effectScatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#10bef1"
                },
                formatter: "{b}",
                position: "bottom"
              }
            },
            itemStyle: {
              color: "#00f6bf"
            },
            rippleEffect: {
              color: "#7fba9e"
            },
            data: this.TEST_DATA_YONGJIA.map(item => {
              return {
                name: item.name,
                value: this.GEO_YONGJIA[item.name].concat(item.value.length)
              };
            })
          }
        ]
      });

      that.chart.getZr().on("click", function(event) {
        if (event.target && event.target.seriesIndex == 1) {
          const ds = that.TEST_DATA_YONGJIA[event.target.dataIndex];
          that.msgObj = ds;
          // console.log(ds);
        }
      });
    }
  }
};
</script>

<style scoped  lang="less">
@MaxHeight: 36px;
.topLine(@height:100%,@block:inline-block) {
  display: @block;
  vertical-align: top;
  height: @height;
  line-height: @height;
  text-align: center;
}
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
      .title {
        display: inline-block;
        width: 200px;
        position: relative;
        left: 22px;
        div {
          height: 11px;
          width: 2px;
          background: red;
          display: inline-block;
          margin-right: 5px;
        }
        p {
          font-size: 12px;
          width: 127px;
          display: inline-block;
          text-align: left;
          vertical-align: text-bottom;
          span {
            font-size: 16px;
          }
        }
      }
      .mapDiv {
        height: 377px;
        #bl-map {
          height: 100%;
        }
      }
      .kind {
        height: 36px;
        width: 100%;
        box-sizing: border-box;
        font-size: 12px;
        padding: 5px;
        > div {
          .topLine(@MaxHeight);
          width: 25%;
          position: relative;
        }
        > div:before {
          content: "";
          display: block;
          width: 70px;
          height: 4px;
          position: absolute;
          top: 0;
        }
        .t1:before {
          background-color: rgb(247, 39, 38);
        }
        .t2:before {
          background-color: rgb(255, 145, 47);
        }
        .t3:before {
          background-color: rgb(255, 242, 172);
        }
        .t4:before {
          background-color: rgb(255, 255, 255);
        }
      }
      .msg {
        box-sizing: border-box;
        padding-top: 10px;
        p{
          margin-bottom: 10px;
          text-align: center;
        }
        table {
          width: 100%;
          border: 1px solid #ccc;
          border-collapse: collapse;

          td {
            border-top: 1px solid #ccc;
            padding: 3px;
          }
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