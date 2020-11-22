<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>所有学生</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">新增学生</el-button>
        <el-dialog
          title="新增学生"
          :visible.sync="dialog"
          width="30%">
          <el-form label-position="left" label-width="80px" :model="newStudent">
            <el-form-item label="名称">
              <el-input v-model="newStudent.name"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="newStudent.id"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="newStudent.classes"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
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
          label="学号">
          <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="班级">
          <template slot-scope="scope">
              <p>{{ scope.row.classes }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
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
      newStudent: {
        name: '',
        id: '',
        classes: ''
      },
      tableData: [{
        name: '学生0',
        id: '2017082101',
        password: '',
        classes: '20170821'
      }, {
        name: '学生1',
        id: '2017082102',
        password: '',
        classes: '20170822'
      }, {
        name: '学生2',
        id: '2017082103',
        password: '',
        classes: '20170823'
      }, {
        name: '学生3',
        id: '2017082104',
        password: '',
        classes: '20170824'
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
    },
    confirm () {
      this.tableData.push(this.newStudent)
      this.dialog = false
    }
  }
}
</script>
