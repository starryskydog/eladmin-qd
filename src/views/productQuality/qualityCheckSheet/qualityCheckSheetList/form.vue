<template>
  <el-dialog :visible.sync="dialog" :title="dataType==='product' ? '选择产品' : '选择委外加工单'" append-to-body width="800px"
             :show-close=false>
    <el-input v-model="productName" clearable placeholder="输入关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="getData" size="mini"/>
    <el-select v-model="productCategoryId" size="mini" @change="getData" clearable placeholder="产品类别" class="filter-item" style="width: 130px">
      <el-option v-for="item in productCategoryList" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select>
    <el-select v-model="productSeriesId" size="mini" clearable placeholder="产品系列" class="filter-item" style="width: 90px" @change="getData">
      <el-option v-for="item in productSeriesList" :key="item.id" :label="item.productSeriesName" :value="item.id"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getData">搜索</el-button>
    <el-form ref="form" :inline="true" :model="form" size="small" style="margin-top: 20px" label-width="100px">

      <el-table v-loading="loading" :data="dataList" size="small" style="width: 100%;"
                :header-cell-style="{'text-align':'center'}" border>
        <el-table-column type="index" width="50" align="center" label="编号">
        </el-table-column>
        <el-table-column label="选择" width="50px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="form.radio" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in formType==='product' ?customColumns:productColumns" :key="v.field" :prop="v.field" :label="v.title"></el-table-column>
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
import { queryProductInfoPage } from '@/api/productInfo'
import { queryProductCategoryList } from '@/api/productCategory'
import { queryProductSeriesList } from '@/api/productSeries'

export default {
  components: {},
  props: ['formType','productList','itemList'],
  data() {
    return {
      dialog: false,
      i: 0,
      page: 0,
      size: 10,
      loading: false,
      dataList:[],
      categoryList: [],
      form: {
        radio: ''
      },
      url: '',
      total: 0,
      dataType:'product',
      productName:'',
      productCategoryId:null,
      productCategoryList:[],
      productSeriesId:null,
      productSeriesList:[],
      customColumns: [
        {field: "productCode", title: "产品编号", width: 220},
        {field: "name", title: "产品名称", width: 120},
        {field: "productCategoryName", title: "产品类别", width: 100},
      ],
      productColumns:[
        {field: "outSourceProcessSheetCode", title: "编号", width: 220},
        {field: "outSourceCompanyName", title: "公司名称", width: 120},
        {field: "outSourceAdminName", title: "负责人", width: 160},
        {field: "contactWay", title: "联系方式", width: 100},
      ],
    }
  },
  created() {
    this.getData()
    this.queryAllCategoryList()
    this.queryProductSeries()
  },
  methods: {
    getData() {
      const params = {
        page: this.page, size:this.size,productName:this.productName,productCategoryId:this.productCategoryId,productSeriesId:this.productSeriesId
      }
      if( this.dataType === 'product') {
        this.queryProduct(params)
      } else {
        this.queryOutSourceProcessSheetPage(params)
      }
    },
    queryAllCategoryList() {
      queryProductCategoryList().then(res => {
        this.productCategoryList = res
      })
    },
    queryProductSeries() {
      queryProductSeriesList().then(res => {
        this.productSeriesList = res.content
      })
    },
    queryCustom(params) {

    },
    queryProduct(params) {
      queryProductInfoPage(params).then(res => {
        this.dataList = res.content
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
    queryOutSourceProcessSheetPage(params) {

    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      if (this.form.radio) {
        if (this.dataType === 'outSourceInspectionCertificate'){
          this.$emit('setIndex', this.form.radio)
        } else {
          this.$emit('setContact', this.form.radio)
        }
      }
      this.resetForm()
    },
    resetForm() {
      this.form = {
        radio: ''
      }
      this.dialog = false
      this.page = 0;
      this.size = 10
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
