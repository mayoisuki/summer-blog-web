<template>
  <div>
    <TinymceEditor v-model="value"></TinymceEditor>
  </div>
</template>

<script>
  import TinymceEditor from '@/components/tinymce-editor/index'

  export default {
    name: 'index',
    components:{
      TinymceEditor,
    },
    data(){
      return{
        value:'你好，世界',
      }
    },


  }
</script>

<style scoped>

</style>
