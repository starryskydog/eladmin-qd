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
          单据编号：{{form.outSourceInspectionCertificateCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        委外验收单
      </p>
      <Contact :dataList="form.outSourceInspectionCertificateProductList"></Contact>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import eForm from './form'
import Contact from './module/contact'
import { add,initOutSourceInspectionCertificateCode,checkProcessSheetById,edit } from '@/api/outSourceInspection'

export default {
  mixins: [initData],
  components: { eForm, Contact },
  data() {
    return {
      isAdd: false,
      delLoading: false,
      id: '',
      focus: false,
      dateTime:'',
      adminList:[],
      type: 'custom',
      form: {
        outSourceAdminId:'',
        outSourceInspectionCertificateCode:'',
        outSourceInspectionCertificateProductList: [
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
                this.$router.replace({ path: '/outSourceProcess/outSourceProcessSheet' })
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
                this.$router.replace({ path: '/outSourceProcess/outSourceProcessSheet' })
              }, 2500);
            })
          }
        }
      })
    },
    initInvoiceCode() {
      initOutSourceInspectionCertificateCode().then(res => {
        this.form.outSourceInspectionCertificateCode = res
      })
    },
    checkProcessSheetById(id) {
      checkProcessSheetById(id).then(res => {
        this.form=res
      })
    },
    handleRadio(radio) {
      this.form.outSourceProcessSheetProductList = radio.customerOrderProductList
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
