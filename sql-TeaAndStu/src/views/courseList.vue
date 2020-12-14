<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>课程列表</span>
       <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">新建课程</el-button>
       <el-dialog
        title="新建实验"
        :visible.sync="dialog"
        width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="课程名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="选择班级">
            <el-select v-model="form.teachClasses" placeholder="请选择授课班级">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程信息">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCourse">确认</el-button>
            <el-button @click="dialog = false">取消</el-button>
          </el-form-item>
        </el-form>
       </el-dialog>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="课程名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="授课班级">
        <template slot-scope="scope">
            <p>{{ scope.row.teachClasses }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="toCourseDetail(scope.row._id, scope.row.teachClasses)">进入课程</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteCourse(scope.row._id)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toCount(scope.row._id, scope.row.teachClasses)">统计</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      tableData: [],
      form: {
        name: '',
        teachClasses: '',
        info: '',
        teacherId: ''
      },
      options: []
    }
  },
  methods: {
    toCourseDetail (id, classes) {
      localStorage.setItem('courseId', id)
      localStorage.setItem('classes', classes)
      this.$router.push('/header/courseDetail')
    },
    toCount (id, classes) {
      localStorage.setItem('classes', classes)
      localStorage.setItem('courseId', id)
      this.$router.push('/count')
    },
    // 获取课程列表
    async getCourseList () {
      // const token = localStorage.getItem('token')
      // console.log(this.$store.state.teacherId)
      const id = localStorage.getItem('teacherId')
      const res = await this.$axios.get(`/teacher/course/getCourseList?id=${id}`)
      this.tableData = res.data.data
    },
    // 获取班级列表
    async getClassesList () {
      const res = await this.$axios.get('/admin/classes/getClassesList')
      res.data.data.map((item) => {
        this.options.push({
          value: item,
          label: item
        })
      })
    },
    // 新建课程
    async addCourse () {
      const id = localStorage.getItem('teacherId')
      this.form.teacherId = id
      const res = await this.$axios.post('/teacher/course/addCourse', this.form)
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '新建成功!'
        })
        this.dialog = false
        this.getCourseList()
      }
    },
    // 删除课程
    deleteCourse (id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/teacher/course/deleteCourse?id=${id}`)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getCourseList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getCourseList()
    this.getClassesList()
  }
}
</script>
