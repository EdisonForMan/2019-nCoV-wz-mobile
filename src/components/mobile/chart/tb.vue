<template>
  <div class="tb">
    <div style="position: relative;">
      <div id="zxt"></div>
      <div class="tb-title">每日确诊病例图</div>
    </div>
    <div style="position: relative;">
      <div id="mrzy"></div>
      <div class="tb-title">每日治愈病例图</div>
    </div>
    <div style="position: relative;">
      <div id="zzt"></div>
      <div class="tb-title">各区县累计确诊病例图</div>
    </div>
    <div style="position: relative;">
      <div id="zybl"></div>
      <div class="tb-title">各区县累计治愈病例图</div>
    </div>
    <div style="position: relative;">
      <div id="mrqxqz"></div>
      <div class="tb-title">上日各区县确诊病例图</div>
    </div>
    <div style="position: relative;">
      <div id="mrqxzy"></div>
      <div class="tb-title">上日各区县治愈病例图</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: undefined
    };
  },
  mounted() {
    this.zxtChart(); //调用地图
    this.mrzyChart(); //调用地图
    this.zztChart(); //调用地图
    this.zzblChart(); //调用地图
    this.mrqxqzChart();
    this.mrqxzyChart();
  },
  methods: {
    zxtChart() {
      this.chart = this.$echarts.init(document.getElementById("zxt"));
      var data = window.nCov_qushiData.zxt;
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        grid: {
          top: "30%",
          bottom: "30%",
          left: "12%",
          right: "4%"
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            margin: 13,
            rotate: 45
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(33,148,246,0.2)"
            }
          },
          name: "例",
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#FFF"
            },
            label: {
              show: true
            },
            data: data.map(item => item.value)
          }
        ]
      });
    },
    mrzyChart() {
      this.chart = this.$echarts.init(document.getElementById("mrzy"));
      var data = window.nCov_qushiData.mrzy;
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        grid: {
          top: "30%",
          bottom: "30%",
          left: "12%",
          right: "4%"
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            margin: 13,
            rotate: 45
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(33,148,246,0.2)"
            }
          },
          name: "例",
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            color: "rgb(30, 255, 149)",
            itemStyle: {
              borderWidth: 1,
              borderColor: "#FFF"
            },
            label: {
              show: true
            },
            data: data.map(item => item.value)
          }
        ]
      });
    },
    zztChart() {
      this.chart = this.$echarts.init(document.getElementById("zzt"));
      var data = window.nCov_qushiData.zzt;
      this.chart.setOption({
        // backgroundColor: "rgb(13, 25, 49)",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: "30%",
          left: "3%",
          right: "2%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: true,
            type: "category",
            axisTick: {
              show: true,
              color: "#fff",
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#fff"
              },
              interval: 0,
              rotate: 45
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            data: data.map(item => item.name)
          }
        ],
        yAxis: {
          type: "value",
          name: "例",
          nameTextStyle: {
            fontSize: 14,
            color: "#fff"
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "累计确诊",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: function(param) {
                return param.value + "例";
              }
            },
            itemStyle: {
              color: "rgb(66,176,239)"
            },
            data: data
          }
        ]
      });
    },
    zzblChart() {
      this.chart = this.$echarts.init(document.getElementById("zybl"));
      var data = window.nCov_qushiData.zybl;
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        grid: {
          top: "30%",
          bottom: "30%",
          left: "12%",
          right: "4%"
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            margin: 13,
            rotate: 45
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(33,148,246,0.2)"
            }
          },
          name: "例",
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            color: "rgb(30, 255, 149)",
            itemStyle: {
              borderWidth: 1,
              borderColor: "#FFF"
            },
            label: {
              show: true
            },
            data: data.map(item => item.value)
          }
        ]
      });
    },
    mrqxqzChart() {
      this.chart = this.$echarts.init(document.getElementById("mrqxqz"));
      var data = window.nCov_qushiData.mrqxqz;
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        grid: {
          top: "30%",
          bottom: "30%",
          left: "12%",
          right: "4%"
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            margin: 13,
            rotate: 45
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(33,148,246,0.2)"
            }
          },
          name: "例",
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#FFF"
            },
            label: {
              show: true
            },
            data: data.map(item => item.value)
          }
        ]
      });
    },
    mrqxzyChart() {
      this.chart = this.$echarts.init(document.getElementById("mrqxzy"));
      var data = window.nCov_qushiData.mrqxzy;
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        grid: {
          top: "30%",
          bottom: "30%",
          left: "12%",
          right: "4%"
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            margin: 13,
            rotate: 45
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(33,148,246,0.2)"
            }
          },
          name: "例",
          axisTick: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#FFF"
            },
            color: "rgb(30, 255, 149)",
            label: {
              show: true
            },
            data: data.map(item => item.value)
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tb {
  width: 100%;
  height: 500px;
  position: fixed;
  top: 137px;
  overflow: auto;
  div {
    width: 100%;
    height: 300px;
  }
  #zxt {
    width: 100%;
    height: 300px;
  }
  #mrzy {
    width: 100%;
    height: 300px;
  }
  #zzt {
    width: 100%;
    height: 300px;
  }
  #zybl {
    width: 100%;
    height: 300px;
  }
  .tb-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 4%;
    z-index: 10;
    color: #fff;
    font-size: 18px;
    padding: 2px 50px;
    white-space: nowrap;
    height: auto;
    width: auto;
    font-weight: bold;
    background: url(../img/title_bg.png) center no-repeat;
    background-size: 100% 100%;
  }
}
</style>