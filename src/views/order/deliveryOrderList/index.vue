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
    <el-form ref="form" :inline="true" :model="form" size="large" label-width="80px" label-position='left'>
      <p class="form-title" style="text-align: center; font-size: 18px">
        无锡市海星船舶动力有限公司
        <span style="position: absolute;right: 30px;font-size: 12px;color: #666">
          单据编号：112121212112
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        销售发货单
      </p>
      <el-form-item label="订单号：" label-width="80px">
        <el-input v-model="form.customerOrderCode" size="small" @focus="handleFocus()" placeholder="请选择订单号">
          <span class="el-tag  el-tag--mini" v-if="focus" slot="suffix" style="cursor: pointer;"
                @click="addCode()">
                                选择
                            </span>
        </el-input>
      </el-form-item>
      <el-form-item label="客户：">
        <el-input v-model="customerName" size="small" placeholder="请选择客户">
        </el-input>
      </el-form-item>
      <el-form-item label="收货地址" style="margin: 0 20px 20px 0">
        <el-input v-model="form.deliveryAddress" size="small" placeholder="请填写收货地址">
        </el-input>
      </el-form-item>
      <el-form-item label="收货人" style="margin: 0 20px 20px 0">
        <el-input v-model="form.consignee" size="small" placeholder="请填写收货人">
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式" style="margin: 0 20px 20px 0">
        <el-input v-model="form.contactWay" size="small" placeholder="请填写联系方式">
        </el-input>
      </el-form-item>
      <el-form-item label="发票号" style="margin: 0 20px 20px 0">
        <el-input v-model="form.invoiceNumber" size="small" placeholder="请填写发票号">
        </el-input>
      </el-form-item>
      <Contact :dataList="form.customerOrderProductList"></Contact>
        <el-form-item prop="username" style="margin: 20px auto;display: block;">
          <el-input
            v-model="form.deliveryUserContact"
            placeholder="请填写备注"
            type="textarea"
            :rows="4"
            style="width: 500px;margin-top: 20px"
          >
          </el-input>
        </el-form-item>
      <el-form-item label="物流公司" style="margin: 0 20px 20px 0">
        <el-input v-model="form.logisticsCompany" size="small" placeholder="请填写公司名称">
        </el-input>
      </el-form-item>
      <el-form-item label="单号" style="margin: 0 20px 20px 0">
        <el-input v-model="form.saleInvoiceCode" size="small" placeholder="请填写单号">
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

  export default {
    mixins: [initData],
    components: {eForm, Contact},
    data() {
      return {
        isAdd: false,
        delLoading: false,
        id: '',
        focus: false,
        customerName: '',
        type:'custom',
        form: {
          customerId: '',
          saleInvoiceCode:'',
          logisticsCompany:'',
          customerOrderCode:'',
          contactWay:'',
          customerOrderProductList: [
            {
              productCode: "",
              productName: "",
              specifications: "",
              unitPrice: "",
              productNumber: "",
              allMoney: "",
              remark: "",
            }
          ],
        },
      }
    },
    created() {
    },
    methods: {
      checkPermission,
      add() {
        console.log(this.form)
      },
      handleRadio(radio) {
        this.form.customerOrderCode=radio.customerOrderCode
        this.customerName=radio.customerName
        this.form.deliveryAddress=radio.deliveryAddress
        this.form.consignee=radio.deliveryUser
        this.form.contactWay=radio.deliveryUserContact
        this.form.customerOrderProductList=radio.customerOrderProductList
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
