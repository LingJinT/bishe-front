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
            @click="handleEdit(scope.$index, scope.row)"
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
      tableData: [
        {
          name: 'SQL语言从入门到精通1',
          info: '简介1'
        },
        {
          name: 'SQL语言从入门到精通2',
          info: '简介1'
        },
        {
          name: 'SQL语言从入门到精通3',
          info: '简介1'
        },
        {
          name: 'SQL语言从入门到精通4',
          info: '简介1'
        }
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push('/Sexperiment')
      console.log(index, row)
    }
  }
}
</script>
