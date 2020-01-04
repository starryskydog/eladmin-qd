<template>
  <div class="app-container">
    <eForm ref="eform" @setIndex="handleRadio"/>
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
          单据编号：{{form.qualityCheekSheetCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        质量检验单
      </p>
      <Contact :dataList="form.qualityCheckSheetProductList" :itemList="itemList" @setContacts="handleData"></Contact>
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
import { add,initQualityCheckSheetCode,qualityCheckSheet,edit } from '@/api/productCheckSheet'

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
        qualityCheekSheetCode:'',
        qualityCheckSheetProductList: [
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
    this.form.makePeopleName = store.getters.user.username
    if(id){
      this.qualityCheckSheet(id)
      this.type='edit'
    }else{
      this.initQualityCheekSheetCode()
    }
  },
  methods: {
    checkPermission,
    handleFocus(){
      this.showBtn=true
    },
    handleData(data){
      console.log(data)
      this.form.qualityCheckSheetProductList=data
    },
    add() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const list=this.form.qualityCheckSheetProductList;
          const _this=this
          list.forEach(function (item,k) {
            if(!list[k].productCode){
              _this.$notify({
                title: '请选择产品',
                type: 'warning',
                duration: 2500
              })
              return false;
            }else{
              if(_this.type==='edit'){
                delete _this.form.createTime
                delete _this.form.updateTime
                edit(_this.form).then(res => {
                  _this.$notify({
                    title: '编辑成功',
                    type: 'success',
                    duration: 2500
                  })
                  setTimeout(() => {
                    _this.$router.replace({ path: '/productQuality/qualityCheckSheet' })
                  }, 2500);
                })
              }else{
                add(_this.form).then(res => {
                  _this.$notify({
                    title: '添加成功',
                    type: 'success',
                    duration: 2500
                  })
                  setTimeout(() => {
                    _this.$router.replace({ path: '/productQuality/qualityCheckSheet' })
                  }, 2500);
                })
              }
            }
          })

        }
      })
    },
    initQualityCheekSheetCode() {
      initQualityCheckSheetCode().then(res => {
        this.form.qualityCheekSheetCode = res
      })
    },
    qualityCheckSheet(id) {
      qualityCheckSheet(id).then(res => {
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
