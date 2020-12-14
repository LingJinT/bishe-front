<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div>
          <h3 style="text-align: center">{{ ExperimentInfo.name }}</h3>
          <p class="keyWords">关键字: <span>{{ ExperimentInfo.keyWords }}</span></p>
          <p class="main">实验内容:</p>
          <p class="content">{{ ExperimentInfo.content }}</p>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span>实验答案</span>
        </div>
        <div>
          {{ ExperimentInfo.answer }}
        </div>
      </el-card>
    </el-main>
    <el-footer>
      <div>
        您本题得分为<span style="font-size: 16px; font-weight: bold">{{ grade }}分</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      ExperimentInfo: '',
      grade: ''
    }
  },
  methods: {
    async getExperimentDetail () {
      const gradeId = localStorage.getItem('gradeId')
      const res = await this.$axios.get(`student/experiment/getExperimentDetail?id=${gradeId}`)
      console.log(res.data)
      if (res.data.code === 200) {
        this.ExperimentInfo = res.data.data
        this.grade = res.data.exData
      }
    }
  },
  created () {
    this.getExperimentDetail()
  }
}
</script>

<style scoped>
.el-textarea {
  margin-top: 20px;
}
.keyWords {
  margin-bottom: 20px
}
.main {
  margin-top: 5px;
  margin-bottom: 5px
}
.content {
  margin-top: 10px;
}
</style>
