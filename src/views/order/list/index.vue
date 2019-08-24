<template>
  <div class="app-container">
    <eForm ref="eform" :is-add="isAdd" :formType="type" @setRadio="handleRadio"/>
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
      </p>
      <p class="form-sub-title" style="text-align: center;">
        客户订单
      </p>
      <p>
        订单日期：{{date}}
      </p>
      <el-form-item label="客户" prop="customerId" label-width="50px">
        <el-input v-model="form.customerId" size="small" @focus="handleFocus('personnelList')">
          <span class="el-tag  el-tag--mini" v-if="type==='personnelList'" slot="suffix" style="cursor: pointer;"
                @click="addCustom()">
                                选择
                            </span>
        </el-input>
      </el-form-item>
      <el-form-item label="交货日期" prop="deliveryDate">
        <el-date-picker
          v-model="form.deliveryDate"
          type="date"
          size="small"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="单据编号:" prop="customerOrderCode">
        {{form.customerOrderCode}}
      </el-form-item>
      <Contact :dataList="form.customerOrderProductList"></Contact>
      <el-form-item label="制单人:" prop="username" style="margin: 20px auto">
        {{form.username}}
      </el-form-item>
      <p class="tips">
        交货信息
      </p>
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
    components: {eForm,Contact},
    data() {
      return {
        isAdd: false,
        delLoading: false,
        id: '',
        form: {
          customerId:'',
          deliveryDate:'',
          customerOrderCode:'11111',
          customerOrderProductList:[
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
          username:''
        },
        date: '',
        type:'',

      }
    },
    created() {
      this.getDate()
      this.form.username=this.$store.state.user.user.username
    },
    methods: {
      checkPermission,
      add() {
        console.log(this.form)
      },
      handleRadio(radio){
        this.form.customerId=radio
      },
      getDate() {
        const date = new Date();
        const today = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        this.date = today
      },
      addCustom() {
        this.$refs.eform.dialog = true
      },
      handleFocus(type){
        this.type=type
      }
    }
  }
</script>

<style scoped>
  .tips{
    background-color: #efefef;
    height: 30px;
    line-height: 30px;
  }
</style>
