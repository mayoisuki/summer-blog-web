<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" disabled/>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"/>
          </el-form-item>
<!--          <el-form-item label="头像URL">-->
<!--            <el-input v-model="form.avatar"/>-->
<!--          </el-form-item>-->
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getById, saveOrUpdate } from '@/api/user'
  import { getCurrentUser } from '@/api/login'
  import store from '@/store'
  import { save } from '@/api/profile'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
          nickname: '',
          avatar: ''
        },
        imageUrl: '',
        action:'/api/file/uploads?X-Token='+store.getters.token,
      }
    },
    created() {
      this.getCurrentUser()
    },
    methods: {
      getCurrentUser(){
        getCurrentUser(store.getters.token).then(response => {
          // console.log(response)
          console.log('this.action',this.action)
          this.form=response.data
          this.imageUrl=response.data.avatar
        })
        // alert(1)
      },
      save() {
        save(this.form).then(res=>{
          this.$message.success('保存成功')
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        //修改表单头像的值
        this.form.avatar=res.data
        //修改store里面avatar的值，让导航栏的头像也发生改变
        this.$store.commit('user/SET_AVATAR',res.data)

        // console.log('res',res)
        // console.log('this.form.avatar',this.form.avatar)
        // console.log('store.getters.avatar',store.getters.avatar)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

