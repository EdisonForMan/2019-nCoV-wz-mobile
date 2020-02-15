<template>
	<div class="qf-chart">
		<div class="qf-chart-title">成功劝返人员统计</div>
		<div class="qf-chart-content" ref="qf"></div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	name: 'qf-chart',
	data () {
		return {

		}
	},
	methods: {
		...mapActions(["fetchQfList"]),
		drawEchart () {
		    this.chart = this.$echarts.init(this.$refs.qf);
	        this.chart.setOption({
	          tooltip: {
	            trigger: "axis",
	            axisPointer: {
	              type: "shadow"
	            }
	          },
	          tooltip: {
	            trigger: "axis"
	          },
	          grid: {
	            top: "5%",
	            left: "0",
	            right: "4%",
	            bottom: "5%",
	            containLabel: true
	          },
	          legend: {
	            show: true,
	            right: '4%',
	            top: '1%',
	            textStyle: {
	              color: '#fff'
	            },
	            data: [{name: '湖北籍人员'}, {name: '其他籍贯人员'}]
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
	              data: ["鹿城", "龙湾", "瓯海", "洞头", "乐清", "瑞安", "永嘉", "平阳", "苍南", "文成", "泰顺", "龙港", "浙南", "瓯江口"]
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
	              name: "湖北籍人员",
	              type: "bar",
	              stack: 'one',
	              label: {
	              	position: 'inside',
	              	distance: 12,
	                show: false,
	                color: "#fff",
	                formatter: function(param) {
	                  return param.value;
	                }
	              },
	              itemStyle: {
	                color: new this.$echarts.graphic.LinearGradient(
	                    0, 0, 0, 1,
	                    [
	                      {offset: 0, color: '#FFFEB1'},
	                      {offset: 1, color: '#FFDE00'}
	                    ]
	                )
	              },
	              barWidth: 10,
	              data: ["68", "17", "36", "5", "168", "74", "52", "30", "9", "10", "20", "8", "1", "1"]
	            },
	            {
	              name: "其他籍贯人员",
	              type: "bar",
	              stack: 'one',
	              barWidth: 10,
	              label: {
	              	position: 'top',
	                show: true,
	                color: "#fff",
	                formatter: function(param) {
	                  return param.value;
	                }
	              },
	              itemStyle: {
	                color: new this.$echarts.graphic.LinearGradient(
	                    0, 0, 0, 1,
	                    [
	                      {offset: 0, color: '#A93FE0'},
	                      {offset: 1, color: '#CF72FF'}
	                    ]
	                )
	              },
	              data: ["16", "2", "7", "0", "56", "46", "10", "12", "3", "1", "4", "2", "0", "0"]
	            }
	          ]
	        });
		}
	},
	mounted () {
		// this.fetchQfList().then(() => {
			this.drawEchart();
		// });	
	}
}
</script>
<style scoped>
	.qf-chart {
		width: 100%;
		height: auto;
	}
	.qf-chart-title {
		width: 100%;
		font-size: 20px;
		background-image:-webkit-linear-gradient(bottom, #6470ff, #78c1ff); 
	    -webkit-background-clip:text; 
	    -webkit-text-fill-color:transparent;
	    font-weight: bold;
	}
	.qf-chart-content {
		width: 100%;
		height: 300px;
	}
</style>