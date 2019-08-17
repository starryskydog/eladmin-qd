<template>
  <div class="app-container">
    <!--表单组件-->
    <eForm ref="eform" :is-add="isAdd" @getContactList="getContact"/>
    <!--工具栏-->
    <div class="head-container">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" >
        <el-form-item label="供应商编号" prop="supplierCode">
          <el-input v-model="form.supplierCode" disabled/>
        </el-form-item>
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="form.supplierName"/>
      </el-form-item>
        <el-form-item label="类型" prop="supplierCategoryId">
          <el-select v-model="form.supplierCategoryId" style="width: 150px;" placeholder="请选择">
            <el-option
              v-for="(item, index) in categoryList"
              :key="item.name + index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址">
          <Address></Address>
        </el-form-item>
        <el-form-item label="期初应付款" prop="initialPreMoney" style="display:block;">
          <el-input-number v-model="form.initialPreMoney"/>
        </el-form-item>
        <el-form-item prop="remark">
          <el-input
            type="textarea"
            :rows="4"
            style="width: 500px"
            placeholder="备注信息"
            v-model="form.remark">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-permission="['ADMIN','USER_ALL','USER_CREATE']" style="display: inline-block;margin: 0px 2px 10px 0;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增联系人</el-button>
    </div>
    <el-row :gutter="17">
      <!--计量单位管理-->
      <el-col>
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="contactList" border highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <!--<el-table-column v-if="checkPermission(['ADMIN','ROLES_ALL','ROLES_EDIT','ROLES_DELETE'])" label="操作" width="130px" align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<el-popover-->
                  <!--v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']"-->
                  <!--:ref="scope.row.id"-->
                  <!--placement="top"-->
                  <!--width="180">-->
                  <!--<p>确定删除本条数据吗？</p>-->
                  <!--<div style="text-align: right; margin: 0">-->
                    <!--<el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>-->
                    <!--<el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>-->
                  <!--</div>-->
                  <!--<el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>-->
                <!--</el-popover>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="name" label="联系人"/>
            <el-table-column prop="phone" label="手机"/>
            <el-table-column prop="telephone" label="座机"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="qq" label="QQ"/>
            <el-table-column prop="weChat" label="微信"/>
            <el-table-column prop="primaryContact" label="首要联系人"/>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission'
  import { del,initCode } from '@/api/supplier'
  import { queryAllCategoryList } from '@/api/supplierCategory'
  import initData from '@/mixins/initData'
  import eForm from './form'
  import Address from '@/components/Address'
  export default {
    components: { eForm,Address },
    mixins: [initData],
    data() {
      return {
        isAdd:false,
        contactList:[],
        categoryList:[],
        delLoading: false,
        dialog: false, loading: false,
        form: { supplierName: '', initialPreMoney: null, supplierCode:null,supplierCategoryId:null,supplierAddress:'',remark:'' },
        rules: {
          supplierName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          supplierCategoryId: [
            { required: true, message: '请选择供应商类型', trigger: 'change',type:'number' },
          ],
        }
      }
    },
    created() {
      this.initCode()
      this.queryAllCategoryList()
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      checkPermission,
      beforeInit() {
        this.showButton = false
        this.url = 'api/initSupplierCode'
        const query = this.query
        const value = query.value
        this.params = { page: this.page, size: this.size }
        if (value) { this.params['name'] = value }
        return true
      },
      add() {
        this.isAdd = true
        this.$refs.eform.dialog = true
      },
      getContact(data){
        console.log(this.contactList)
        this.contactList.push(data)
        console.log(this.contactList)
      },
      edit(data) {
        this.isAdd = false
        const _this = this.$refs.form
        _this.form = { id: data.id, name: data.name }
        if (_this.form.dataScope === '自定义') {
          _this.getDepts()
        }
        _this.dialog = true
      },
      initCode(){
        initCode().then(res=>{
          this.form.supplierCode=res
        })
      },
      queryAllCategoryList(){
        queryAllCategoryList().then(res=>{
          this.categoryList=res
        })
      },
      handleCurrentChange(val) {
      },
      subDelete(id) {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.dleChangePage()
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          this.$refs[id].doClose()
          console.log(err.response.data.message)
        })
      },
    }
  }
</script>

<style scoped>

</style>
