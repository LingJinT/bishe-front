<template>
  <el-card>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="exp1"
        label="实验一">
      </el-table-column>
      <el-table-column
        prop="exp2"
        label="实验二">
      </el-table-column>
      <el-table-column
        prop="exp3"
        label="实验三">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: '王小虎1',
        exp1: 99,
        exp2: 100,
        exp3: 88
      }, {
        name: '王小虎2',
        exp1: 99,
        exp2: 100,
        exp3: 88
      }, {
        name: '王小虎3',
        exp1: 99,
        exp2: 100,
        exp3: 88
      }, {
        name: '王小虎4',
        exp1: 99,
        exp2: 100,
        exp3: 88
      }]
    }
  }
}
</script>
