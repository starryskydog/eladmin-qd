<template>
  <el-dialog :visible.sync="dialog" title="选择耗材" append-to-body width="600px"
             :show-close=false>
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <el-table v-loading="loading" :data="dataList" size="small" style="width: 100%;"
                :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" border>
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
import { queryConsumablesInfoList } from '@/api/consumables'

export default {
  components: {},
  props: ['formType','productList','itemList'],
  data() {
    return {
      dialog: false,
      page: 0, size: 10,
      loading: false,
      dataList:[],
      form:{
        radio:''
      },
      total: 0,
      productColumns:[
        {field: "consumablesCode", title: "耗材编号", width: 220},
        {field: "consumablesName", title: "耗材名称", width: 120},
      ],
    }
  },
  created() {
    this.queryConsumablesInfoList()
  },
  methods: {
    queryConsumablesInfoList() {
      queryConsumablesInfoList().then(res=>{
        this.dataList=res.content
        this.total=res.totalElements
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
