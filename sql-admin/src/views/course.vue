<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>所有课程</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="授课班级">
          <template slot-scope="scope">
            <p>{{ scope.row.teachClasses }}</p>
          </template>
        </el-table-column>
        <el-table-column label="课程信息">
          <template slot-scope="scope">
            <p>{{ scope.row.info }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="dialogTrue(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteCourse(scope.row._id)"
              >删除</el-button
            >
            <el-dialog title="编辑课程" :visible.sync="Editdialog" width="30%">
              <el-form
                label-position="left"
                label-width="80px"
                :model="editCourse"
              >
                <el-form-item label="课程名称">
                  <el-input v-model="editCourse.name"></el-input>
                </el-form-item>
                <el-form-item label="授课班级">
                  <el-input v-model="editCourse.teachClasses" disabled></el-input>
                </el-form-item>
                <el-form-item label="课程信息">
                  <el-input v-model="editCourse.info"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="updateCourse"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Editdialog: false,
      tableData: [],
      editCourse: {}
    }
  },
  methods: {
    // 获取课程列表
    async getCourseList () {
      const res = await this.$axios.get('/admin/course/getCourseList')
      if (res.data.code === 200) {
        this.Editdialog = false
        this.tableData = res.data.data
      }
    },
    // 弹出对话框
    dialogTrue (info) {
      this.editCourse = info
      this.Editdialog = true
    },
    // 编辑课程
    async updateCourse () {
      const res = await this.$axios.put('/admin/course/updateCourse', this.editCourse)
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.Editdialog = false
        this.getCourseList()
      }
    },
    // 取消编辑
    cancel () {
      this.Editdialog = false
      this.getCourseList()
    },
    // 删除课程
    async deleteCourse (id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/admin/course/deleteCourse?id=${id}`)
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
  }
}
</script>
