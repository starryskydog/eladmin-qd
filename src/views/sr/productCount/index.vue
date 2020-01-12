<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="large" label-width="80px" label-position='left'>
      <p class="form-title" style="text-align: center; font-size: 18px">
        无锡市海星船舶动力有限公司
      </p>
      <p class="form-sub-title" style="text-align: center;">
        产品统计
      </p>
      <Contact :dataList="form.productCountList"></Contact>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import eForm from './form'
import Contact from './module/contact'
import store from '@/store'
import { queryProductCountPage } from '@/api/productCount'

export default {
  mixins: [initData],
  components: { Contact },
  data() {
    return {
      isAdd: false,
      delLoading: false,
      id: '',
      form: {
        qualityCheekSheetCode:'',
        productCountList: [],
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
    this.getAllList()
  },
  methods: {
    checkPermission,
    getAllList(){
      queryProductCountPage().then(res=>{
        res.content.forEach(function (item) {
          item.totalNumber=Number(item.mpNumber)+Number(item.jcNumber)+Number(item.hjNumber)+Number(item.bjcNumber)+Number(item.cmNumber)+Number(item.jmNumber)+Number(item.dphNumber)
        })
        this.form.productCountList=res.content
      })
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
