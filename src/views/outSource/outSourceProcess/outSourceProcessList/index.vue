<template>
  <div class="app-container">
    <eForm ref="eform" @setRadio="handleRadio" :formType="type" @setType="changeType"/>
    <div v-permission="['ADMIN','OUT_SOURCE_PROCESS_SHEET_ALL','OUT_SOURCE_PROCESS_SHEET_CREATE']" style="display: inline-block;margin: 0px 2px;">
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
          单据编号：{{form.outSourceProcessSheetCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        委外加工单
      </p>
      <el-form-item label="委外生产公司" label-width="100px">
        <el-select
          v-model="form.outSourceCompanyCode"
          size="small"
          @change="handleChooseCompany"
          style="width: 200px"
          placeholder="请选择">
          <el-option
            v-for="item in companyList"
            :key="item.outSourceCompanyCode"
            :label="item.outSourceCompanyName"
            :value="item.outSourceCompanyCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="委外负责人" label-width="100px">
        <el-input
          v-model="form.outSourceAdminName"
          size="small"
          style="width: 200px"
          placeholder="请输入">
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式" label-width="80px">
        <el-input v-model="form.contactWay" size="small" placeholder="请填写联系方式">
        </el-input>
      </el-form-item>
      <Contact :dataList="form.outSourceProcessSheetProductList"></Contact>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import eForm from './form'
import Contact from './module/contact'
import { add,initOutSourceProcessSheetCode,checkProcessSheetById,edit } from '@/api/outSourceProcessSheet'
import { queryOutSourceCompanyInfoList } from '@/api/outSourceCompanyInfo'

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
      dateTime:'',
      companyList:[],
      adminList:[],
      type: 'custom',
      form: {
        outSourceAdminId:'',
        contactWay: '',
        outSourceProcessSheetProductList: [
          {
            productCode: '',
            productName: '',
            productId: '',
            productNumber: '',
            remark: '',
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
    this.queryOutSourceCompanyInfoList()
    const id=this.$route.params.id
    if(id){
      this.checkProcessSheetById(id)
      this.type='edit'
    }else{
      this.initInvoiceCode()
    }
  },
  methods: {
    checkPermission,
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
                this.$router.replace({ path: '/outSource/outSourceProcess' })
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
                this.$router.replace({ path: '/outSource/outSourceProcess' })
              }, 2500);
            })
          }
        }
      })
    },
    initInvoiceCode() {
      initOutSourceProcessSheetCode().then(res => {
        this.form.outSourceProcessSheetCode = res
      })
    },
    checkProcessSheetById(id) {
      checkProcessSheetById(id).then(res => {
        this.form=res
      })
    },
    queryOutSourceCompanyInfoList() {
      queryOutSourceCompanyInfoList().then(res => {
        this.companyList = res
      })
    },
    handleRadio(radio) {
      this.form.outSourceProcessSheetProductList = radio.customerOrderProductList
    },
    handleChooseCompany(id){
      let selectedCompany = {};
      selectedCompany = this.companyList.find((item)=>{//这里的chargingWorkNameList就是上面遍历的数据源
        return item.outSourceCompanyCode === id;
      });
      this.form.outSourceCompanyName=selectedCompany.outSourceCompanyName
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
