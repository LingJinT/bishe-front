<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>所有课程</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="授课班级">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="课程信息">
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
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-dialog title="编辑课程" :visible.sync="Editdialog" width="30%">
              <el-form
                label-position="left"
                label-width="80px"
                :model="tableData[index]"
              >
                <el-form-item label="课程名称">
                  <el-input v-model="tableData[index].name"></el-input>
                </el-form-item>
                <el-form-item label="授课班级">
                  <el-input v-model="tableData[index].id"></el-input>
                </el-form-item>
                <el-form-item label="授课老师">
                  <el-input
                    v-model="tableData[index].teacher"
                  ></el-input>
                </el-form-item>
                <el-form-item label="课程信息">
                  <el-input v-model="tableData[index].info"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="Editdialog = false">取 消</el-button>
                <el-button type="primary" @click="Editdialog = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
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
      Editdialog: false,
      dialog: false,
      index: 0,
      newCourse: {
        name: '',
        id: '',
        teacher: '',
        info: ''
      },
      tableData: [{
        name: '课程0',
        id: '2017082101',
        teacher: '老师0',
        info: 'info0'
      }, {
        name: '课程1',
        id: '2017082102',
        teacher: '老师1',
        info: 'info1'
      }, {
        name: '课程2',
        id: '2017082103',
        teacher: '老师2',
        info: 'info2'
      }, {
        name: '课程3',
        id: '2017082104',
        teacher: '老师3',
        info: 'info3'
      }]
    }
  },
  methods: {
    handleEdit (index) {
      this.index = index
      this.Editdialog = true
      console.log(`${index}编辑`)
    },
    handleDelete (index) {
      confirm('确认删除吗？')
      console.log(`${index}删除`)
    },
    confirm () {
      this.tableData.push(this.newStudent)
      this.dialog = false
    }
  }
}
</script>
