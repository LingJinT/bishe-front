<template>
  <div class="loginContainer">
    <el-card>
      <el-form
        label-position="left"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名" style="margin-top: 20px">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // const { data: res } = await this.$http.post('login/', this.formLabelAlign)
      // if (res.code === 1000) {
      this.$router.push('/courseList')
      // }
    }
  }
}
</script>

<style scoped>
.loginContainer {
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
