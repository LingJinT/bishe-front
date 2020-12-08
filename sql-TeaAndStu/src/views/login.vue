<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户名登录" name="first">
            <el-form ref="loginform" :model="form" label-width="80px" :rules="rules">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder='工号/学号'></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="form.resource">
                  <el-radio label="学生登录"></el-radio>
                  <el-radio label="教师登录"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <div v-if="error" style="color: red">用户名密码错误</div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="忘记密码" name="five">
            <el-form ref="resetPassword" :model="form" label-width="80px">
              <el-form-item label="手机号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="send">发送验证码</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        username: '',
        password: '',
        resource: ''
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      error: false
    }
  },
  methods: {
    async login () {
      this.$refs.loginform.validate(async (valid) => {
        if (valid) {
          if (this.form.resource === '教师登录') {
            const res = await this.$axios.post('/teacher/login', this.form)
            localStorage.setItem('token', res.data.token)
            if (res.data.code === 200) {
              this.$router.push('/header')
            } else {
              this.error = true
            }
          } else {
            const res = await this.$axios.post('/student/login', this.form)
            localStorage.setItem('token', res.data.token)
            if (res.data.code === 200) {
              this.$router.push('/ScourseList')
            } else {
              this.error = true
            }
          }
        } else {
          return false
        }
      })
    },
    register () {
      console.log('注册成功')
    },
    cancel () {
      console.log('取消成功')
    },
    send () {
      console.log('发送验证码成功')
    },
    reset () {
      console.log('重置密码成功')
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card {
  margin-top: 100px;
  width: 600px
}
.el-form-item {
  margin-top: 22px;
}
</style>
