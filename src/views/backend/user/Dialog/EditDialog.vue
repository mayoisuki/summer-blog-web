<template>
<!--  修改用户对话框-->
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @open="initDialog"
    @close="closeDialog">
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="70px">
      <el-form-item label="用户名" prop="username"><el-input v-model="form.username" :disabled="isEdit"></el-input></el-form-item>
      <el-form-item label="昵称" prop="nickname"><el-input v-model="form.nickname"></el-input></el-form-item>
      <el-form-item label="密码" prop="password"><el-input v-model="form.password"></el-input></el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">关 闭</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import { getById, saveOrUpdate } from '@/api/user'
  import store from '@/store'

  export default {
    name: 'EditDialog',
    props:{
      // id:Number,
      editId:Number,
      dialogVisible: Boolean
    },
    watch:{
      //修改form的id
      editId(newVal){
        // this.form.id=this.editId
        // console.log('this.editId:'+this.editId)
        // console.log('newVal:'+newVal)
        this.form.id=newVal
      }
    },
    data() {
      return {
        title: undefined,
        isEdit:undefined,
        form:{
          id: this.editId,
          username: '',
          nickname: '',
          password: '',
          avatar:''
        },
        formRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 20, message: '用户名的长度在4-20个字符之间', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 20, message: '昵称的长度在2-20个字符之间', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 20, message: '密码的长度在4-20个字符之间', trigger: 'blur' }
          ],

        },
        action:'/api/file/uploads?X-Token='+store.getters.token,
      }
    },
    methods: {
      initDialog(){
        if (this.editId===undefined){
          // console.log('添加用户:')
          this.title='添加用户'
          this.isEdit=false
        }else {
          // console.log('编辑用户:'+this.id)
          this.title='编辑用户'
          this.isEdit=true
        //  根据id查询用户信息
          getById(this.editId).then(res=>{
            this.form=res.data
            // console.log(this.form.username)
          })
        }
        // this.editDialogVisible=true
      },
      closeDialog(){
        //  调用子组件的resetFields方法
        this.$refs.formRef.resetFields()
        //清除表单的头像，不然添加用户对话框会残留上一次用户的头像
        this.form.avatar=''
        console.log('form.avatar',this.form.avatar)
        //  调用父组件的中引用子组件@closeDialog对应的方法
        this.$emit('closeDialog')
      },
      submitForm() {
        this.$refs.formRef.validate(async valid => {
          if (!valid) {
            return
          }
          // console.log('submitForm')
          // console.log(this.form)
          // console.log('id:'+this.editId)
          saveOrUpdate(this.form).then(res=>{
            this.$message.success(res.msg)
            this.closeDialog()
          })
        });
      },
      handleAvatarSuccess(res, file) {
        this.form.avatar = URL.createObjectURL(file.raw);
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
    },

  }
</script>

<style scoped>
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
