<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>课程列表</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程">
        <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">进入课程</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: 'SQL语言从入门到精通1'
      }, {
        date: '2016-05-04',
        name: 'SQL语言从入门到精通2'
      }, {
        date: '2016-05-01',
        name: 'SQL语言从入门到精通3'
      }, {
        date: '2016-05-03',
        name: 'SQL语言从入门到精通4'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push('/header/courseDetail')
      console.log(index, row)
    },
    handleDelete (index, row) {
      confirm('确认删除这门课程吗？') && this.tableData.splice(index, 1)
      console.log(index, row)
    }
  }
}
</script>
