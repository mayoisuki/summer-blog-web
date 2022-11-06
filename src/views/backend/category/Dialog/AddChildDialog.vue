<template>
<!--  修改用户对话框-->
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @open="initDialog"
    :before-close="closeDialog"
  >
<!--    @close="closeDialog"-->
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="分类名称" prop="name"><el-input v-model="parentForm.name" disabled></el-input></el-form-item>
      <el-form-item label="分类名称" prop="name"><el-input v-model="form.name" ></el-input></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">关 闭</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {  saveOrUpdate } from '@/api/category'

  export default {
    name: 'AddFirstDialog',
    props:{
      dialogVisible: Boolean,
      parentForm:{
        id:Number,
        name:String
      }
    },
    data() {
      return {
        title: undefined,
        isEdit:undefined,
        form:{
          name: undefined,
          pid:undefined
        },
        formRules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 1, max: 100, message: '分类名称的长度在1-100个字符之间', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      initDialog(){
      },
      closeDialog(){
        //  调用子组件的resetFields方法
        this.$refs.formRef.resetFields()
        //  调用父组件的中引用子组件@closeDialog对应的方法
        this.$emit('closeDialog')
      },
      submitForm() {
        this.$refs.formRef.validate(async valid => {
          if (!valid) {
            return
          }
          this.form.pid=this.parentForm.id
          console.log('addChild',this.form)
          saveOrUpdate(this.form).then(res=>{
            this.$message.success('添加成功')
            this.closeDialog()
            // this.$emit('getList')
          })
        });
      },
    },

  }
</script>

<style scoped>

</style>
