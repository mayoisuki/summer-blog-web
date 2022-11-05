<template>
  <section id="tinymce-editor"></section>
</template>

<script>
  import './tinymce.min.js'
  import './themes/silver/theme.min.js'
  import './langs/zh_CN.js'
  import './plugins/preview/plugin.min.js'
  import './plugins/link/plugin.min.js'
  import './plugins/image/plugin.min.js'
  import './plugins/table/plugin.min.js'
  import './plugins/imagetools/plugin.min.js'
  import store from '@/store'

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    data(){
      return{
        //定义flag，当处于在编辑器内编辑内容时，不调用tinyMCE.activeEditor.setContent(val)方法
        flag:true
      }
    },
    watch:{
      value(val){
        if(this.flag){
          //设置tinyMCE的值
          tinyMCE.activeEditor.setContent(val);
        }
        this.flag=true;
      }
    },
    mounted() {
      tinymce.init({
        selector: '#tinymce-editor',
        //设置语言为简体中文
        language: 'zh_CN',
        //去除水印
        branding: false,
        //隐藏编辑器底部的状态栏
        statusbar: false,
        //工具栏
        toolbar: 'undo redo | formatselect | bold italic strikethrough forecolor backcolor fontsizeselect | link image | alignleft aligncenter alignright alignjustify | outdent indent | preview',
        //  插件
        plugins: 'preview link image table imagetools',
        //图片上传地址
        images_upload_url: '/api/file/tinymce/uploads?X-Token='+store.getters.token,
        //设置监听事件
        setup: (editor) =>{
          editor.on('input change undo redo execCommand', (e)=> {
            //设置flag为false,不调用tinyMCE.activeEditor.setContent(val);
            this.flag=false;
            this.$emit('input', editor.getContent());
          })
        }

      })


    },

    beforeDestroy() {
      //销毁tinymce组件，不然会用同一个组件，只在第一次加载
      tinymce.remove("#tinymce-editor")
    },
  }
</script>

<style lang="less" scoped>
  @import url('./skins/ui/oxide/skin.min.css');
</style>
