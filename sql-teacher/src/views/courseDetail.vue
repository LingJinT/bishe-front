<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editCourse = true">修改</el-button>
          <el-dialog
            title="修改课程信息"
            :visible.sync="editCourse"
            width="30%"
            :before-close="handleClose">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="courseInfo">
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editCourse = false">取 消</el-button>
              <el-button type="primary" @click="editCourse = false">确 定</el-button>
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
            width="30%"
            :before-close="handleClose">
            <el-form label-position="left" label-width="80px" :model="formLabelAlign">
              <el-form-item label="实验名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="截止时间">
                <el-input v-model="formLabelAlign.data"></el-input>
              </el-form-item>
              <el-form-item label="分值">
                <el-input v-model="formLabelAlign.grade"></el-input>
              </el-form-item>
              <el-form-item label="答案">
                <el-input v-model="formLabelAlign.answer"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="newExperiment = false">取 消</el-button>
              <el-button type="primary" @click="newExperiment = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            label="截止时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.data }}</span>
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
              {{ scope.row.grade }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handlePublish(scope.$index, scope.row)">发布</el-button>
              <el-dialog
                title="新建实验"
                :visible.sync="editExperiment"
                width="30%"
                :before-close="handleClose">
                <el-form label-position="left" label-width="80px" :model="tableData[index]">
                  <el-form-item label="实验名称">
                    <el-input v-model="tableData[index].name"></el-input>
                  </el-form-item>
                  <el-form-item label="截止时间">
                    <el-input v-model="tableData[index].data"></el-input>
                  </el-form-item>
                  <el-form-item label="分值">
                    <el-input v-model="tableData[index].grade"></el-input>
                  </el-form-item>
                  <el-form-item label="答案">
                    <el-input v-model="tableData[index].answer"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editExperiment = false">取 消</el-button>
                  <el-button type="primary" @click="editExperiment = false">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>已发布实验列表</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            label="截止时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.data }}</span>
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
              {{ scope.row.grade }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleLook(scope.$index, scope.row)">查看</el-button>
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
      courseInfo: '该课程是XXXXX围绕XXXX主要内容XXXX，帮助学生XXXX',
      editCourse: false,
      newExperiment: false,
      editExperiment: false,
      index: 0,
      formLabelAlign: {
        name: '',
        data: '',
        grade: '',
        answer: ''
      },
      tableData: [{
        data: '2016-05-02',
        name: '实验1',
        grade: 10,
        answer: '答案1'
      }, {
        data: '2016-05-04',
        name: '实验2',
        grade: 20,
        answer: '答案2'
      }, {
        data: '2016-05-01',
        name: '实验3',
        grade: 30,
        answer: '答案3'
      }, {
        data: '2016-05-03',
        name: '实验4',
        grade: 40,
        answer: '答案4'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      this.index = index
      console.log(this.index)
      this.editExperiment = true
      console.log(index, row)
    },
    handleDelete (index, row) {
      confirm('确认删除这个实验吗？') && this.tableData.splice(index, 1)
      console.log(index, row)
    },
    handlePublish (index, row) {
      confirm('确认发布这个实验吗？')
    },
    handleLook (index, row) {
      this.$router.push('/header/experimentDetail')
      console.log(index, row)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
