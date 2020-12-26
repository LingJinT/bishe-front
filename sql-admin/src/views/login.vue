<template>
  <div class="loginContainer">
    <el-card>
      <el-form
        label-position="left"
        label-width="80px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" style="margin-top: 20px" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password @keyup.enter.native="login('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="error" v-show="isError">用户名密码错误</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      isError: false
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid)
        if (valid) {
          const res = await this.$axios.post('/admin/login', this.loginForm)
          const token = res.data.token
          localStorage.setItem('token', token)
          if (res.data.code === 200) {
            this.$router.push('/index')
          } else {
            this.isError = true
          }
        } else {
          return false
        }
      })
    }
  },
  created () {
    console.log(new Date().toLocaleDateString('id', { year: 'numeric', month: 'long', day: 'numeric' }))
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
.error {
  color: red;
}
</style>
