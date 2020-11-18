<template>
  <el-card>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="选择班级">
        <el-select v-model="form.classes" placeholder="请选择授课班级">
          <el-option label="班级一" value="shanghai"></el-option>
          <el-option label="班级二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程信息">
        <el-input type="textarea" v-model="form.classesInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        classes: '',
        classesInfo: ''
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

<style scoped>
.container {
  padding: 50px;
}
</style>
