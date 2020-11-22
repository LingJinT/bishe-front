<template>
  <div>
    <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>共享题库</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            label="实验名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column
            label="分值">
            <template slot-scope="scope">
              {{ scope.row.grade }}
            </template>
          </el-table-column>
          <el-table-column
            label="数据库类型">
            <template slot-scope="scope">
              {{ scope.row.database }}
            </template>
          </el-table-column>
           <el-table-column
            label="关键词">
            <template slot-scope="scope">
              {{ scope.row.keywords }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleLook(scope.$index, scope.row)"
                style="margin-right: 20px">查看</el-button>
              <el-dialog
                :visible.sync="dialog"
                width="30%">
                <el-form label-position="left" label-width="80px" :model="tableData[index]" disabled>
                  <el-form-item label="实验内容">
                    <el-input v-model="tableData[index].content" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="答案">
                    <el-input v-model="tableData[index].answer" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialog = false">取 消</el-button>
                  <el-button type="primary" @click="dialog = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button
                size="mini"
                type="warning"
                @click="handleShare(scope.$index, scope.row)">导入</el-button>
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
      index: 0,
      dialog: false,
      tableData: [{
        data: '2016-05-02',
        content: '内容1',
        name: '实验1',
        grade: 10,
        answer: '答案1',
        keywords: '关键词1',
        database: '数据库1'
      }, {
        data: '2016-05-04',
        content: '内容2',
        name: '实验2',
        grade: 20,
        answer: '答案2',
        keywords: '关键词1',
        database: '数据库1'
      }, {
        data: '2016-05-01',
        content: '内容3',
        name: '实验3',
        grade: 30,
        answer: '答案3',
        keywords: '关键词1',
        database: '数据库1'
      }, {
        data: '2016-05-03',
        content: '内容3',
        name: '实验4',
        grade: 40,
        answer: '答案4',
        keywords: '关键词1',
        database: '数据库1'
      }]
    }
  },
  methods: {
    handleLook (index) {
      this.index = index
      this.dialog = true
    },
    handleShare () {
      confirm('确定要导入这个实验吗')
    }
  }
}
</script>
