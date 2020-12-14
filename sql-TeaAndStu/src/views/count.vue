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
        :prop="item"
        :label="item"
        v-for="(item,index) in tableTitle" :key="index">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableTitle: []
    }
  },
  methods: {
    async getCount () {
      const id = localStorage.getItem('courseId')
      const res = await this.$axios(`/teacher/count/getCount?id=${id}`)
      res.data.data.map((item) => {
        if (item.experimentInfo.length !== 0) {
          const obj = {
            name: item.name
          }
          this.tableTitle = []
          item.experimentInfo.map((todo, index) => {
            obj[todo.experimentName] = todo.grade
            this.tableTitle.push(todo.experimentName)
          })
          this.tableData.push(obj)
        }
      })
      console.log(this.tableData)
      console.log(this.tableTitle)
    }
  },
  created () {
    this.getCount()
  }
}
</script>
