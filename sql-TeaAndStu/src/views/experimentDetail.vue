<template>
  <div>
    <el-card class="box-card">
      <div>实验标题</div>
      <el-divider></el-divider>
      <div>实验内容</div>
      <el-divider></el-divider>
      <div>参考答案</div>
      <el-divider></el-divider>
      <div>实验统计</div>
      <div class='main' ref="chart"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      const myChart = this.$echarts.init(this.$refs.chart)
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>
.main {
  width: 500px;
  height: 500px;
}
</style>
