<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
          <span>所有教师</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="名称">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱">
          <template slot-scope="scope">
              <p>{{ scope.row.email }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名">
          <template slot-scope="scope">
              <p>{{ scope.row.user }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlePass(scope.$index, scope.row)" v-if="!scope.row.pass">审核通过</el-button>
            <el-button
            size="mini"
            type="success"
            v-else>已审核</el-button>
            <el-button
            size="mini"
            type="warning"
            @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      tableData: [{
        name: '老师0',
        email: '0@qq..com',
        user: 'user0',
        pass: false
      }, {
        name: '老师1',
        email: '1@qq..com',
        user: 'user1',
        pass: false
      }, {
        name: '老师2',
        email: '2@qq..com',
        user: 'user2',
        pass: true
      }, {
        name: '老师3',
        email: '3@qq..com',
        user: 'user3',
        pass: true
      }]
    }
  },
  methods: {
    handlePass (index) {
      this.tableData[index].pass = true
      console.log(`${index}审核通过`)
    },
    handleReset (index) {
      confirm('确认重置密码吗？')
      console.log(`${index}重置密码`)
    },
    handleDelete (index) {
      confirm('确认删除吗？')
      console.log(`${index}shanchu`)
    }
  }
}
</script>
