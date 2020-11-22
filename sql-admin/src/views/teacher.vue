<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
          <span>所有教师</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">新建教师</el-button>
          <el-dialog
          title="新建教师"
          :visible.sync="dialog"
          width="30%">
          <el-form label-position="left" label-width="80px" :model="newTeacher">
            <el-form-item label="姓名">
              <el-input v-model="newTeacher.name"></el-input>
            </el-form-item>
            <el-form-item label="工号">
              <el-input v-model="newTeacher.id"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="dialog = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="工号">
          <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名">
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
          label="手机号">
          <template slot-scope="scope">
              <p>{{ scope.row.phoneNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
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
      dialog: false,
      newTeacher: {
        name: '',
        id: ''
      },
      tableData: [{
        name: '老师0',
        email: '0@qq..com',
        id: 'user0',
        phoneNumber: '123456789'
      }, {
        name: '老师1',
        email: '1@qq..com',
        id: 'user1',
        phoneNumber: '123456789'
      }, {
        name: '老师2',
        email: '2@qq..com',
        id: 'user2',
        phoneNumber: '123456789'
      }, {
        name: '老师3',
        email: '3@qq..com',
        id: 'user3',
        phoneNumber: '123456789'
      }]
    }
  },
  methods: {
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
