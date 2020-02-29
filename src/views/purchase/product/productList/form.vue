<template>
  <el-dialog :visible.sync="dialog" title="选择产品" append-to-body width="800px"
             :show-close=false>
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <el-input v-model="params.productCode " clearable placeholder="输入产品编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="queryProduct" size="small"/>
      <el-select v-model="params.productSeriesId" clearable placeholder="产品系列" class="filter-item" style="width: 130px" size="small">
        <el-option v-for="item in queryTypeOptions" :key="item.id" :label="item.productSeriesName" :value="item.id"/>
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="queryProduct">搜索</el-button>
      <el-table v-loading="loading" :data="dataList" size="small" style="width: 100%;margin-top: 20px"
                :header-cell-style="{'text-align':'center'}" border>
        <el-table-column type="index" width="50" align="center" label="编号">
        </el-table-column>
        <el-table-column label="选择" width="50px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="form.radio" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in productColumns" :key="v.field" :prop="v.field" :label="v.title"></el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="params.page + 1"
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
import {queryProductSeriesList} from '@/api/productSeries'

export default {
  components: {},
  props: ['formType','productList','itemList','checkedList'],
  data() {
    return {
      dialog: false,
      params:{
        page: 0,
        size: 10,
        productCode:'',
        productSeriesId:''
      },
      queryTypeOptions:[],
      loading: false,
      dataList:[],
      form:{
        radio:''
      },
      total: 0,
      productColumns:[
        {field: "productCode", title: "产品编号", width: 220},
        {field: "name", title: "产品名称", width: 120},
        {field: "productSeriesName", title: "产品系列", width: 120},
      ],
    }
  },
  created() {
    this.queryProduct()
    this.queryProductSeries()
  },
  methods: {
    queryProductSeries() {
      queryProductSeriesList().then(res=>{
        this.queryTypeOptions=res.content
      })
    },
    queryProduct() {
      queryProductInfoPage(this.params).then(res=>{
        this.dataList=res.content
        this.total=res.totalElements
      })
    },
    pageChange(e) {
      this.params.page = e - 1
      this.queryProduct()
    },
    sizeChange(e) {
      this.params.page = 0
      this.params.size = e
      this.queryProduct()
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      if (this.form.radio) {
        this.$emit('setContact', this.form.radio)
      }
      this.resetForm()
    },
    resetForm() {
      this.form = {
        radio: ''
      }
      this.dialog = false
      this.params.page = 0;
      this.params.size = 10
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
