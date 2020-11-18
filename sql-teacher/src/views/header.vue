<template>
  <el-container>
    <el-header>
      <span>SQL实验管理系统</span>
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
              active-text-color="#ffd04b">
              <el-menu-item index="1" @click="toCourseList">
                  <i class="el-icon-location"></i>
                  <span slot="title">课程列表</span>
              </el-menu-item>
              <el-menu-item index="2" @click="addCourse">
                <i class="el-icon-menu"></i>
                <span slot="title">新建课程</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title" @click="selfInfo">个人中心</span>
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
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
    toCourseList () {
      this.$router.push('/header/courseList')
    },
    addCourse () {
      this.$router.push('/header/addCourse')
    },
    selfInfo () {
      this.$router.push('/header/selfInfo')
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
