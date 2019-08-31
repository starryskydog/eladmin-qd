<template>
  <el-dialog :visible.sync="dialog" :title="formType==='custom' ? '选择客户名称' : '选择产品'" append-to-body width="800px"
             :show-close=false>
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <el-table v-loading="loading" :data="data" size="small" style="width: 100%;"
                :header-cell-style="{'text-align':'center'}" border>
        <el-table-column type="index" width="50" align="center" label="编号">
        </el-table-column>
        <el-table-column label="选择" width="50px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="form.radio" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in formType==='custom' ?customColumns:productColumns" :key="v.field" :prop="v.field" :label="v.title"></el-table-column>
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
  import {queryCustomerOrderPage} from '@/api/customerOrder'
  import { queryProductInfoPage } from '@/api/productInfo'

  export default {
    components: {},
    props: {
      formType: {
        type: String
      },
    },
    data() {
      return {
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
          {field: "customerOrderCode", title: "订单编号", width: 220},
          {field: "customerName", title: "客户名称", width: 120},
          {field: "deliveryUser", title: "联系人", width: 100},
          {field: "deliveryUserContact", title: "手机号", width: 100,},
        ],
        productColumns:[
          {field: "productCode", title: "产品编号", width: 220},
          {field: "name", title: "产品名称", width: 120},
          {field: "specifications", title: "规格", width: 160},
          {field: "unitPrice", title: "单价", width: 100},
          {field: "measureUnitName", title: "单位", width: 100},
          {field: "productCategoryName", title: "类别", width: 100},
        ],
      }
    },
    created() {
    },
    watch: {
      dataType: function (val) {
        this.loading = true
        this.getData()
      },
    },
    methods: {
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
        queryCustomerOrderPage(params).then(res => {
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
      queryProduct(params) {
        queryProductInfoPage(params).then(res => {
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
