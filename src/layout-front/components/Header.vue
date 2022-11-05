<template>

  <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>


    <el-menu-item v-if="!isLogin" style="float: right">
      <router-link to="/register">注册</router-link>
    </el-menu-item>
    <el-menu-item v-if="!isLogin" style="float: right">
      <router-link to="/login">登录</router-link>
    </el-menu-item>

    <el-menu-item v-if="isLogin" style="float: right">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/admin/dashboard">
            <el-dropdown-item>
              后台管理
            </el-dropdown-item>
          </router-link>
          <router-link to="/admin/article/create">
            <el-dropdown-item>
              文章发布
            </el-dropdown-item>
          </router-link>
          <router-link to="/admin/profile/index">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>


  </el-menu>

</template>

<script>
  import { getToken } from '@/utils/auth'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        // isLogin: false,
        // avatar: '',
        name: ''
      }
    },
    computed:{
      isLogin(){
        return getToken()
      },
      ...mapGetters([
        'avatar'
      ])
    },
    created() {
      // console.log('this.isLogin',this.isLogin)
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }

    }
  }
</style>
