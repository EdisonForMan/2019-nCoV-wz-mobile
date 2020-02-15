<template>
	<div class="fg-chart">
		<div class="fg-chart-title">返工人员统计</div>
		<div class="fg-chart-content" ref="fg"></div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	name: 'fg-chart',
	data () {
		return {

		}
	},
	methods: {
		...mapActions(["fetchFgList"]),
		drawEchart () {
		    this.chart = this.$echarts.init(this.$refs.fg);
		    var rich = {
			    title: {
			        fontSize: 14,
			        align: 'left',
			        padding: [5, 0]
			    },
			    value: {
			        color: '#fff',
			        align: 'left',
			        fontSize: 14,
			    }
			}
			var data = [{
			    value: 66.66,
			    name: '其他返工人员'
			}, {
			    value: 2.1,
			    name: '未返乡留温人员'
			}, {
			    value: 7.11,
			    name: '湖北籍返工人员'
			}];
			var total = 0;
			data.map((item) => {
			   total += item.value; 
			});
			total = total.toFixed(2);
	        this.chart.setOption({
			    color: ['#A93FE0','#FF922F','#B7BF56'],
			    title: {
			        x: 'center',
			        y: 'center',
			        text: '返工人员共计',
			        textStyle: {
			            color: '#fff',
			            fontSize: 12,
			            fontWeight: 600
			        },
			        itemGap: 13,
			        subtext: total + '\n万人',
			        subtextStyle: {
			            color: '#fff',
			            fontSize: 16,
			            fontWeight: 800
			        }
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} :<br/>{c}万人 ({d}%)"
			    },
			    calculable : true,
			    series : [
			        {
			            name:'返工人员统计',
			            type:'pie',
			            startAngle: 55,
			            center: ['50%', '53%'],
			            radius: ['30%', '55%'],
			            label: {
			            normal: {
			                formatter: function(params) {
			                    return '{title|' + params.name + '\n共计} {value|' + params.value + '万人}';
			                },
			                rich: rich
			            },
			        },
			            data:data
			        }
			    ]
			});
		}
	},
	mounted () {
		// this.fetchFgList().then(() => {
			this.drawEchart();
		// });	
	}
}
</script>
<style scoped>
	.fg-chart {
		width: 100%;
		height: auto;
	}
	.fg-chart-title {
		width: 100%;
		font-size: 20px;
		background-image:-webkit-linear-gradient(bottom, #6470ff, #78c1ff); 
	    -webkit-background-clip:text; 
	    -webkit-text-fill-color:transparent;
	    font-weight: bold;
	}
	.fg-chart-content {
		width: 100%;
		height: 300px;
	}
</style>