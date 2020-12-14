<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>所有学生</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">新增学生</el-button>
        <el-dialog
          title="新增学生"
          :visible.sync="dialog"
          width="30%">
          <el-form label-position="left" label-width="80px" :model="newStudent">
            <el-form-item label="名称">
              <el-input v-model="newStudent.name"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="newStudent.id"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="newStudent.classes"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="addStudent">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'userId', order: 'descending'}">
        <el-table-column
          label="名称">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="学号"
          sortable
          prop="userId">
          <template slot-scope="scope">
              <p>{{ scope.row.userId }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="班级"
          sortable
          prop="classes">
          <template slot-scope="scope">
              <p>{{ scope.row.classes }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="updateStudent(scope.row.userId)">编辑</el-button>
            <el-button
            size="mini"
            type="warning"
            @click="resetPassword(scope.row.userId)">重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteStudent(scope.row.userId)">删除</el-button>
            <el-dialog
              title="编辑学生"
              :visible.sync="Editdialog"
              width="30%">
              <el-form label-position="left" label-width="80px" :model="tableData[index]">
                <el-form-item label="名称">
                  <el-input v-model="tableData[index].name"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                  <el-input v-model="tableData[index].userId"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                  <el-input v-model="tableData[index].classes"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmUpdateStudent">确 定</el-button>
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
      newStudent: {
        name: '',
        id: '',
        classes: ''
      },
      tableData: []
    }
  },
  methods: {
    // 获取学生列表
    async getStudentsList () {
      const res = await this.$axios.get('/admin/student/getStudentsList')
      if (res.data.code === 200) {
        this.tableData = res.data.data
      }
    },
    // 增加学生
    async addStudent () {
      const res = await this.$axios.post('/admin/student/addStudent', this.newStudent)
      if (res.data.code === 200) {
        this.dialog = false
        this.getStudentsList()
        this.newStudent = {
          name: '',
          id: '',
          classes: ''
        }
      }
    },
    // 更新学生
    updateStudent (id) {
      this.tableData.map((item, index) => {
        if (item.userId === id) {
          this.index = index
        }
      })
      this.Editdialog = true
    },
    async confirmUpdateStudent () {
      const res = await this.$axios.put('/admin/student/updateStudent', this.tableData[this.index])
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
      this.getStudentsList()
    },
    // 重置密码
    async resetPassword (id) {
      this.$confirm('此操作将重置该学生的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.put('/admin/student/resetPassword', {
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
    // 删除学生
    async deleteStudent (id) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/admin/student/deleteStudent?id=${id}`)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getStudentsList()
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
    this.getStudentsList()
  }
}
</script>
