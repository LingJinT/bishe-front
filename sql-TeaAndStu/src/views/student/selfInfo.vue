<template>
  <SelfInfo></SelfInfo>
</template>

<script>
import SelfInfo from '../../components/selfInfo.vue'
export default {
  components: {
    SelfInfo
  },
  data () {
    return {
      form: {
        email: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
