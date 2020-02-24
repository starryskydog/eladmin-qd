<template>
  <div class="app-container">
    <div v-permission="['ADMIN','CONSUMABLESPURCHASEORDER_ALL','CONSUMABLESPURCHASEORDER_CREATE']" style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        @click="add">保存
      </el-button>
    </div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="large" label-width="80px" label-position='left'>
      <p class="form-title" style="text-align: center; font-size: 18px">
        无锡市海星船舶动力有限公司
        <span style="position: absolute;right: 30px;font-size: 12px;color: #666">
          单据编号：{{form.consumablesPurchaseOrderCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        耗材采购单
      </p>
      <Contact :dataList="form.consumablesPurchaseOrderProductList" :itemList="itemList" @setContacts="handleData"></Contact>
      <el-form-item label="采购人:" prop="purchaseUserName" style="margin: 20px auto">
        {{form.purchaseUserName}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import Contact from './module/contact'
import store from '@/store'
import { add,initConsumablesPurchaseOrderCode,edit,queryConsumablesPurchaseOrderById } from '@/api/purchaseConsumables'

export default {
  mixins: [initData],
  components: { Contact },
  data() {
    return {
      isAdd: false,
      delLoading: false,
      id: '',
      focus: false,
      showBtn:false,
      dateTime:'',
      adminList:[],
      itemList:[],
      form: {
        purchaseUserName:'',
        consumablesPurchaseOrderCode:'',
        consumablesPurchaseOrderProductList: [
          {
            consumablesCode: "",
            consumablesName: "",
          }
        ],
      },
      rules: {
        contactWay: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    const id=this.$route.params.id
    if(id){
      this.queryConsumablesPurchaseOrderById(id)
      this.type='edit'
    }else{
      this.initInvoiceCode()
      this.form.purchaseUserName=store.getters.user.username
      this.form.purchaseUserId=store.getters.user.id
    }
  },
  methods: {
    checkPermission,
    handleData(data){
      console.log(data)
      this.form.consumablesPurchaseOrderProductList=data
    },
    add() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.type==='edit'){
            delete this.form.createTime
            delete this.form.updateTime
            edit(this.form).then(res => {
              this.$notify({
                title: '编辑成功',
                type: 'success',
                duration: 2500
              })
              setTimeout(() => {
                this.$router.replace({ path: '/purchase/consumables' })
              }, 2500);
            })
          }else{
            add(this.form).then(res => {
              this.$notify({
                title: '添加成功',
                type: 'success',
                duration: 2500
              })
              setTimeout(() => {
                this.$router.replace({ path: '/purchase/consumables' })
              }, 2500);
            })
          }
        }
      })
    },
    initInvoiceCode() {
      initConsumablesPurchaseOrderCode().then(res => {
        this.form.consumablesPurchaseOrderCode = res
      })
    },
    queryConsumablesPurchaseOrderById(id) {
      queryConsumablesPurchaseOrderById(id).then(res=>{
        this.form=res
      })
    },
    changeType(type) {
      this.type = type
    },
  }
}
</script>

<style scoped>
  .tips {
    background-color: #efefef;
    height: 30px;
    line-height: 30px;
  }
</style>
