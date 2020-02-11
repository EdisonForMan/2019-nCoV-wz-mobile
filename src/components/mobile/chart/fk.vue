<template>
  <div style="width:100%;height:100%;">
    <div class="TOP_DATA">
      <div>
        <div>累计确诊病例</div>
        <div>
          <i class="ill">{{this.num[0].value}}</i> 例
        </div>
      </div>
      <div style="margin-bottom: 8px;">
        <div>累计出院病例</div>
        <div>
          <i class="cure">{{this.num[2].value}}</i> 例
        </div>
      </div>
      <!-- <div>
        <div>确诊病例 ( -出院病例)</div>
        <div>
          <i class="ill">438</i> 例 ( -
          <i class="cure">49</i> 例)
        </div>
      </div>-->
      <!-- <div style="margin-bottom: 8px;">
        <div>累计出院病例</div>
        <div>
          <i class="cure">49</i> 例
        </div>
      </div>-->
      <!-- <p>(注:图中管控力指标为近15日确诊病例/常住人口)</p> -->
    </div>
    <div id="nyjj-map"></div>
  </div>
</template>

<script>
/* eslint-disable */
import wenzhouMap from "../geoJson/WenZhou";
import { mapdata, date, num } from "../mapdata";
import { menuHash } from "@/components/common/user/menuHash";

export default {
  data() {
    return {
      chart: undefined,
      mapdata,
      date,
      num,
      menuHash,
      user: "",
      qx: []
    };
  },
  mounted() {
    this.NYJJMapInit(); //调用地图
    this.NYJJMap(); //调用地图
  },
  methods: {
    NYJJMapInit() {
      this.chart = this.$echarts.init(document.getElementById("nyjj-map"));
      this.$echarts.registerMap("wenzhou", wenzhouMap);
    },
    NYJJMap() {
      const that = this;
      const isGk = this.isGk;
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
            data: this.mapdata.map(item => {
              return {
                name: item.name,
                value: item.value[0],
                itemStyle: {
                  color: item.color || "#fff"
                },
                coord: item.coord
              };
            }),
            markPoint: {
              symbol:
                "image://data:image/png;base64,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",
              symbolSize: [86, isGk ? 76 : 52],
              //symbolOffset:['-20%','10%'],
              label: {
                normal: {
                  show: true,
                  fontSize: 10,
                  offset: [0, isGk ? -8 : -4],
                  textStyle: {
                    color: "#000",
                    fontWeight: "bold"
                  },
                  formatter: (isGk
                    ? [
                        "{title|{b}}",
                        "确诊{num1|{@name}} 出院{num2|{@value}}",
                        "管控力指标{num3|{@coord}}"
                      ]
                    : ["{title|{b}}", "确诊{num1|{@[0]}} 治愈{num2|{@[1]}}"]
                  ).join("\n"),
                  rich: {
                    title: {
                      color: "black",
                      fontSize: 10,
                      fontWeight: "bold",
                      height: 14
                    },
                    num1: {
                      color: "red",
                      fontSize: 12,
                      height: 12
                    },
                    num2: {
                      color: "blue",
                      fontSize: 12,
                      height: 12
                    },
                    num3: {
                      color: "green",
                      fontSize: 12,
                      height: 12
                    }
                  }
                }
              },
              data: this.mapdata
            }
          }
        ]
      });
      that.chart.getZr().on("click", function(event) {
        if (event.target) {
          const label = that.mapdata[event.target.dataIndex].name;
          that.$util.getDDArea(label) &&
            that.$router.push({
              path: "/MobileXq",
              query: {
                label
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#nyjj-map {
  width: 100%;
  height: 100%;
}
.TOP_DATA {
  position: absolute;
  z-index: 2;
  top: 160px;
  left: -5px;
  > p {
    font-size: 12px;
    display: block;
    width: 130px;
  }
  > div {
    height: 46px;
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 10px;
    color: rgb(255, 255, 255);
    width: 150px;
    div {
      margin-left: 10px;
      i {
        font-style: normal;
      }
    }
    > div:first-child {
      height: 20px;
      line-height: 20px;
    }
    > div:last-child {
      height: 26px;
      font-size: 18px;
      line-height: 26px;
    }
    .ill {
      color: rgb(254, 93, 25);
    }
    .cure {
      color: rgb(110, 139, 255);
    }
  }
  // > div:before {
  //   content: "";
  //   display: block;
  //   height: 100%;
  //   width: 8px;
  //   background-color: rgb(0, 203, 254);
  //   float: left;
  // }
}
</style>