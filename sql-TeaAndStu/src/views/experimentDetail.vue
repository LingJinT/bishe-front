<template>
  <div>
    <el-card class="box-card">
      <div class="title">实验标题</div>
      <div>{{ experimentDetail.name }}</div>
      <el-divider></el-divider>
      <div class="title">实验内容</div>
      <div>{{ experimentDetail.content }}</div>
      <el-divider></el-divider>
      <div class="title">数据库类型</div>
      <div>{{ experimentDetail.type }}</div>
      <el-divider></el-divider>
      <div class="title">参考答案</div>
      <div>{{ experimentDetail.answer }}</div>
      <el-divider></el-divider>
      <div class="charts">
        <div class='main' ref="chart1"></div>
        <div class='main' ref="chart2"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      option1: {
        title: {
          text: '完成率',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['未完成人数', '完成人数']
        },
        series: [
          {
            name: '完成情况',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: '正确率',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['正确人数', '错误人数']
        },
        series: [
          {
            name: '批改情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      id: '',
      experimentDetail: {}
    }
  },
  mounted () {},
  methods: {
    initEcharts () {
      const myChart1 = this.$echarts.init(this.$refs.chart1)
      myChart1.setOption(this.option1)
      const myChart2 = this.$echarts.init(this.$refs.chart2)
      myChart2.setOption(this.option2)
    },
    // 获取实验信息
    async getExperimentDetail () {
      const res = await this.$axios.get(`/teacher/experiment/getExperimentDetail?id=${this.id}`)
      if (res.data.code === 200) {
        this.experimentDetail = res.data.data
      }
    },
    // 实验统计
    async getgradeDetail () {
      const res = await this.$axios.get(`/teacher/experimentDetail/experimentDetail?id=${this.id}`)
      if (res.data.code === 200) {
        this.option1.series[0].data.push({
          value: res.data.data.finishedCount,
          name: '完成人数'
        })
        const notFinished = res.data.data.totalCount - res.data.data.finishedCount
        this.option1.series[0].data.push({
          value: notFinished,
          name: '未完成人数'
        })
        this.option2.series[0].data.push({
          value: res.data.data.correctCount,
          name: '正确人数'
        })
        const errCount = res.data.data.finishedCount - res.data.data.correctCount
        this.option2.series[0].data.push({
          value: errCount,
          name: '错误人数'
        })
      }
    }
  },
  created () {
    this.id = localStorage.getItem('experimentId')
    this.getExperimentDetail()
    this.getgradeDetail().then(() => {
      this.initEcharts()
    })
  }
}
</script>

<style scoped>
.main {
  width: 500px;
  height: 500px;
}
.title {
  margin-bottom: 10px
}
/* .charts {
  display: flex;
  justify-content: space-around;
} */
</style>
