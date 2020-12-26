<template>
  <el-container>
    <el-header>
      <span class="img"><img src="../../../public/SQL.png" alt="">SQL实验管理系统——学生端</span>
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
              <el-menu-item index="/ScourseList">
                  <i class="el-icon-document"></i>
                  <span slot="title">课程列表</span>
              </el-menu-item>
              <el-menu-item index="/Slearning">
                <i class="el-icon-document"></i>
                <span slot="title">学习资料</span>
              </el-menu-item>
              <el-menu-item index="/SselfInfo">
                <i class="el-icon-document"></i>
                <span slot="title">个人中心</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
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
.el-aside {
  height: 100%;
  background: rgb(84, 92, 100);
}
.logout {
  cursor: pointer;
}
.img {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
