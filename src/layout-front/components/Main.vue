<template>
  <router-view :key="key"/>
</template>

<script>
  export default {
    name: 'Main',
    computed:{
      key(){
        return this.$route.path
      }
    }
  }
</script>

<style scoped>

</style>
