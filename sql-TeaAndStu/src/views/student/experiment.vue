<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程详情</span>
        </div>
        <div class="text item">
          {{ courseInfo }}
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>未完成实验列表</span>
        </div>
        <el-table
          :data="notFinished"
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="toExp(scope.row._id)">进入实验</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>已完成实验列表</span>
        </div>
        <el-table
          :data="finished"
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="toLook(scope.row._id)">查看</el-button>
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
      index: 0,
      tableData: [],
      finished: [],
      notFinished: [],
      courseId: 0,
      studentId: 0
    }
  },
  methods: {
    toExp (id) {
      localStorage.setItem('gradeId', id)
      this.$router.push('/SexperimentDetail')
    },
    toLook (id) {
      localStorage.setItem('gradeId', id)
      this.$router.push('/SlookExp')
    },
    // 获取课程信息
    async getCourseInfo () {
      const res = await this.$axios.get(`teacher/course/getCourseInfo?id=${this.courseId}`)
      this.courseInfo = res.data.data.info
    },
    // 获取实验信息
    async getExperiment () {
      const res = await this.$axios.get(`student/experiment/getExperiment?id=${this.studentId}`)
      this.tableData = res.data.data.map((item) => {
        return {
          _id: item._id,
          isFinished: item.isFinished,
          deadline: item.experimentInfo[0].deadline,
          name: item.experimentInfo[0].name,
          scope: item.experimentInfo[0].scope
        }
      })
      this.tableData.map((item) => {
        if (item.isFinished) {
          this.finished.push(item)
        } else {
          this.notFinished.push(item)
        }
      })
    }
  },
  created () {
    this.courseId = localStorage.getItem('courseId')
    this.studentId = localStorage.getItem('studentId')
    this.getCourseInfo()
    this.getExperiment()
  }
}
</script>
