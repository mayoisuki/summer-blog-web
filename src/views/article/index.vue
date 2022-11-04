<template>
  <div>
    <!--    卡片视图区域-->
    <el-card :style="{margin: '20px'}">
      <!--      搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="primary" @click="gotoCreate">添加文章</el-button>
        </el-col>
        <el-col :span="12" :style="{textAlign: 'right'}">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="filters.keywords" clearable placeholder="文章标题或内容 关键词" @clear="getList"
                        @keyup.enter.native="getList"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!--      文章列表-->
      <el-table :data="dataList" border stripe>
        <el-table-column type="index" label="#"/>
        <el-table-column label="用户" prop="userNickName" width="120"/>
        <el-table-column label="文章标题" prop="title"/>
        <el-table-column label="创建时间" prop="createTime" width="200"/>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!--            修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="gotoEdit(scope.row.id)"></el-button>
            <!--            删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeArticleById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--      分页区域-->
      <el-pagination
        :current-page="filters.pageNum"
        :page-sizes="[1, 2,6, 10,20,50,100]"
        :page-size="filters.pageSize"
        :total="total"
        :style="{marginTop:'20px'}"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>

    </el-card>


  </div>
</template>

<script>

  import { pageList, removeById } from '@/api/article'
  import router from '@/router'


  export default {

    data() {
      return {
        filters: {
          keywords: '',
          pageNum: 1,
          pageSize: 6
        },
        dataList: [],
        total: 0,
        addDialogVisible: false,
        editDialogVisible: false,
        // editId: undefined
      }
    },
    created() {
      this.getList()
    },
    methods:{

      //获取分页列表
      getList(){
        pageList(this.filters).then(res=>{
          this.dataList=res.data.records
          this.total=res.data.total
        })
      },

    //  根据id删除对应文章信息
      removeArticleById(id){
      //  弹框提示文章是否删除
        this.$confirm('此操作将永久删除该文章，是否继续？','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'})
          .then(()=>{
            removeById(id).then(res=>{
              this.$message.success(res.msg)
              this.getList()
            })
          }).catch(()=>{
            return this.$message.info('已取消删除')
        })
      },

    //  监听pageSize改变的事件
      handleSizeChange(newSize){
        this.filters.pageSize=newSize
        this.getList()
      },

      //  监听pageNum改变的事件
      handleCurrentChange(newPage){
        this.filters.pageNum=newPage
        this.getList()
      },
      //  跳转到编辑页面
      gotoCreate(){
        router.push('/admin/article/create')
      },

    //  跳转到编辑页面
      gotoEdit(id){
        router.push('/admin/article/edit/'+id)
      },

      //  关闭添加或编辑弹窗
      closeEditDialog(){
        this.editDialogVisible=false
        this.getList()
      }
    }
  }

</script>

<style scoped>

</style>
