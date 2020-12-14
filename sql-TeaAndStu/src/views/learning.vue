<template>
  <div class="container">
    <Learning ref="child"></Learning>
    <div class="learningBox" @click="dialog = true">
      <div class="img"></div>
    </div>
    <el-dialog
      title="上传资料"
      :visible.sync="dialog"
      width="50%">
      <el-form>
        <el-form-item label="资料名">
          <el-input type="text" v-model="uploadForm.name"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input type="text" v-model="uploadForm.linkUrl" placeholder="以http或者https开头"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <input type="file" ref="file" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Learning from '../components/learning.vue'
export default {
  components: {
    Learning
  },
  data () {
    return {
      dialog: false,
      uploadForm: {
        name: '',
        linkUrl: ''
      },
      learning: {}
    }
  },
  methods: {
    // 上传资料
    async handle () {
      const formdata = new FormData()
      formdata.append('file', this.$refs.file.files[0])
      formdata.append('linkUrl', this.uploadForm.linkUrl)
      formdata.append('name', this.uploadForm.name)
      const res = await this.$axios.post('/teacher/learning/uploadLearning', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data.code === 200) {
        this.dialog = false
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        this.$refs.child.getLearningList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .learningBox {
    margin-left: 10px;
    margin-right: 10px;
    .img {
      width: 120px;
      height: 200px;
      background: pink;
      // border: 1px solid black;
      position: relative;
      cursor: pointer;
    }
    .img::before {
      content: '';
      position: absolute;
      width: 80px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-top: 10px solid black;
    }
    .img::after {
      content: '';
      position: absolute;
      height: 80px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-left: 10px solid black;
    }
  }
}
</style>
