<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>课程列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="课程名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程简介">
        <template slot-scope="scope">
          <p>{{ scope.row.info }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row._id)"
            >进入课程</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit (id) {
      localStorage.setItem('courseId', id)
      this.$router.push('/Sexperiment')
    },
    async getCourseList () {
      const classes = localStorage.getItem('classes')
      const res = await this.$axios.get(`/student/course/getCourseList?classes=${classes}`)
      if (res.data.code === 200) {
        this.tableData = res.data.data
      }
    }
  },
  created () {
    this.getCourseList()
  }
}
</script>
