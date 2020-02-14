<template>
  <div class="tb">
    <div style="position: relative;">
      <div id="mapqushi"></div>
      <div class="mapqushi-date">
        确诊热力图
        <div class="mapqushi-date-duration">{{ duration }}</div>
        <div class="date-icon"></div>
        <div class="mapqushi-date-current" ref="current" @click="popupVisible = true;">{{ mapDateArr[index] }}</div>
        <div class="play-icon" :class="[playFlag ? 'now-play' : 'now-stop']" @click="playHandler"></div>
      </div>
    </div>
    <div style="position: relative;">
      <div id="zxt"></div>
      <div class="tb-title">每日确诊治愈图</div>
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
    <div style="position: relative;">
      <div id="mrqzzyl"></div>
      <div class="tb-title">每日确诊治愈率统计图</div>
    </div>
    <div style="position: relative;">
      <div id="mrqxxz"></div>
      <div class="tb-title">每日各区县新增确诊病例图</div>
    </div>
    <div style="position: relative;">
      <div id="mrqxlj"></div>
      <div class="tb-title">每日各区县累计确诊病例图</div>
    </div>
    <div style="position: relative;">
      <div id="mrqxxzzy"></div>
      <div class="tb-title">每日各区县新增治愈病例图</div>
    </div>
    <div style="position: relative;">
      <div id="mrqxljzy"></div>
      <div class="tb-title">每日各区县累计治愈病例图</div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width: 100%;height: auto;">
      <div class="popup-sure" ><span @click="sureHandler">确认</span></div>
      <mt-picker :slots="slots" style="height: auto;" ref="picker"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import {NEW_WENZHOU_JSON} from '../geoJson/newWenzhouJson.js';
