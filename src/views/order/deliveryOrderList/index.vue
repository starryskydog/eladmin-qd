<template>
  <div class="app-container">
    <eForm ref="eform" @setRadio="handleRadio" :formType="type" @setType="changeType"/>
    <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
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
          单据编号：{{form.saleInvoiceCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        销售发货单
      </p>
      <el-form-item label="订单号：" label-width="80px">
        <el-input v-model="form.customerOrderCode" size="small" @focus="handleFocus()" placeholder="请选择订单号">
          <span v-if="focus" slot="suffix" lass="el-tag  el-tag--mini" style="cursor: pointer;" @click="addCode()">选择</span>
        </el-input>
      </el-form-item>
      <el-form-item label="客户：" prop="customerName">
        <el-input v-model="form.customerName" size="small" placeholder="请选择客户">
        </el-input>
      </el-form-item>
      <el-form-item label="收货地址" style="margin: 0 20px 20px 0" prop="deliveryAddress">
        <el-input v-model="form.deliveryAddress" size="small" placeholder="请填写收货地址">
        </el-input>
      </el-form-item>
      <el-form-item label="收货人" style="margin: 0 20px 20px 0" prop="consignee">
        <el-input v-model="form.consignee" size="small" placeholder="请填写收货人">
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式" style="margin: 0 20px 20px 0" prop="contactWay">
        <el-input v-model="form.contactWay" size="small" placeholder="请填写联系方式">
        </el-input>
      </el-form-item>
      <el-form-item label="发票号" style="margin: 0 20px 20px 0" prop="invoiceNumber">
        <el-input v-model="form.invoiceNumber" size="small" placeholder="请填写发票号">
        </el-input>
      </el-form-item>
      <Contact :dataList="form.invoiceProductList"></Contact>
      <el-form-item prop="remark" style="margin: 20px auto;display: block;">
        <el-input
          v-model="form.remark"
          placeholder="请填写备注"
          type="textarea"
          :rows="4"
          style="width: 500px;margin-top: 20px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="物流公司" style="margin: 0 20px 20px 0" prop="logisticsCompany">
        <el-input v-model="form.logisticsCompany" size="small" placeholder="请填写公司名称">
        </el-input>
      </el-form-item>
      <el-form-item label="物流单号" style="margin: 0 20px 20px 0" prop="logisticsCode">
        <el-input v-model="form.logisticsCode" size="small" placeholder="请填写单号">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import eForm from './form'
import Contact from './module/contact'
import { add,initInvoiceCode ,edit,getInvoiceInfo} from '@/api/invoice'

export default {
  mixins: [initData],
  components: { eForm, Contact },
  data() {
    return {
      isAdd: false,
      delLoading: false,
      id: '',
      focus: false,
      customerName: '',
      type: 'custom',
      form: {
        customerId: '',
        saleInvoiceCode: '',
        logisticsCompany: '',
        logisticsCode: '',
        customerOrderCode: '',
        deliveryAddress: '',
        consignee: '',
        contactWay: '',
        invoiceNumber: '',
        remark: '',
        invoiceProductList: [
          {
            productCode: '',
            productName: '',
            specifications: '',
            unitPrice: '',
            productNumber: '',
            allMoney: '',
            remark: ''
          }
        ]
      },
      rules: {
        // customerName: [
        //   { required: true, message: '客户名称不能为空', trigger: 'blur' }
        // ],
        deliveryAddress: [
          { required: true, message: '收货地址不能为空', trigger: 'blur' }
        ],
        consignee: [
          { required: true, message: '收货人不能为空', trigger: 'blur' }
        ],
        contactWay: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ],
        invoiceNumber: [
          { required: true, message: '发票号不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        logisticsCompany: [
          { required: true, message: '物流公司不能为空', trigger: 'blur' }
        ],
        logisticsCode: [
          { required: true, message: '物流单号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id=this.$route.params.id
    if(id){
      this.getInvoiceInfo(id)
      this.type='edit'
    }else{
      this.initInvoiceCode()
    }
  },
  methods: {
    checkPermission,
    add() {
      this.$refs['form'].validate((valid) => {
        console.log(valid)
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
            })
          }else{
            add(this.form).then(res => {
              this.$notify({
                title: '添加成功',
                type: 'success',
                duration: 2500
              })
            })
          }
          setTimeout(() => {
            this.$router.replace({ path: '/order/deliveryOrderInfo' })
          }, 2500);
        }
      })
    },
    initInvoiceCode() {
      initInvoiceCode().then(res => {
        this.form.saleInvoiceCode = res
      })
    },
    getInvoiceInfo(id) {
      getInvoiceInfo(id).then(res => {
        this.form = res
        this.form.invoiceProductList=res.invoiceProductDTOList
      })
    },
    handleRadio(radio) {
      this.form.customerOrderCode = radio.customerOrderCode
      this.form.customerName = radio.customerName
      this.form.customerId = radio.customerId
      this.form.deliveryAddress = radio.deliveryAddress
      this.form.consignee = radio.deliveryUser
      this.form.contactWay = radio.deliveryUserContact
      this.form.invoiceProductList = radio.customerOrderProductList
    },
    changeType(type) {
      this.type = type
    },
    addCode() {
      this.$refs.eform.dialog = true
      this.$refs.eform.dataType = 'custom'
    },
    handleFocus() {
      this.focus = true
    }
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
