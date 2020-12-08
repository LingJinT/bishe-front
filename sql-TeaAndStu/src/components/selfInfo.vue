<template>
  <el-card style="width: 500px;margin: auto;margin-top: 50px">
    <div class="header"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.password1"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialog = false">修改</el-button>
        <el-button @click="dialog = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        phoneNumber: '',
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: auto;
  width: 60px;
  height: 60px;
  border: 1px solid pink;
  border-radius: 60px;
  background: pink;
  margin-bottom: 30px;
}
</style>
