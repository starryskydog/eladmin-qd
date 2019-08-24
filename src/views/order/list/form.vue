<template>
  <el-dialog :visible.sync="dialog" :title="dataSourceType==='custom' ? '选择客户名称' : '选择产品'" append-to-body width="800px"
             :show-close=false>
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <el-table v-loading="loading" :data="data" size="small" style="width: 100%;"
                :header-cell-style="{'text-align':'center'}" border>
        <el-table-column type="index" width="50" align="center" label="编号">
        </el-table-column>
        <el-table-column label="选择" width="50px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="form.radio" :label="scope.row.customerCode">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="customerCode" label="客户编号"/>
        <el-table-column prop="customerName" label="客户名称"/>
        <el-table-column prop="phone" label="业务员"/>
        <el-table-column prop="customerContact" label="联系人"/>
        <el-table-column prop="createTime" label="手机号" width="220px" align="center"/>
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
  import initData from '@/mixins/initData'
  import {queryCustomerInfoPage} from '@/api/customerInfo'

  export default {
    components: {},
    props: {
      formType: {
        type: String
      },
    },
    mixins: [initData],
    data() {
      return {
        dialog: false,
        loading: false,
        categoryList: [],
        form: {
          radio: ''
        },
        dataSourceType: '',
        url: '',
        data: [],
        total: 0
      }
    },
    created() {

    },
    watch: {
      dataSourceType: function (val) {
        if (val === 'custom') {
          this.queryCustom()
        } else {
          this.url = 'api/queryProductInfoList'
        }
      },
    },
    methods: {
      // beforeInit() {
      //   this.url = this.dataSourceType==='custom'?'api/queryCustomerInfoPage':'api/queryProductInfoList'
      //   this.params = { page: this.page, size: this.size, }
      //   return true
      // },
      queryCustom() {
        this.loading = true
        queryCustomerInfoPage().then(res => {
          this.data = res.content
          this.total = res.totalElements
          this.loading = false
        })
      },
      queryProduct() {

      },
      cancel() {
        this.dialog = false
      },
      doSubmit() {
        if (this.form.radio) {
          this.dialog = false
          this.$emit('setRadio', this.form.radio)
        }

      },
      resetForm() {
        this.form = {
          radio: ''
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
