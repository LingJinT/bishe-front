<template>
  <el-container>
    <el-header>
      <span>SQL实验管理系统——管理员端</span>
      <span @click="logout" class="logout">logout</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
              <el-menu-item index="/teacher">
                  <i class="el-icon-location"></i>
                  <span slot="title">教师管理</span>
              </el-menu-item>
              <el-menu-item index="/student">
                <i class="el-icon-menu"></i>
                <span slot="title">学生管理</span>
              </el-menu-item>
              <el-menu-item index="/course">
                <i class="el-icon-document"></i>
                <span slot="title">课程管理</span>
              </el-menu-item>
              <el-menu-item index="/classes">
                <i class="el-icon-document"></i>
                <span slot="title">班级管理</span>
              </el-menu-item>
              <el-menu-item index="/study">
                <i class="el-icon-document"></i>
                <span slot="title">学习资料管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
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

<style scoped>
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
.el-aside {
  height: 100%;
  background: rgb(84, 92, 100);
}
.logout {
  cursor: pointer;
}
</style>
