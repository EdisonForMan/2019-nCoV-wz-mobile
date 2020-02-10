<template>
  <div class="tb">
    <div id="zxt"></div>
    <div id="mrzy"></div>
    <div id="zzt"></div>
    <div id="zybl"></div>
    <div id="mrqxqz"></div>
    <div id="mrqxzy"></div>
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
      var data = [
        {
          name: "2020-01-25",
          value: 18
        },
        {
          name: "2020-01-26",
          value: 14
        },
        {
          name: "2020-01-27",
          value: 28
        },
        {
          name: "2020-01-28",
          value: 54
        },
        {
          name: "2020-01-29",
          value: 58
        },
        {
          name: "2020-01-30",
          value: 55
        },
        {
          name: "2020-01-31",
          value: 14
        },
        {
          name: "2020-02-01",
          value: 24
        },
        {
          name: "2020-02-02",
          value: 26
        },
        {
          name: "2020-02-03",
          value: 49
        },
        {
          name: "2020-02-04",
          value: 24
        },
        {
          name: "2020-02-05",
          value: 32
        },
        {
          name: "2020-02-06",
          value: 25
        },
        {
          name: "2020-02-07",
          value: 17
        },
        {
          name: "2020-02-08",
          value: 10
        }
      ];
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        title: {
          text: "每日确诊病例图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          x: "center",
          y: "4%"
        },
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
      var data = [
        {
          name: "2020-01-25",
          value: 0
        },
        {
          name: "2020-01-26",
          value: 0
        },
        {
          name: "2020-01-27",
          value: 0
        },
        {
          name: "2020-01-28",
          value: 0
        },
        {
          name: "2020-01-29",
          value: 0
        },
        {
          name: "2020-01-30",
          value: 7
        },
        {
          name: "2020-01-31",
          value: 1
        },
        {
          name: "2020-02-01",
          value: 2
        },
        {
          name: "2020-02-02",
          value: 3
        },
        {
          name: "2020-02-03",
          value: 3
        },
        {
          name: "2020-02-04",
          value: 11
        },
        {
          name: "2020-02-05",
          value: 0
        },
        {
          name: "2020-02-06",
          value: 8
        },
        {
          name: "2020-02-07",
          value: 13
        },
        {
          name: "2020-02-08",
          value: 21
        }
      ];
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        title: {
          text: "每日治愈病例图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          x: "center",
          y: "4%"
        },
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
      var data = [
        {
          name: "鹿城",
          value: "63"
        },
        {
          name: "龙湾",
          value: "16"
        },
        {
          name: "瓯海",
          value: "33"
        },
        {
          name: "洞头",
          value: "5"
        },
        {
          name: "乐清",
          value: "155"
        },
        {
          name: "瑞安",
          value: "71"
        },
        {
          name: "永嘉",
          value: "46"
        },
        {
          name: "平阳",
          value: "30"
        },
        {
          name: "苍南",
          value: "9"
        },
        {
          name: "文成",
          value: "10"
        },
        {
          name: "泰顺",
          value: "16"
        },
        {
          name: "龙港",
          value: "8"
        },
        {
          name: "浙南产业集聚区",
          value: "1"
        },
        {
          name: "瓯江口",
          value: "1"
        }
      ];
      this.chart.setOption({
        // backgroundColor: "rgb(13, 25, 49)",
        title: {
          text: "各区县累计确诊病例图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          x: "center",
          y: 0
        },
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
      var data = [
        {
          name: "鹿城",
          value: "10"
        },
        {
          name: "龙湾",
          value: "1"
        },
        {
          name: "瓯海",
          value: "3"
        },
        {
          name: "洞头",
          value: "0"
        },
        {
          name: "乐清",
          value: "23"
        },
        {
          name: "瑞安",
          value: "29"
        },
        {
          name: "永嘉",
          value: "7"
        },
        {
          name: "平阳",
          value: "2"
        },
        {
          name: "苍南",
          value: "0"
        },
        {
          name: "文成",
          value: "1"
        },
        {
          name: "泰顺",
          value: "2"
        },
        {
          name: "龙港",
          value: "0"
        },
        {
          name: "浙南产业集聚区",
          value: "0"
        },
        {
          name: "瓯江口",
          value: "0"
        }
      ];
      this.chart.setOption({
        title: {
          text: "各区县累计治愈病例图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          x: "center",
          y: 0
        },
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
      var data = [
        {
          name: "鹿城",
          value: "2"
        },
        {
          name: "龙湾",
          value: "0"
        },
        {
          name: "瓯海",
          value: "2"
        },
        {
          name: "洞头",
          value: "0"
        },
        {
          name: "乐清",
          value: "4"
        },
        {
          name: "瑞安",
          value: "0"
        },
        {
          name: "永嘉",
          value: "2"
        },
        {
          name: "平阳",
          value: "0"
        },
        {
          name: "苍南",
          value: "0"
        },
        {
          name: "文成",
          value: "0"
        },
        {
          name: "泰顺",
          value: "6"
        },
        {
          name: "龙港",
          value: "0"
        },
        {
          name: "浙南产业集聚区",
          value: "0"
        },
        {
          name: "瓯江口",
          value: "0"
        }
      ];
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        title: {
          text: "上日各区县确诊病例图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          x: "center",
          y: "4%"
        },
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
      var data = [
        {
          name: "鹿城",
          value: "2"
        },
        {
          name: "龙湾",
          value: "0"
        },
        {
          name: "瓯海",
          value: "0"
        },
        {
          name: "洞头",
          value: "0"
        },
        {
          name: "乐清",
          value: "2"
        },
        {
          name: "瑞安",
          value: "1"
        },
        {
          name: "永嘉",
          value: "2"
        },
        {
          name: "平阳",
          value: "1"
        },
        {
          name: "苍南",
          value: "0"
        },
        {
          name: "文成",
          value: "0"
        },
        {
          name: "泰顺",
          value: "0"
        },
        {
          name: "龙港",
          value: "0"
        },
        {
          name: "浙南产业集聚区",
          value: "0"
        },
        {
          name: "瓯江口",
          value: "0"
        }
      ];
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        title: {
          text: "上日各区县治愈病例图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          x: "center",
          y: "4%"
        },
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
}
</style>