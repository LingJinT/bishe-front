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
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入您的答案"
        v-model="textarea">t
      </el-input>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="compile">编译</el-button>
      <el-button type="success" @click="handleAnswer">提交</el-button>
      <el-dialog
        title="编译结果"
        :visible.sync="dialog"
        width="30%">
        <div>{{ result }}</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提交结果"
        :visible.sync="handleDialog"
        width="30%">
        <div>{{ handleRes }}</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      textarea: '',
      ExperimentInfo: {},
      dialog: false,
      result: '',
      handleDialog: false,
      handleRes: ''
    }
  },
  methods: {
    // 编译
    async compile () {
      try {
        const res = await this.$axios.post('student/exam/compile', {
          code: this.textarea
        })
        console.log(res)
        this.result = res.data.data
        this.dialog = true
      } catch {
        this.result = '编译失败,请输入正确的格式'
        this.dialog = true
      }
    },
    // 获取实验信息
    async getExperimentDetail () {
      const gradeId = localStorage.getItem('gradeId')
      const res = await this.$axios.get(`student/experiment/getExperimentDetail?id=${gradeId}`)
      if (res.data.code === 200) {
        this.ExperimentInfo = res.data.data
      }
    },
    // 提交
    async handleAnswer () {
      const gradeId = localStorage.getItem('gradeId')
      const res = await this.$axios.post('student/experiment/handleAnswer', {
        id: gradeId,
        answer: this.textarea
      })
      if (res.data.code === 200) {
        this.handleRes = res.data.msg
        this.handleDialog = true
      }
    },
    confirm () {
      this.$router.push('/Sexperiment')
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
