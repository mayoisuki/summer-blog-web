<template>
  <div>
    <!--    卡片视图区域-->
    <el-card >
      <!--      搜索与添加区域-->
<!--      <el-row :gutter="20">-->
<!--        <el-form :inline="true" class="demo-form-inline">-->
<!--          <el-form-item>-->
<!--            <el-input v-model="filters.keywords" clearable placeholder="文章标题或内容 关键词" @clear="getList"-->
<!--                      @keyup.enter.native="getList"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="getList">查询</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-row>-->

      <!--      文章列表-->
      <el-table :data="dataList" border stripe>
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <router-link :to="'/details/'+scope.row.id">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="200"/>

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

  import { pageList } from '@/api/article'

  export default {
    name: 'index',
    data() {
      return {
        filters: {
          keywords: '',
          pageNum: 1,
          pageSize: 6,
          categoryId:-1
        },
        dataList: [],
        total: 0,
      }
    },
    created() {
      this.getList()
    },
    methods:{

      //获取分页列表
      getList(){
        const categoryId = this.$route.params.categoryId
        console.log(categoryId)
        if (categoryId!==undefined){
          this.filters.categoryId=categoryId
        }
        pageList(this.filters).then(res=>{
          this.dataList=res.data.records
          this.total=res.data.total
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

    }
  }
</script>

<style scoped>

</style>
