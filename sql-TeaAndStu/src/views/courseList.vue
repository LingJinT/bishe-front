<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>课程列表</span>
       <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">新建课程</el-button>
       <el-dialog
        title="新建实验"
        :visible.sync="dialog"
        width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="课程名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="选择班级">
            <el-select v-model="form.classes" placeholder="请选择授课班级">
              <el-option label="班级一" value="shanghai"></el-option>
              <el-option label="班级二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择学生">
            <el-select v-model="form.classes" placeholder="请选择重修学生" filterable>
              <el-option label="学生一" value="shanghai"></el-option>
              <el-option label="学生二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程信息">
            <el-input type="textarea" v-model="form.classesInfo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialog = false">确认</el-button>
            <el-button @click="dialog = false">取消</el-button>
          </el-form-item>
        </el-form>
       </el-dialog>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="课程名称">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="授课班级">
        <template slot-scope="scope">
            <p>{{ scope.row.classes }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">进入课程</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toCount(scope.$index, scope.row)">统计</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      tableData: [{
        classes: '20170821',
        name: 'SQL语言从入门到精通1'
      }, {
        classes: '20170821',
        name: 'SQL语言从入门到精通2'
      }, {
        classes: '20170821',
        name: 'SQL语言从入门到精通3'
      }, {
        classes: '20170821',
        name: 'SQL语言从入门到精通4'
      }],
      form: {
        name: '',
        classes: '',
        classesInfo: ''
      }
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
    },
    toCount (index, row) {
      this.$router.push('/count')
    }
  }
}
</script>
