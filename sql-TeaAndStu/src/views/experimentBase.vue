<template>
  <div>
    <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>共享题库</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            label="实验名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column
            label="数据库">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column
            label="分值">
            <template slot-scope="scope">
              {{ scope.row.scope }}
            </template>
          </el-table-column>
           <el-table-column
            label="关键词">
            <template slot-scope="scope">
              {{ scope.row.keyWords }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleLook(scope.row)"
                style="margin-right: 20px">查看</el-button>
              <el-dialog
                :visible.sync="dialog"
                width="30%">
                <el-form label-position="left" label-width="80px" :model="editExperiment" disabled>
                  <el-form-item label="实验内容">
                    <el-input v-model="editExperiment.content" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="答案">
                    <el-input v-model="editExperiment.answer" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialog = false">取 消</el-button>
                  <el-button type="primary" @click="dialog = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button
                size="mini"
                type="warning"
                @click="importExperiment(scope.row)">导入</el-button>
              <el-dialog
                title="导入实验"
                :visible.sync="importDialog"
                width="30%">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="选择课程">
                    <el-select v-model="form.courseId" placeholder="请选择要导入的课程">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="confirmImport(form.courseId)">确认</el-button>
                    <el-button @click="importDialog = false">取消</el-button>
                  </el-form-item>
                </el-form>
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
      importDialog: false,
      tableData: [],
      classes: '',
      form: {
        courseId: ''
      },
      courseList: [],
      options: [],
      editExperiment: {}
    }
  },
  methods: {
    handleLook (info) {
      this.editExperiment = info
      this.dialog = true
    },
    // 获取共享实验列表
    async getExperimentList () {
      const res = await this.$axios.get('/teacher/experiment/getShareExperimentList')
      if (res.data.code === 200) {
        this.tableData = res.data.data
      }
    },
    // 获取课程列表
    async getCourseList () {
      const id = localStorage.getItem('teacherId')
      const res = await this.$axios.get(`/teacher/course/getCourseList?id=${id}`)
      this.courseList = res.data.data
      res.data.data.map((item) => {
        this.options.push({
          value: item._id,
          label: item.name
        })
      })
    },
    // 导入课程
    importExperiment (info) {
      this.editExperiment = info
      this.importDialog = true
    },
    async confirmImport (id) {
      this.courseList.map((item) => {
        if (item._id === id) {
          this.classes = item.teachClasses
        }
      })
      const params = {
        name: this.editExperiment.name,
        content: this.editExperiment.content,
        keyWords: this.editExperiment.keyWords,
        answer: this.editExperiment.answer,
        scope: this.editExperiment.scope,
        courseId: id,
        classes: this.classes
      }
      const res = await this.$axios.post('/teacher/experiment/addExperiment', params)
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '导入成功'
        })
        this.importDialog = false
      }
    }
  },
  created () {
    this.getExperimentList()
    this.getCourseList()
  }
}
</script>
