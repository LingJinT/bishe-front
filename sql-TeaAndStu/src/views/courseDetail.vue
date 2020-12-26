<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editCourse = true">修改</el-button>
          <el-dialog
            title="修改课程信息"
            :visible.sync="editCourse"
            width="30%">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="courseInfo">
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelEdit">取 消</el-button>
              <el-button type="primary" @click="editCourseInfo">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="text item">
          {{ courseInfo }}
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>未发布实验列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="newExperiment = true">新建实验</el-button>
          <el-dialog
            title="新建实验"
            :visible.sync="newExperiment"
            width="30%">
            <el-form label-position="left" label-width="80px" :model="formLabelAlign">
              <el-form-item label="实验名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="实验内容">
                <el-input v-model="formLabelAlign.content" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="数据库">
                <el-select v-model="formLabelAlign.type" placeholder="请选择数据库类型">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分值">
                <el-input v-model="formLabelAlign.scope"></el-input>
              </el-form-item>
              <el-form-item label="答案">
                <el-input v-model="formLabelAlign.answer"></el-input>
              </el-form-item>
              <el-form-item label="关键词">
                <el-input v-model="formLabelAlign.keyWords"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="newExperiment = false">取 消</el-button>
              <el-button type="primary" @click="addExperiment">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <el-table
          :data="tableData.noPublic"
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
          <el-table-column label="操作" min-width=150px>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="edit(scope.row)"
                style="margin-right: 10px">编辑</el-button>
              <el-dialog
                title="编辑实验"
                :visible.sync="editExperiment"
                width="30%">
                <el-form label-position="left" label-width="80px" :model="edExperiment">
                  <el-form-item label="实验名称">
                    <el-input v-model="edExperiment.name"></el-input>
                  </el-form-item>
                  <el-form-item label="实验内容">
                    <el-input v-model="edExperiment.content" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="数据库">
                    <el-select v-model="edExperiment.type" placeholder="请选择数据库类型">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="分值">
                    <el-input v-model="edExperiment.scope"></el-input>
                  </el-form-item>
                  <el-form-item label="答案">
                    <el-input v-model="edExperiment.answer"></el-input>
                  </el-form-item>
                  <el-form-item label="关键词">
                    <el-input v-model="edExperiment.keyWords"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="cancel">取 消</el-button>
                  <el-button type="primary" @click="updateExperiment(tableData.noPublic[index]._id)">确 定</el-button>
                </span>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="deleteExperiment(scope.row._id)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="dialogVisible = true"
                style="margin-right: 10px">发布</el-button>
              <el-dialog
                title="发布实验"
                :visible.sync="dialogVisible"
                width="30%">
                <span class="demonstration" style="margin-right: 20px">设置截止日期</span>
                  <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="选择截止日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="publicExperiment(scope.row._id, scope.row.courseId, scope.row.name, scope.row.classes)">确 定</el-button>
                </span>
              </el-dialog>
              <el-button
                size="mini"
                type="warning"
                @click="shareExperiment(scope.row._id)" v-if="!scope.row.isShare">共享</el-button>
              <el-button
                size="mini"
                type="warning"
                v-else @click="noShare(scope.row._id)">取消共享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>已发布实验列表</span>
        </div>
        <el-table
          :data="tableData.public"
          style="width: 100%;">
          <el-table-column
            label="截止时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.deadline }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="实验名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
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
          <el-table-column label="操作" min-width=120px>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="toExperimentDetail(scope.row._id)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteExperiment(scope.row._id)">删除</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="shareExperiment(scope.row._id)" v-if="!scope.row.isShare">共享</el-button>
              <el-button
                size="mini"
                type="warning"
                v-else @click="noShare(scope.row._id)">取消共享</el-button>
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
      courseInfo: '',
      editCourse: false,
      newExperiment: false,
      editExperiment: false,
      dialogVisible: false,
      formLabelAlign: {
        name: '',
        content: '',
        scope: '',
        answer: '',
        keyWords: ''
      },
      tableData: {
        noPublic: [],
        public: []
      },
      edExperiment: {},
      id: '',
      date: '',
      options: [
        {
          value: 'mysql',
          label: 'mysql'
        },
        {
          value: 'mongo',
          label: 'mongo'
        }
      ]
    }
  },
  methods: {
    toExperimentDetail (id) {
      localStorage.setItem('experimentId', id)
      this.$router.push('/header/experimentDetail')
    },
    // 获取课程信息
    async getCourseInfo () {
      const res = await this.$axios.get(`teacher/course/getCourseInfo?id=${this.id}`)
      this.courseInfo = res.data.data.info
    },
    // 修改课程信息
    async editCourseInfo () {
      const res = await this.$axios.put('teacher/course/updateCourse', {
        id: this.id,
        info: this.courseInfo
      })
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.editCourse = false
      }
    },
    // 取消修改
    cancelEdit () {
      this.editCourse = false
      this.getCourseInfo()
    },
    // 获取实验信息
    async getExperimentList () {
      const res = await this.$axios.get(`/teacher/experiment/getExperimentList?courseId=${this.id}`)
      this.tableData.noPublic = []
      this.tableData.public = []
      if (res.data.data.length === 0) {
        console.log('没有实验')
      } else {
        res.data.data.map((item) => {
          if (item.isPublic === false) {
            this.tableData.noPublic.push(item)
          } else {
            this.tableData.public.push(item)
          }
        })
      }
    },
    // 新建实验
    async addExperiment () {
      this.formLabelAlign.courseId = this.id
      this.formLabelAlign.classes = localStorage.getItem('classes')
      const res = await this.$axios.post('/teacher/experiment/addExperiment', this.formLabelAlign)
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '新建成功'
        })
        this.newExperiment = false
        this.getExperimentList()
      }
    },
    edit (info) {
      this.edExperiment = info
      console.log(this.edExperiment)
      this.editExperiment = true
    },
    // 编辑实验
    async updateExperiment () {
      const res = await this.$axios.put('/teacher/experiment/updateExperiment', this.edExperiment)
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.editExperiment = false
      }
    },
    // 取消编辑
    cancel () {
      this.editExperiment = false
      this.getExperimentList()
    },
    // 删除实验
    deleteExperiment (id) {
      this.$confirm('此操作将永久删除该实验, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`/teacher/experiment/deleteExperiment?id=${id}`)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getExperimentList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 发布实验
    async publicExperiment (id, courseId, name, classes) {
      const res = await this.$axios.put('/teacher/experiment/confirmDeadline', {
        id: id,
        courseId,
        name,
        classes,
        deadline: this.date
      })
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
        this.dialogVisible = false
        this.getExperimentList()
      }
    },
    // 共享实验
    shareExperiment (id) {
      this.$confirm('此操作将共享该实验, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.put('/teacher/experiment/shareExperiment', {
          id
        })
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '共享成功'
          })
          this.getExperimentList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消共享'
        })
      })
    },
    // 取消共享
    noShare (id) {
      this.$confirm('此操作将取消共享该实验, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.put('/teacher/experiment/notShareExperiment', {
          id
        })
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '取消共享成功'
          })
          this.getExperimentList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  created () {
    this.id = localStorage.getItem('courseId')
    this.getCourseInfo()
    this.getExperimentList()
  }
}
</script>
