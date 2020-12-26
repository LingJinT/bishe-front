<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>所有班级</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="班级id">
          <template slot-scope="scope">
            <p>{{ scope.row }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteClasses(scope.$index)"
              >删除</el-button
            >
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
      options: [],
      classesId: '',
      select: '',
      Editdialog: false,
      tableData: []
    }
  },
  methods: {
    // 获取班级列表
    async getClassesList () {
      const res = await this.$axios.get('/admin/classes/getClassesList')
      this.tableData = res.data.data
    },
    // 删除班级
    async deleteClasses (index) {
      this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/admin/classes/deleteClasses?classes=${this.tableData[index]}`)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getClassesList()
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
    this.getClassesList()
  }
}
</script>

<style scoped>
/* .el-input{
   width: 80%;
} */
</style>
