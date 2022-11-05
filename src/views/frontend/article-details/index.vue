<template>
  <div>
    <div>

      <el-breadcrumb separator="》">
        <el-breadcrumb-item v-for="(item,index) in form.categoryList" :key="item.id" >
          <router-link :to="'/category/'+item.id">{{item.name}}</router-link>

<!--          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>-->
<!--          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>-->
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <h1>{{form.title}}</h1>


    </div>
    <div v-html="form.content"></div>
  </div>
</template>

<script>
  import { getById } from '@/api/article'

  export default {

    data() {
      return {
        form: {
          id: undefined,
          title: '',
          content: '',
          categoryIds: [],
          categoryList: []
        }

      }
    },

    created() {
      //获取文章内容
      const id = this.$route.params.id
      // console.log('id', id)
      if (id !== undefined) {
        this.getArticleById(id)
      }
    },

    methods: {
      getArticleById(id) {
        getById(id).then(res => {
          this.form = res.data
          // console.log('this.form,',this.form)

        })
      }
    }
  }
</script>

<style scoped>

</style>
