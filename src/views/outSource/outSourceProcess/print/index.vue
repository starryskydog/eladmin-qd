<template>
  <div class="app-container">
    <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        v-print="'#printTest'"
        >打印
      </el-button>
    </div>
    <el-form ref="form" :inline="true" id="printTest" :model="form" size="large" label-width="80px" label-position='left' style="height:100%">
      <p class="form-title" style="text-align: center; font-size: 18px">
        无锡市海星船舶动力有限公司
        <span style="position: absolute;right: 30px;font-size: 12px;color: #666">
          单据编号：{{form.outSourceProcessSheetCode}}
        </span>
      </p>
      <p class="form-sub-title" style="text-align: center;">
        委外加工单
      </p>
      <el-form-item label="委外生产公司:" label-width="100px">
        {{form.outSourceCompanyName}}
      </el-form-item>
      <el-form-item label="委外负责人:" label-width="100px">
        {{form.outSourceAdminName}}
      </el-form-item>
      <el-form-item label="联系方式:" label-width="80px">
        {{form.contactWay}}
      </el-form-item>
      <el-table size="mini" :data="form.outSourceProcessSheetProductList" border style="width: 100%" highlight-current-row
                :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" show-summary
                :summary-method="getSummaries">
        <el-table-column v-for="(v,i) in columns" :key="v.field" :prop="v.field" :label="v.title"
                         :width="v.width">
        </el-table-column>
      </el-table>
      <div>
        <el-form-item label="验收日期:" prop="makePeopleName" style="margin: 20px 120px 20px 40px;float: right;" />
        <el-form-item label="验收人:" prop="makePeopleName" style="margin: 20px 40px;float: right" />
      </div>

    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import store from '@/store'
import {checkProcessSheetById } from '@/api/outSourceProcessSheet'

export default {
  mixins: [initData],
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
      columns: [
        {field: "productCode", title: "货号", width: 220},
        {field: "productName", title: "名称", width: 160},
        {field: "productNumber", title: "产品数量", width: 80},
        {field: "deliverDate", title: "委外交货日期", width: 220, type:'date'},
        {field: "remark", title: "备注"},
      ],
      form: {
        makePeopleName:'',
        outSourceProcessSheetCode:'',
        outSourceInspectionCertificateCode:'',
        outSourceProcessSheetProductList: [
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
      }
    }
  },
  created() {
    const id=this.$route.params.id
    if(id){
      this.checkProcessSheetById(id)
      this.type='edit'
    }
  },
  methods: {
    checkPermission,
    checkProcessSheetById(id) {
      checkProcessSheetById(id).then(res => {
        this.form=res
      })
    },
    print(){
      console.log('print')
    },
    getSummaries(param) {
      const {columns, data} = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 2) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = '0'
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
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
