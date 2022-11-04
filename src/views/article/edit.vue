<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="form.title"/>
          </el-form-item>
          <el-form-item label="内容">
              <TinymceEditor v-model="form.content" style="height: 350px"></TinymceEditor>
          </el-form-item>
          <el-form-item label="分类">
            <el-cascader
              v-model="form.categoryIds"
              :options="categoryOptions"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getById, saveOrUpdate } from '@/api/article'
  import { tree } from '@/api/category'
  import router from '@/router'
  import TinymceEditor from '@/components/tinymce-editor/index'

  export default {

    components: {
      TinymceEditor
    },
    data() {
      return {
        form: {
          id: undefined,
          title: '',
          content: '',
          categoryIds: []
        },
        categoryOptions: [],

      }
    },

    created() {
      //获取文章内容
      const id = this.$route.params.id
      if (id !== undefined) {
        this.getArticleById(id)
      }
      //加载分类树
      this.getCategoryTree()
      // console.log(this.form)
    },

    methods: {
      getArticleById(id) {
        getById(id).then(res => {
          this.form = res.data
          // console.log('content,',this.form.content)

        })
      },

      save() {
        saveOrUpdate(this.form).then(res => {
          this.$message.success('保存成功')
          this.back()
        })
      },
      getCategoryTree() {
        tree().then(res => {
          this.categoryOptions = res.data
          // console.log('tree',this.categoryOptions)
        })
      },

      handleChange(value) {
        console.log(value)
      },

      back() {
        router.push('/admin/article/index')
      }

    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

