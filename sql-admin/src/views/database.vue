<template>
  <div class="container">
    <el-card class="box-card" v-for="(item,index) in collections" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.name }}</span>
      </div>
      <div class="text item" v-for="(key,index) in item.content" :key="index">
        {{ key }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collections: [
        {
          name: 'userinfo',
          content: ['id', 'name', 'pwd', 'email', 'phone', 'user_type']
        },
        {
          name: 'admininfo',
          content: ['id', 'name', 'pwd', 'email', 'phone']
        },
        {
          name: 'teachersinfo',
          content: ['id', 'name', 'pwd', 'email', 'phone', 'course']
        },
        {
          name: 'studentsinfo',
          content: ['id', 'name', 'pwd', 'email', 'phone', 'class_id']
        },
        {
          name: 'classinfo',
          content: ['id', 'num']
        },
        {
          name: 'teachclass',
          content: ['class_id', 'number']
        },
        {
          name: 'courseinfo',
          content: ['id', 'name', 'info', 'teach_class']
        },
        {
          name: 'taskinfo',
          content: ['id', 'name', 'keyword', 'answer', 'task_type', 'task_share', 'issue_type', 'score', 'deadline', 'completion', 'correct', 'course_id']
        },
        {
          name: 'stutaskinfo',
          content: ['task', 'stu', 'score']
        },
        {
          name: 'studydata',
          content: ['id', 'name', 'info', 'keyword', 'link1', 'link2']
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.box-card {
  width: 200px;
  margin: 10px 10px;
}
</style>
