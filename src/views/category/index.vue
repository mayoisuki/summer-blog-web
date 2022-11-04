<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">

        <div style="margin-bottom: 20px">
          <el-button type="primary" size="small" @click="openAddFirstDialog">添加一级分类</el-button>
          <el-button size="small" @click="openAddChildDialog">添加子节点</el-button>
          <el-button type="danger" size="small" @click="deleteCategory">删除</el-button>
        </div>


        <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>

        <el-tree
          ref="tree2"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          class="filter-tree"
          default-expand-all
        />
      </el-col>

      <el-col :span="16">

        <el-form ref="form" :model="form" label-width="120px">

          <el-form-item label="分类名称">
            <el-input v-model="form.name"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">{{title}}</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>


    <AddFirstDialog :dialog-visible="addFirstDialogVisible" @closeDialog="closeAddFirstDialog"/>
    <AddChildDialog :dialog-visible="addChildDialogVisible" :parent-form="form" @closeDialog="closeAddChildDialog"/>



  </div>
</template>

<script>
  import { saveOrUpdate, tree,removeById } from '@/api/category'
  import AddFirstDialog from '@/views/category/Dialog/AddFirstDialog'
  import AddChildDialog from '@/views/category/Dialog/AddChildDialog'

  export default {
    components:{
      AddFirstDialog,
      AddChildDialog
    },

    data() {
      return {
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        title:'添加分类',
        form:{
          id:undefined,
          name:undefined,
          pid:0
        },
        addFirstDialogVisible:false,
        addChildDialogVisible:false,
        // deleteId:undefined,
        // deleteName:undefined
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    created() {
      this.getList()
    },

    methods: {
      getList(){
        tree().then(response => {
          // console.log("tree",response.data)
          this.treeData=response.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      saveOrUpdate(){
        // console.log(this.form)
        //如果pid是undefined，则默认等于0
        if (this.form.pid===undefined){
          this.form.pid=0
        }
        // console.log(this.form)
        saveOrUpdate(this.form).then(res=>{
          this.$message.success('操作成功')
          // this.form={}
          this.getList()
        })
      },
      //关闭添加一级分类的弹窗
      closeAddFirstDialog(){
        this.addFirstDialogVisible=false
        this.getList()
      },
      //打开添加一级分类的弹窗
      openAddFirstDialog(){
        this.addFirstDialogVisible=true
      },
      deleteCategory(){
        if (this.form.id===undefined){
          this.$message.error('请选择一个分类删除')
          return
        }

        //  弹框提示用户是否删除
        this.$confirm('您确定是否要删除'+this.form.name+'分类','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'})
          .then(()=>{
            removeById(this.form.id).then(res=>{
              this.$message.success('删除成功')
              this.form={}
              this.getList()
            })
          }).catch(()=>{
          return this.$message.info('已取消删除')
        })
      },
      handleNodeClick(data){
        this.form={
          id: data.id,
          name: data.label,
          pid: data.pid
        }
        this.title='保存分类'
        // console.log(this.form)
        // this.deleteId=data.id
        // this.deleteName=data.label
        // console.log(this.deleteId,',',this.deleteName)
      },
      cancel(){
        this.title='添加分类'
        this.form={}
        // console.log(this.form)

      },
      closeAddChildDialog(){
        this.addChildDialogVisible=false
        this.getList()
      },
      openAddChildDialog(){
        if (this.form.id===undefined){
          this.$message.error('请先选择一个分类')
          return
        }
        this.addChildDialogVisible=true
      },
    }
  }
</script>

