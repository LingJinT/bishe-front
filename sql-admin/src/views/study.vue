<template>
  <el-card>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="资料名"
        width="100px">
      </el-table-column>
      <el-table-column
        label="资料链接">
        <template slot-scope="scope">
          <a :href="scope.row.linkUrl" target="_blank"><span class="text">{{ scope.row.linkUrl }}</span></a>
        </template>
      </el-table-column>
      <el-table-column
        label="图片链接"
        width="300px">
        <template slot-scope="scope">
          <a :href="scope.row.imgUrl" target="_blank"><span class="text">{{ scope.row.imgUrl }}</span></a>
        </template>
      </el-table-column>
       <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="updateLearning(scope.$index, scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteLearning(scope.row._id)">删除</el-button>
          <el-dialog title="编辑资料" :visible.sync="dialog" width="30%">
            <el-form
              label-position="left"
              label-width="80px"
              :model="tableData[index]"
            >
              <el-form-item label="资料名称">
                <el-input v-model="tableData[index].name"></el-input>
              </el-form-item>
              <el-form-item label="资料链接">
                <el-input v-model="tableData[index].linkUrl"></el-input>
              </el-form-item>
              <el-form-item label="图片链接">
                <el-input v-model="tableData[index].imgUrl"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="confirm"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      dialog: false,
      index: 0
    }
  },
  methods: {
    // 获取资料
    async getLearningList () {
      const res = await this.$axios.get('/teacher/learning/getLearningList')
      if (res.data.code === 200) {
        this.tableData = res.data.data
      }
    },
    // 修改资料
    updateLearning (index, id) {
      this.index = index
      this.dialog = true
    },
    async confirm () {
      const res = await this.$axios.put('/teacher/learning/updateLearning', this.tableData[this.index])
      if (res.data.code === 200) {
        this.dialog = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
    },
    cancel () {
      this.Editdialog = false
      this.getLearningList()
    },
    // 删除资料
    async deleteLearning (id) {
      this.$confirm('此操作将永久删除该学习资料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/teacher/learning/deleteLearning?id=${id}`)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getLearningList()
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
    this.getLearningList()
  }
}
</script>

<style scoped>
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
