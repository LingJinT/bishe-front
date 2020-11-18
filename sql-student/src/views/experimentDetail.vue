<template>
  <el-container>
    <el-header>实验标题</el-header>
    <el-main>
      <el-card class="box-card">
        <div>
          <p>实验描述</p>
          <p>实验内容</p>
          <p>实验内容</p>
          <p>实验内容</p>
          <p>实验内容</p>
          <p>实验限制</p>
          <p>实验等等</p>
        </div>
      </el-card>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入您的答案"
        v-model="textarea">
      </el-input>
    </el-main>
    <el-footer>
      <el-button type="primary">编译</el-button>
      <el-button type="success" @click="submit">提交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    submit () {
      confirm('提交成功')
    }
  }
}
</script>

<style scoped>
.el-textarea {
  margin-top: 20px;
}
</style>
