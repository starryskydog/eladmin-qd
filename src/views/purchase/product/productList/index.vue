<template>
  <div class="app-container">
    <div v-permission="['ADMIN','PRODUCTPURCHASEORDER_ALL','PRODUCTPURCHASEORDER_CREATE']" style="display: inline-block;margin: 0px 2px;">
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
          单据编号：{{form.productPurchaseOrderCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        产品采购单
      </p>
      <Contact :dataList="form.productPurchaseOrderProductList" :itemList="itemList" @setContacts="handleData"></Contact>
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
import { add,initProductPurchaseOrderCode,edit,queryProductPurchaseOrderById } from '@/api/purchaseProduct'

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
        productPurchaseOrderCode:'',
        productPurchaseOrderProductList: [
          {
            productCode: "",
            productName: "",
            productNumber: "",
            specifications:'',
            unitPrice:'',
            remark: "",
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
      this.queryProductPurchaseOrderById(id)
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
      this.form.productPurchaseOrderProductList=data
    },
    add() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const productPurchaseOrderProductList=this.form.productPurchaseOrderProductList
          if(productPurchaseOrderProductList){
            for (var i = productPurchaseOrderProductList.length-1;i >= 0 ;i--) {
              if (productPurchaseOrderProductList[i].productName === '') {
                productPurchaseOrderProductList.splice(i,1);        //执行后aa.length会减一
              }
            }
          }
          this.form.productPurchaseOrderProductList=productPurchaseOrderProductList
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
                this.$router.replace({ path: '/purchase/product' })
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
                this.$router.replace({ path: '/purchase/product' })
              }, 2500);
            })
          }
        }
      })
    },
    initInvoiceCode() {
      initProductPurchaseOrderCode().then(res => {
        this.form.productPurchaseOrderCode = res
      })
    },
    queryProductPurchaseOrderById(id) {
      queryProductPurchaseOrderById(id).then(res=>{
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
