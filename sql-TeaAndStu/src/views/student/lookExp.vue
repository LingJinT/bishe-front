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
      <el-card class="box-card" style="margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span>实验答案</span>
        </div>
        <div>
          <p>答案内容</p>
          <p>答案内容</p>
          <p>答案内容</p>
          <p>答案内容</p>
        </div>
      </el-card>
    </el-main>
    <el-footer>
      <div>
        您本题得分为XXX
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.el-textarea {
  margin-top: 20px;
}
</style>
