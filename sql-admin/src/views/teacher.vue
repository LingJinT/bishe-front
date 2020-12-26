<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
          <span>所有教师</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">新建教师</el-button>
          <el-dialog
          title="新建教师"
          :visible.sync="dialog"
          width="30%">
          <el-form label-position="left" label-width="80px" :model="newTeacher">
            <el-form-item label="姓名">
              <el-input v-model="newTeacher.name"></el-input>
            </el-form-item>
            <el-form-item label="工号">
              <el-input v-model="newTeacher.id"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="addTeacher">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="工号">
          <template slot-scope="scope">
              <p>{{ scope.row.userId }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱">
          <template slot-scope="scope">
              <p>{{ scope.row.email }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号">
          <template slot-scope="scope">
              <p>{{ scope.row.phone }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="updateTeacher(scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="warning"
            @click="resetPassword(scope.row.userId)">重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteTeacher(scope.row.userId)">删除</el-button>
            <el-dialog
              title="编辑教师"
              :visible.sync="Editdialog"
              width="30%">
              <el-form label-position="left" label-width="80px" :model="editTeacher">
                <el-form-item label="姓名">
                  <el-input v-model="editTeacher.name"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                  <el-input v-model="editTeacher.userId" disabled></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmUpdateTeacher">确 定</el-button>
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
      dialog: false,
      Editdialog: false,
      index: 0,
      newTeacher: {
        name: '',
        id: ''
      },
      editTeacher: {},
      tableData: []
    }
  },
  methods: {
    // 获取教师列表
    async getTeacherList () {
      const res = await this.$axios.get('/admin/teacher/getTeacherList')
      this.tableData = res.data.data
    },
    // 新建教师
    async addTeacher () {
      const res = await this.$axios.post('/admin/teacher/addTeacher', this.newTeacher)
      if (res.data.code === 200) {
        this.getTeacherList()
        this.dialog = false
      }
    },
    // 更新教师
    updateTeacher (info) {
      this.editTeacher = info
      this.Editdialog = true
    },
    async confirmUpdateTeacher () {
      const res = await this.$axios.put('/admin/teacher/updateTeacher', this.editTeacher)
      if (res.data.code === 200) {
        this.Editdialog = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
    },
    // 取消编辑
    cancel () {
      this.Editdialog = false
      this.getTeacherList()
    },
    // 重置密码
    async resetPassword (id) {
      this.$confirm('此操作将重置该老师的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.put('/admin/teacher/resetPassword', {
          id
        })
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '重置成功'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    // 删除
    async deleteTeacher (id) {
      this.$confirm('此操作将永久删除该老师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/admin/teacher/deleteTeacher?id=${id}`)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTeacherList()
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
    this.getTeacherList()
  }
}
</script>
