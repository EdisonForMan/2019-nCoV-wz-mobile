<template>
  <div class="xq">
    <div class="redFlag">
      <div class="head">
        <p>{{$route.query.name}}病例小区</p>
        <span @click="back()"><<&nbsp&nbsp返回</span>
      </div>
      <!--<span v-else style="font-size:10px;line-height:15px">表中病例信息来源“健康温州”公众号于2020年1月28日起至今公布的信息，且并无删减出院病例。</span> -->
    </div>
    <img :src="forceImg" style="width:100%;" v-if="title!='永嘉县'" />
    <div class="mapDiv" v-if="title=='永嘉县'">
      <div id="bl-map"></div>
    </div>
    <p v-if="title=='永嘉县'">病例小区详情</p>
    <div class="msg" v-if="title=='永嘉县'">
      <table>
        <thead>
          <tr>
            <th>街道</th>
            <th>小区</th>
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
    <p>病例信息</p>
    <ul class="xq1">
      <li v-for="(bitem,bindex) in xq" :key="bindex">
        <span>{{++bindex}}</span>
        <span>.{{bitem}}</span>
      </li>
    </ul>
    <div class="slipe">
      <span>
        下滑可查看更多
        <img src="./img/jt.png" style="position: relative; top: 5px;" />
      </span>
      <br />
      <span style="font-size:10px;line-height:15px">表中病例信息来源“健康温州”公众号于2020年1月28日起至今公布的信息，部分病例信息缺失。</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import context from "./xq";

import MAP_YONGJIA from "./geoJson/map_YongJia";

import { GEO_YONGJIA } from "./data/geo_Data";

import { DATA_YONGJIA, TEST_DATA_YONGJIA } from "./data/chart_Data";
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
      TEST_DATA_YONGJIA
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
.xq {
  // display: flex;
  // flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  .Flagbl {
    ul {
      li {
        img {
          width: 20px;
          padding-right: 10px;
        }
      }
    }
  }
  .head {
    display: block;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px 20px;
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
    margin: 13px 5px;

    #bl-map {
      height: 100%;
    }
  }

  .msg {
    margin: 13px 5px;
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
      font-size: 17px;
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
      font-size: 20px;
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
    box-sizing: border-box;
    padding: 0 10px;
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