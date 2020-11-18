<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>所有班级</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="dialog = true"
          >新增班级</el-button
        >
        <el-dialog title="新增课程" :visible.sync="dialog" width="50%">
          <el-form label-position="left" label-width="80px" :model="newClasses">
            <el-form-item label="班级id">
              <el-input v-model="newClasses.id"></el-input>
            </el-form-item>
            <el-form-item label="导入学生" class="impotStudent">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入城市拼音"
                v-model="value"
                :data="data"
              >
              </el-transfer>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="班级id">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
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
            <el-dialog title="编辑课程" :visible.sync="Editdialog" width="50%">
              <el-form
                label-position="left"
                label-width="80px"
                :model="tableData[index]"
              >
                <el-form-item label="班级id">
                  <el-input v-model="tableData[index].id"></el-input>
                </el-form-item>
                <el-form-item label="导入学生">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="请输入城市拼音"
                    v-model="value"
                    :data="data"
                  >
                  </el-transfer>
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
    // 穿梭框的数据
    const generateData = _ => {
      const data = []
      const cities = ['凌锦涛', '李旭鹏', '朱鉏红', '戈文风', '王剑', '陈炯', '陈国能']
      const pinyin = [
        'lingjintao',
        'lixupeng',
        'zhuchuhong',
        'gewenfeng',
        'wangjian',
        'chenjiong',
        'chenguoneng'
      ]
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      // 穿梭框的数据
      data: generateData(),
      value: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      Editdialog: false,
      dialog: false,
      index: 0,
      newClasses: {
        id: '',
        student: []
      },
      tableData: [
        {
          id: '2017082101',
          student: []
        },
        {
          id: '2017082102',
          student: []
        },
        {
          id: '2017082103',
          student: []
        },
        {
          id: '2017082104',
          student: []
        }
      ]
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

<style scoped>
/* .el-input{
   width: 80%;
} */
</style>
