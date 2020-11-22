<template>
  <div class="container">
    <Learning></Learning>
    <div class="learningBox" @click="dialog = true">
      <div class="img"></div>
    </div>
    <el-dialog
      title="上传资料"
      :visible.sync="dialog"
      width="50%">
      <el-form>
        <el-form-item label="资料名">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input type="text" v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
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
      form: {
        name: '',
        keywords: ''
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
