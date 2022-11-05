<template>
  <div id="front-container">
    <Header id="layout-header"/>
    <el-row id="layout-middle">
      <el-col :span="18">
        <Main id="layout-main"/>
      </el-col>
      <el-col :span="6">
        <Sidebar id="layout-sidebar"/>
      </el-col>
    </el-row>
    <Footer id="layout-footer"/>
  </div>
</template>

<script>
  import Header from '@/layout-front/components/Header'
  import Main from '@/layout-front/components/Main'
  import Sidebar from '@/layout-front/components/Sidebar'
  import Footer from '@/layout-front/components/Footer'

  export default {
    name: 'LayoutFront',
    components:{
      Header,
      Main,
      Sidebar,
      Footer
    }
  }
</script>

<style scoped>
  #front-container{
    width: 1200px;
    margin: 0 auto;
  }

  #layout-header{
    margin: 0 auto;
  }

  #layout-middle{
    min-height: 700px;
    padding: 10px;
  }

  #layout-footer{
    height: 50px;
    text-align: center;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
</style>
