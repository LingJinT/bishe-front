<template>
  <el-container>
    <el-header>
      <span>SQL实验管理系统——学生端</span>
      <span @click="logout" class="logout">logout</span>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  color: #ffffff;
}
.logout {
  cursor: pointer;
}
</style>
