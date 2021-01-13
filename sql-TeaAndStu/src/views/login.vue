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
                <el-input v-model="form.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="身份" prop="resource">
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
            <el-form ref="resetPassword" :model="resetForm" label-width="80px" :rules="rules">
              <el-form-item label="用户名" prop="userId">
                <el-input v-model="resetForm.userId"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="resetForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password1">
                <el-input v-model="resetForm.password1" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2">
                <el-input v-model="resetForm.password2" show-password></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="check">
                <el-input v-model="resetForm.check"></el-input>
              </el-form-item>
              <el-form-item label="身份">
                <el-radio-group v-model="resetForm.resource" prop="resourceReset">
                  <el-radio label="student"></el-radio>
                  <el-radio label="teacher"></el-radio>
                </el-radio-group>
              </el-form-item>
              <div style="color: red;padding-left: 20px" v-if="resetError">用户名不存在或验证码错误</div>
              <el-form-item>
                <el-button type="primary" @click="reset">确定重置</el-button>
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      form: {
        username: '',
        password: '',
        resource: ''
      },
      resetForm: {
        userId: '',
        phone: '',
        password1: '',
        password2: '',
        check: '',
        resource: ''
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        resourceReset: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        check: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        phone: [
          {
            trigger: 'blur',
            message: '手机号格式不正确',
            transform (value) {
              if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                return true
              } else {
              }
            }
          }
        ],
        password2: [
          { trigger: 'blur', message: '两次输入的密码不一致', validator: validatePass }
        ]
      },
      error: false,
      resetError: false
    }
  },
  methods: {
    async login () {
      this.$refs.loginform.validate(async (valid) => {
        if (valid) {
          if (this.form.resource === '教师登录') {
            const res = await this.$axios.post('/teacher/login', this.form)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('teacherId', this.form.username)
            // this.$store.commit('setTeacherId', this.form.username)
            if (res.data.code === 200) {
              this.$router.push('/header')
            } else {
              this.error = true
            }
          } else {
            const res = await this.$axios.post('/student/login', this.form)
            if (res.data.code === 200) {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('classes', res.data.data[0].classes)
              localStorage.setItem('studentId', res.data.data[0].userId)
              this.$router.push('/ScourseList')
            } else {
              console.log('123')
              this.error = true
            }
          }
        } else {
          return false
        }
      })
    },
    async send () {
      const res = await this.$axios.post(`/${this.resetForm.resource}/login/check`, {
        phone: this.resetForm.phone
      })
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '发送验证码成功'
        })
      }
    },
    reset () {
      this.$refs.resetPassword.validate(async (valid) => {
        if (valid) {
          const res = await this.$axios.post(`/${this.resetForm.resource}/login/reset`, {
            userId: this.resetForm.userId,
            check: this.resetForm.check,
            password: this.resetForm.password2
          })
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改密码成功'
            })
          } else {
            this.resetError = true
          }
        }
      })
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
