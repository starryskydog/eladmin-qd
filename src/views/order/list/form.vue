<template>
  <el-dialog :visible.sync="dialog" :title="dataType==='custom' ? '选择客户名称' : '选择产品'" append-to-body width="800px"
             :show-close=false>
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <el-input v-model="params.productCode " clearable placeholder="输入产品编号搜索" style="width: 200px;" class="filter-item" size="small"/>
      <el-select v-model="params.productSeriesId" clearable placeholder="产品系列" class="filter-item" style="width: 130px" size="small">
        <el-option v-for="item in queryTypeOptions" :key="item.id" :label="item.productSeriesName" :value="item.id"/>
      </el-select>
      <el-button class="filter-item" size="small" type="success" icon="el-icon-search"  @click="queryProduct">搜索</el-button>
      <el-table v-loading="loading" :data="data" size="small" style="width: 100%;margin-top: 20px;"
                :header-cell-style="{'text-align':'center'}" border>
        <el-table-column type="index" width="50" align="center" label="编号">
        </el-table-column>
        <el-table-column label="选择" width="50px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="form.radio" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in dataType==='custom' ?customColumns:productColumns" :key="v.field" :prop="v.field" :label="v.title"></el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="page + 1"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"/>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {queryCustomerInfoPage} from '@/api/customerInfo'
  import { queryProductInfoPage } from '@/api/productInfo'
  import {queryProductSeriesList} from '@/api/productSeries'

  export default {
    components: {},
    props: {
      formType: {
        type: String
      },
    },
    data() {
      return {
        params:{
          page: 0,
          size: 10,
          productCode:'',
          productSeriesId:''
        },
        queryTypeOptions:[],
        dialog: false,
        page: 0, size: 10,
        loading: false,
        categoryList: [],
        form: {
          radio: ''
        },
        url: '',
        data: [],
        total: 0,
        dataType:'',
        customColumns: [
          {field: "customerCode", title: "客户编号", width: 220},
          {field: "customerName", title: "客户名称", width: 120},
          {field: "firstContactName", title: "联系人", width: 100},
          {field: "firstContactMobile", title: "手机号", width: 100,},
        ],
        productColumns:[
          {field: "productCode", title: "产品编号", width: 220},
          {field: "name", title: "产品名称", width: 120},
          {field: "specifications", title: "规格", width: 160},
          {field: "unitPrice", title: "单价", width: 100},
          {field: "measureUnitName", title: "单位", width: 100},
          {field: "productCategoryName", title: "类别", width: 100},
        ]
      }
    },
    created() {
      // this.queryProduct()
      this.queryProductSeries()
    },
    watch: {
      dataType: function (val) {
        this.loading = true
        this.getData()
      },
    },
    methods: {
      queryProductSeries() {
        queryProductSeriesList().then(res=>{
          this.queryTypeOptions=res.content
        })
      },
      getData(){
        const params={
          page:this.page, size:this.size
        }
        if(this.dataType==='custom'){
          this.queryCustom(params)
        }else{
          this.queryProduct(params)
        }
      },
      queryCustom(params) {
        queryCustomerInfoPage(params).then(res => {
          this.data = res.content
          this.total = res.totalElements
          this.loading = false
        })
      },
      pageChange(e) {
        this.page = e - 1
        this.getData()
      },
      sizeChange(e) {
        this.page = 0
        this.size = e
        this.getData()
      },
      queryProduct() {
        queryProductInfoPage(this.params).then(res => {
          this.data = res.content
          this.total = res.totalElements
          this.loading = false
        })
      },
      cancel() {
        this.resetForm()
      },
      doSubmit() {
        if (this.form.radio) {
          if(this.dataType==='product'){
            this.$emit('setContact',this.form.radio)
          }else{
            this.$emit('setRadio',this.form.radio)
          }
        }
        this.resetForm()
      },
      resetForm() {
        this.form = {
          radio: ''
        }
        this.dialog = false
        this.page=0;
        this.size=10
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
