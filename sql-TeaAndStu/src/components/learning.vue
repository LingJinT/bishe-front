<template>
  <div class="container">
    <div class="learningBox" v-for="(item,index) in form" :key="index">
      <div class="img">
        <a :href="item.linkUrl" target="_blank">
          <img :src="item.imgUrl" alt="">
        </a>
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    // 获取资料
    async getLearningList () {
      const res = await this.$axios('/teacher/learning/getLearningList')
      if (res.data.code === 200) {
        this.form = res.data.data
      }
    }
  },
  created () {
    this.getLearningList()
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.learningBox {
  margin-left: 20px;
  margin-right: 20px;
}
.img {
  width: 120px;
  height: 200px;
  img {
    width: 120px;
    height: 200px;
  }
}
.name {
  width: 120px;
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
