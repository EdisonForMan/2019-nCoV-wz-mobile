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
          style="text-align: left;font-size: 16px;margin-bottom: 4px;height: 80px;"
        >
          <ul style="list-style: none;">
            <li v-for="(fitem,findex) in flagnum" :key="findex">
              <div>
                <span>当前白旗</span>
                <br />
                <span>{{fitem.white}}</span>
              </div>
              <div>
                <span>
                  当前
                  <span style="color:red;">红旗</span>
                </span>
                <br />
                <span>{{fitem.red}}</span>
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
        <div class="img" v-show="show" @click="imgShow()">
          <img :src="`${this.server}img/map/${this.title}_${fk_imgtag}.png`" @error="errorImg()" />
        </div>
        <!-- <div class="mapDiv" v-if="title=='永嘉县'">
          <div id="xq-map"></div>
        </div>
        <div class="msg" v-if="title=='永嘉县'">
          <table>
            <thead>
              <tr>
                <th>街道</th>
                <th>详情</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in DATA_YONGJIA" :key="index">
              <tr v-for="(_item,_index) in item.value" :key="_index">
                <td>{{ item.name }}</td>
                <td>{{ _item}}</td>
              </tr>
            </tbody>
          </table>
        </div>-->
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
        <span>
          下滑可查看更多
          <img src="./img/jt.png" style="position: relative;
    top: 5px;" />
        </span>
        <br />
        <span style="font-size:10px;line-height:15px">表中病例信息来源“健康温州”公众号于2020年1月28日起至今公布的信息，部分病例信息缺失。</span>
      </div>
    </div>
    <div class="footer">
      <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">24</span>时
      </p>
      <span style="font-size: 13px;">温州设计集团勘测院&nbsp&nbsp&nbsp出品</span>
    </div>
    <bigimg
      v-if="showImg"
      @clickit="viewImg"
      :imgSrc="`${this.server}img/map/${this.title}_${fk_imgtag}.png`"
    ></bigimg>
  </div>
</template>

<script>
/* eslint-disable */
import context from "./xq";
import { date } from "./mapdata";
import bigimg from "./bigImg";
// import MAP_YONGJIA from "./geoJson/map_YongJia";
// import MAP_YONGJIA from "`./geoJson/${title}`";
import { DATA_YONGJIA, GEO_YONGJIA } from "./data/chart_Data";

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
      fk_imgtag: 10,
      server: "https://lysb.lucheng.gov.cn/other/",
      show: true,
      showImg: false,
      chart: undefined,
      DATA_YONGJIA,
      GEO_YONGJIA
    };
  },
  props: {},
  watch: {},
  created() {
    this.xqxx();
  },
  mounted() {
    // if (this.title == "永嘉县") {
    //   this.XQMapInit();
    //   this.XQMap();
    // }
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
          console.log(o);
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
      this.$echarts.registerMap("wenzhou", MAP_YONGJIA);
    },
    XQMap() {
      const that = this;
      this.chart.setOption({
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
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.DATA_YONGJIA.map(item => {
              return {
                name: item.name,
                value: this.GEO_YONGJIA[item.name].concat(item.value.length)
              };
            }),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            }
          },
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
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            textFixed: {
              Alaska: [200, 0]
            },
            // data: this.GEO_YONGJIA.map(item => {
            //   return {
            //     name: item.name,
            //     itemStyle: {
            //       color: item.color || "#fff"
            //     },
            //     coord: item.coord
            //   };
            // })
            data: []
          },
          // {
          //   id: "point",
          //   name: "",
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   label: {
          //     normal: {
          //       show: true,
          //       textStyle: {
          //         color: "#000"
          //       },
          //       formatter: "{b}",
          //       position: "bottom"
          //     }
          //   },
          //   itemStyle: {
          //     color: "#FFFF00"
          //   },
          //   zlevel: 6,
          //   data: this.DATA_YONGJIA.map(item => {
          //     return {
          //       name: item.name,
          //       value: item.value.length
          //     };
          //   })
          // },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: this.DATA_YONGJIA.map(item => {
              return {
                name: item.name,
                value: this.GEO_YONGJIA[item.name].concat(item.value.length)
              };
            }),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "left",
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow"
              }
            },
            zlevel: 6
          }
        ]
      });

      that.chart.getZr().on("click", function(event) {
        if (event.target && event.target.seriesIndex == 1) {
          const ds = that.DATA_YONGJIA[event.target.dataIndex].value;
          console.log(ds);
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
          height: 40px;
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