<template>
  <el-card style="width: 500px;margin: auto;margin-top: 50px">
    <div class="header">{{ form.name }}</div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password1">
        <el-input v-model="form.password1" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="form.password2" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUser">修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        email: [
          {
            trigger: 'blur',
            message: '邮箱格式不正确',
            transform (value) {
              if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
                return true
              } else {
              }
            }
          }
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
      }
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      // 根据路由判断教师还是学生
      if (this.$route.path === '/header/selfInfo') {
        const teacherId = localStorage.getItem('teacherId')
        const res = await this.$axios.get(`teacher/login/getUserInfo?id=${teacherId}`)
        this.form = res.data.data
      } else {
        const studentId = localStorage.getItem('studentId')
        const res = await this.$axios.get(`student/login/getUserInfo?id=${studentId}`)
        this.form = res.data.data
      }
    },
    // 修改用户信息
    updateUser () {
      // 根据路由判断教师还是学生
      if (this.$route.path === '/header/selfInfo') {
        const teacherId = localStorage.getItem('teacherId')
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            const res = await this.$axios.put('/teacher/login/updateUser', {
              id: teacherId,
              email: this.form.email,
              phone: this.form.phone,
              password: this.form.password2
            })
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getUserInfo()
            }
          }
        })
      } else {
        const studentId = localStorage.getItem('studentId')
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            const res = await this.$axios.put('/student/login/updateUser', {
              id: studentId,
              email: this.form.email,
              phone: this.form.phone,
              password: this.form.password2
            })
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getUserInfo()
            }
          }
        })
      }
    },
    // 取消修改
    cancel () {
      this.getUserInfo()
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}
</style>
