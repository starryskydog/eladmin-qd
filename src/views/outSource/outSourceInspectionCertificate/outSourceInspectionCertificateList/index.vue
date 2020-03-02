<template>
  <div class="app-container">
    <eForm ref="eform" @setIndex="handleRadio"/>
    <div v-permission="['ADMIN','OUT_SOURCE_INSPECTION_CERTIFICATE_ALL','OUT_SOURCE_INSPECTION_CERTIFICATE_CREATE']" style="display: inline-block;margin: 0px 2px;">
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
      <el-form-item type="index" label-width="350"  align="center" label="委外加工单">
        <el-input size="mini" placeholder="请输入内容"
                  style="width: 200px"
                  v-model="form.outSourceProcessSheetCode"
                  @focus="handleFocus()">
                                  <span class="el-tag  el-tag--mini" v-if="showBtn"
                                        slot="suffix" style="cursor: pointer;margin-top: 4px"
                                        @click="addCode()">
                                选择
                            </span>
        </el-input>
      </el-form-item>
      <Contact :dataList="form.outSourceInspectionCertificateProductList" :itemList="itemList" @setContacts="handleData"></Contact>
      <el-form-item label="制单人:" prop="makePeopleName" style="margin: 20px auto">
        {{form.makePeopleName}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import eForm from './form'
import Contact from './module/contact'
import store from '@/store'
import { add,initOutSourceInspectionCertificateCode,queryOutSourceInspectionCertificateById,edit } from '@/api/outSourceInspection'

export default {
  mixins: [initData],
  components: { eForm, Contact },
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
        makePeopleName:'',
        outSourceProcessSheetCode:'',
        outSourceInspectionCertificateCode:'',
        outSourceInspectionCertificateProductList: [
          {
            productCode: '',
            productName: '',
            productId: '',
            productNumber: '',
            qualifiedNumber: "",
            scrapNumber:'',
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
    this.form.makePeopleName=store.getters.user.username
    this.form.makePeopleId=store.getters.user.id
    if(id){
      this.queryOutSourceInspectionCertificateById(id)
      this.type='edit'
    }else{
      this.initInvoiceCode()
    }
  },
  methods: {
    checkPermission,
    handleFocus(){
      this.showBtn=true
    },
    handleData(data){
      this.form.outSourceInspectionCertificateProductList=data
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
                this.$router.replace({ path: '/outSource/outSourceInspectionCertificate' })
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
                this.$router.replace({ path: '/outSource/outSourceInspectionCertificate' })
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
    queryOutSourceInspectionCertificateById(id) {
      queryOutSourceInspectionCertificateById(id).then(res => {
        this.form=res

      })
    },
    handleRadio(radio) {
      this.form.outSourceProcessSheetCode=radio.outSourceProcessSheetCode
      const list=radio.outSourceProcessSheetProductList;
      this.itemList=list
      let newList = list.map(v=>{
        return {...v,qualifiedNumber:v.productNumber,scrapNumber:'0'}
      })
      this.form.outSourceInspectionCertificateProductList = newList
    },
    changeType(type) {
      this.type = type
    },
    addCode() {
      this.$refs.eform.dialog = true
      this.$refs.eform.dataType = 'outSourceInspectionCertificate'
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
