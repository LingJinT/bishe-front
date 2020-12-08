<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户名登录" name="first">
            <el-form ref="loginform" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.user" placeholder='工号/邮箱/手机号'></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="学生登录"></el-radio>
                  <el-radio label="教师登录"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="忘记密码" name="five">
            <el-form ref="loginform" :model="form" label-width="80px">
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
        user: '',
        password: '',
        resource: ''
      },
      isLogin: true
    }
  },
  methods: {
    async login () {
      const res = await this.$axios.post('/login/', this.form)
      localStorage.setItem('token', res.data.token)
      if (this.form.resource === '教师登录') {
        this.$router.push('/header')
      } else {
        this.$router.push('/ScourseList')
      }
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