export default {
  data() {
    let slots = [
      {
        flex: 1,
        values: window.nCov_qushiData.mapDateArr
      }
    ];
    return {
      slots: slots,
      popupVisible: false,
      playFlag: true,
      chart: undefined,
      index: 0,
      duration: window.nCov_qushiData.mapDate,
      mapDateArr: window.nCov_qushiData.mapDateArr,
      timeoutFlag: null
    };
  },
  mounted() {
    this.$echarts.registerMap('qushiWZ', NEW_WENZHOU_JSON);
    this.mapqushiChart();
    this.zxtmrzyChart(); //调用地图
    this.zztChart(); //调用地图
    this.zzblChart(); //调用地图
    this.mrqxqzChart();
    this.mrqxzyChart();
    this.mrqxxzChart();
    this.mrqxljChart();
    this.mrqxxzzyChart();
    this.mrqxljzyChart();
    this.mrqzzylChart();
  },
  beforeDestroy () {
    this.cleartimeoutFlag();
  },
  methods: {
    playHandler () {
      if (this.playFlag) {
        this.cleartimeoutFlag();
        this.playFlag = false; 
      } else {
        this.mapqushiChart();
        this.playFlag = true; 
      }
    },
    sureHandler () {
      const index = this.mapDateArr.findIndex(item => item == this.$refs.picker.values[0]);
      this.index = index;
      this.mapqushiChart();
      this.cleartimeoutFlag();
      this.popupVisible = false;
    },
    cleartimeoutFlag () {
      if (this.timeoutFlag) {
        clearTimeout(this.timeoutFlag);
        this.timeoutFlag = null;
      }
    },
    mapqushiChart () {
      this.chart = this.$echarts.init(document.getElementById("mapqushi"));
      const geoCoordMap = {
          "鹿城": [120.489894, 28.082536], 
          "龙湾": [120.853894, 27.910969], 
          "瓯海": [120.501369, 27.996593],  
          "洞头": [121.113762, 27.832626], 
          "瑞安": [120.365572, 27.901998], 
          "乐清": [120.978579, 28.220666], 
          "永嘉": [120.642158, 28.330733], 
          "文成": [119.982316, 27.807567], 
          "平阳": [120.280537, 27.623857], 
          "泰顺": [119.877783, 27.481151], 
          "苍南": [120.452814, 27.381237], 
          "龙港": [120.6099323, 27.52166944], 
          "浙聚区": [120.770894, 27.830969], 
          "瓯江口": [120.9299323, 27.98166944]
      };
      var heat = [];
      for (let i = 0; i <= this.index; i++) {
        var mamReli = window.nCov_qushiData.mapReLi[this.mapDateArr[i]] ? window.nCov_qushiData.mapReLi[this.mapDateArr[i]] : [];
        mamReli.map((item) => {
          heat.push(item);
        });
      }
      this.$refs.current.innerText = this.mapDateArr[this.index];
      let mapData = window.nCov_qushiData.mapData;
      let seriesData = Object.keys(mapData).map((item) => {
          return {
              name: item,
              value: mapData[item].qz
          }
      });
      let convertData = function(data) {
          let scatterData = [];
          for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                  scatterData.push({
                      name: data[i].name,
                      value: geoCoord.concat(data[i].value)
                  });
              }
          }
          return scatterData;
      };
      this.chart.setOption({
          tooltip: { //提示框组件。
              formatter: function (param) {
                  return [param.name,
                  '累计确诊: ' + mapData[param.name].qz + '例',
                  '重症: ' + mapData[param.name].zz + '例',
                  '治愈: ' + mapData[param.name].zy + '例',
                  '上日确诊: ' + mapData[param.name].srqz + '例',
                  '上日治愈: ' + mapData[param.name].srzy + '例'].join('\n');
              },
              extraCssText:'white-space:pre-wrap;text-align:left;',
              textStyle: {
                  fontSize: '14'
              }
          },
          geo: {
              map: 'qushiWZ',
              zoom: 1.2
          },
          visualMap: { //颜色的设置  dataRange
              show: true,
              x: 'right',
              y: 'bottom',
              seriesIndex: [0],
              color: ['red', 'rgb(30, 255, 149)'],
              textStyle: {
                  color: '#fff'
              }
          },
          series: [{
            name: 'AQI',
            type: 'heatmap',
            coordinateSystem: 'geo',
            pointSize: 4,
            blurSize: 6,
            data: heat,
            zlevel: 2,
          }, {
                  name: '温州',
                  type: 'map',
                  zoom: 1.2,
                  mapType: 'qushiWZ',
                  roam: false, //是否开启鼠标缩放和平移漫游
                  itemStyle: { //地图区域的多边形 图形样式
                      normal: { //是图形在默认状态下的样式
                          label: {
                              show: false
                          }
                      },
                      emphasis: { //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                          label: {
                              show: false
                          },
                          borderColor: '#3baced',
                          // areaColor: '#0b558e',
                      }
                  },
                  data: seriesData
              },
              {
                  name: '',
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  symbolSize: 1,
                  symbol: 'circle',
                  tooltip: {
                      show: true
                  },
                  label: {
                      normal: {
                          formatter: function (param) {
                              return param.name + ' ' + param.value[2];
                          },
                          show: true,
                          position: 'inside',
                          textStyle: {
                              color: 'rgb(194, 53, 49)',
                              fontSize: 11,
                              fontWeight: 'bold',
                              padding: [0,0,0,3]
                          }
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(0,254,5)', //标志颜色
                      }
                  },
                  zlevel: 1,
                  data: convertData(seriesData),
              }
          ]
      });
      this.timeoutFlag = setTimeout(() => {
        this.index++;
        if (this.index >= this.mapDateArr.length) this.index = 0;
        this.mapqushiChart();
      }, 600);
    },
    zxtmrzyChart() {
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
        legend: {
          show: true,
          right: '4%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: [{name: '确诊'}, {name: '治愈'}]
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
            name: '确诊',
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
          },
          {
            name: '治愈',
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
            data: window.nCov_qushiData.mrzy.map(item => item.value)
          }
        ]
      });
    },
    zztChart() {
      this.chart = this.$echarts.init(document.getElementById("zzt"));
      var data = window.nCov_qushiData.zzt;
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: "30%",
          left: "0%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: true,
            type: "category",
            axisTick: {
              show: false,
              color: "#fff",
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#fff"
              },
              interval: 0,
              formatter: function (param) {
                let str = '';
                for (let i = 0; i < param.length; i++) {
                  if (i == param.length - 1) {
                    str += param[i];
                  } else {
                    str += (param[i] + '\n');
                  }
                }
                return str;
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            data: data.map(item => item.name)
          }
        ],
        yAxis: {
          show: false,
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
            formatter: function (param) {
              let str = '';
              for (let i = 0; i < param.length; i++) {
                if (i == param.length - 1) {
                  str += param[i];
                } else {
                  str += (param[i] + '\n');
                }
              }
              return str;
            },
            interval: 0,
            margin: 13
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
        grid: {
          top: "30%",
          bottom: "30%",
          left: "8%",
          right: "6%"
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
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            formatter: function (param) {
              let str = '';
              for (let i = 0; i < param.length; i++) {
                if (i == param.length - 1) {
                  str += param[i];
                } else {
                  str += (param[i] + '\n');
                }
              }
              return str;
            },
            interval: 0,
            margin: 13,
            color: '#FFA75A',
            fontSize: 12
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          show: false,
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
            type: "bar",
            color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ffc28a'},
                  {offset: 1, color: '#fe9e4a'}
                ]
            ),
            label: {
              show: true,
              position: 'top',
              fontSize: 13,
              fontWeight: 800,
              color: '#F9B87C'
            },
            barWidth: 11,
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
          left: "8%",
          right: "6%"
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
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#fff"
            },
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            margin: 13,
            color: '#48E7EA',
            formatter: function (param) {
              let str = '';
              for (let i = 0; i < param.length; i++) {
                if (i == param.length - 1) {
                  str += param[i];
                } else {
                  str += (param[i] + '\n');
                }
              }
              return str;
            },
          },
          data: data.map(item => item.name)
        },
        yAxis: {
          show: false,
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
            type: "bar",
            color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#6be0ff'},
                  {offset: 1, color: '#499aff'}
                ]
            ),
            barWidth: 11,
            label: {
              show: true,
              position: 'top',
              fontSize: 13,
              fontWeight: 800,
              color: '#48E7EA'
            },
            data: data.map(item => item.value)
          }
        ]
      });
    },
    mrqxxzChart () {
      this.chart = this.$echarts.init(document.getElementById("mrqxxz"));
      var series = [];
      var legendData = [];
      series = window.nCov_qushiData.mrqxxz.data.map((quxian) => {
          legendData.push({ name: quxian[0] });
          return {
            name: quxian[0],
            type: "line",
            symbol: "circle",
            symbolSize: 4,
            label: {
              show: false
            },
            data: quxian.slice(1)
          }
      })
      this.chart.setOption({
        color: ['#ff66ff','#4ff9f6', '#ff276e', '#fc9010', '#6cc24e', '#30b8ff', '#29daa2', '#f3ff36', '#823fd6','#f19ec2','#0075a9','#0066ff','#93e2ba','#9e3f3f'],
        grid: {
          top: "55%",
          bottom: "15%",
          left: "12%",
          right: "4%"
        },
        legend: {
          show: true,
          right: '4%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: legendData
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
            margin: 13,
            rotate: 45
          },
          data: window.nCov_qushiData.mrqxxz.dateArr
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
        series: series
      });
    },
    mrqxljChart () {
      this.chart = this.$echarts.init(document.getElementById("mrqxlj"));
      var series = [];
      var legendData = [];
      series = window.nCov_qushiData.mrqxlj.data.map((quxian) => {
          legendData.push({ name: quxian[0] });
          return {
            name: quxian[0],
            type: "line",
            symbol: "circle",
            symbolSize: 4,
            label: {
              show: false
            },
            data: quxian.slice(1)
          }
      })
      this.chart.setOption({
        color: ['#ff66ff','#4ff9f6', '#ff276e', '#fc9010', '#6cc24e', '#30b8ff', '#29daa2', '#f3ff36', '#823fd6','#f19ec2','#0075a9','#0066ff','#93e2ba','#9e3f3f'],
        grid: {
          top: "55%",
          bottom: "15%",
          left: "12%",
          right: "4%"
        },
        legend: {
          show: true,
          right: '4%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: legendData
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
            margin: 13,
            rotate: 45
          },
          data: window.nCov_qushiData.mrqxlj.dateArr
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
        series: series
      });
    },
    mrqxxzzyChart () {
      this.chart = this.$echarts.init(document.getElementById("mrqxxzzy"));
      var series = [];
      var legendData = [];
      series = window.nCov_qushiData.mrqxxzzy.data.map((quxian) => {
          legendData.push({ name: quxian[0] });
          return {
            name: quxian[0],
            type: "line",
            symbol: "circle",
            symbolSize: 4,
            label: {
              show: false
            },
            data: quxian.slice(1)
          }
      })
      this.chart.setOption({
        color: ['#ff66ff','#4ff9f6', '#ff276e', '#fc9010', '#6cc24e', '#30b8ff', '#29daa2', '#f3ff36', '#823fd6','#f19ec2','#0075a9','#0066ff','#93e2ba','#9e3f3f'],
        grid: {
          top: "55%",
          bottom: "15%",
          left: "12%",
          right: "4%"
        },
        legend: {
          show: true,
          right: '4%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: legendData
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
            margin: 13,
            rotate: 45
          },
          data: window.nCov_qushiData.mrqxxzzy.dateArr
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
        series: series
      });
    },
    mrqxljzyChart () {
      this.chart = this.$echarts.init(document.getElementById("mrqxljzy"));
      var series = [];
      var legendData = [];
      series = window.nCov_qushiData.mrqxljzy.data.map((quxian) => {
          legendData.push({ name: quxian[0] });
          return {
            name: quxian[0],
            type: "line",
            symbol: "circle",
            symbolSize: 4,
            label: {
              show: false
            },
            data: quxian.slice(1)
          }
      })
      this.chart.setOption({
        color: ['#ff66ff','#4ff9f6', '#ff276e', '#fc9010', '#6cc24e', '#30b8ff', '#29daa2', '#f3ff36', '#823fd6','#f19ec2','#0075a9','#0066ff','#93e2ba','#9e3f3f'],
        grid: {
          top: "55%",
          bottom: "15%",
          left: "12%",
          right: "4%"
        },
        legend: {
          show: true,
          right: '4%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: legendData
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
            margin: 13,
            rotate: 45
          },
          data: window.nCov_qushiData.mrqxljzy.dateArr
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
        series: series
      });
    },
    mrqzzylChart () {
      this.chart = this.$echarts.init(document.getElementById("mrqzzyl"));
      this.chart.setOption({
        // backgroundColor: "rgb(13,25,49)",
        grid: {
          top: "30%",
          bottom: "30%",
          left: "8%",
          right: "3%"
        },
        legend: {
          show: true,
          right: '4%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: [{name: '治愈率'}]
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
            margin: 13,
            rotate: 45
          },
          data: window.nCov_qushiData.mrqzzyl.date
        },
        yAxis: {
          show: false,
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
          name: "率(%)",
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
            name: '治愈率',
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            color: "#7AEAC6",
            itemStyle: {
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.36)"
            },
            smooth: true,
            lineStyle: {
              // color: 'rgba(0,0,0,0)'
            },
            label: {
              show: false
            },
            areaStyle: { //区域填充样式
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#1077BC'
                        },
                        {
                            offset: 1,
                            color: 'rgba(99,186,176,0)'
                        }
                    ], false)
                }
            },
            data: window.nCov_qushiData.mrqzzyl.data.map((item) => {return (item * 100).toFixed(2);})
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
  position: fixed;
  top: 75px;
  overflow: auto;
  bottom: 22px;
  #zxt {
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
  #mapqushi {
    height: 400px;
  }
  #mrqxxz #mrqxlj #mrqxxzzy #mrqxljzy {
    height: 450px;
  }
}
.tb > div > div {
  width: 100%;
  height: 300px;
}
.tb .popup-sure {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ccc;
  text-align: right;
  line-height: 40px;
  font-size: 17px;
  padding: 0 5px;
  color: #30aaed;
  box-sizing: border-box;
}
.tb div.mapqushi-date {
  position: absolute;
  text-align: left;
  left: 2%;
  top: 2%;
  height: auto;
  width: auto;
  font-size: 18px;
}
.tb div.mapqushi-date .mapqushi-date-duration {
  font-family:PingFang-SC-Heavy,PingFang-SC;
  font-weight:800;
  color:rgba(255,255,255,.75);
  font-size: 12px;
}
.tb div.mapqushi-date .mapqushi-date-current {
  width: auto;
  display: inline-block;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
  font-family:PingFang-SC-Heavy,PingFang-SC;
}
.tb div.mapqushi-date .play-icon {
  width: 25px;
  height: 25px;
  margin-top: 5px;
  vertical-align: middle;
}
.tb div.mapqushi-date .date-icon {
  width: 15px;
  height: 14px;
  display: inline-block;
  margin-right: 3px;
  background: url(./img/date.png) center no-repeat;
  background-size: contain;
}
.tb div.mapqushi-date .now-play {
  background: url(./img/bofang.png) center no-repeat;
  background-size: 100% 100%;
}
.tb div.mapqushi-date .now-stop {
  background: url(./img/zanting.png) center no-repeat;
  background-size: 100% 100%;
}
.tb div.mapqushi-date .play-icon {
  width: 40px;
  height: 40px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
}
.tb div.mapqushi-date .now-play {
  background: url(./img/bofang.png) center no-repeat;
  background-size: 100% 100%;
}
.tb div.mapqushi-date .now-stop {
  background: url(./img/zanting.png) center no-repeat;
  background-size: 100% 100%;
}
</style>