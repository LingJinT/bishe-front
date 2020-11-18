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
                @click="toExp(scope.$index, scope.row)">进入实验</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>已完成实验列表</span>
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
                @click="toLook(scope.$index, scope.row)">查看</el-button>
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
      index: 0,
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
    toExp () {
      this.$router.push('/experimentDetail')
    },
    toLook (index, row) {
      this.$router.push('/lookExp')
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
