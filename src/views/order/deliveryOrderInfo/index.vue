<template>
  <div class="app-container">
    <eForm ref="form" :is-add="isAdd" />
    <!--工具栏-->
    <div class="head-container">
      <div v-permission="['ADMIN','INVOICE_ALL','INVOICE_CREATE']" style="display: inline-block;margin: 0px 2px;">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
    </div>
    <el-input v-model="query.customerOrderCode" clearable placeholder="输入订单编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" size="mini"/>
    <el-input v-model="query.customerName" clearable placeholder="输入客户名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" size="mini"/>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-row :gutter="5" style="margin-top: 20px;">
      <!--发货单管理-->
      <el-col >
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="data" border highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column v-if="checkPermission(['ADMIN','INVOICE_ALL'])" label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button v-permission="['ADMIN','INVOICE_ALL','INVOICE_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
                <el-popover
                  v-permission="['ADMIN','INVOICE_ALL','INVOICE_DELETE']"
                  :ref="scope.row.id"
                  placement="top"
                  width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="createTimeStr" label="单据日期"/>
            <el-table-column prop="saleInvoiceCode" label="单据编号"/>
            <el-table-column prop="customerOrderCode" label="订单编号"/>
            <el-table-column prop="customerName" label="客户名称"/>
            <el-table-column prop="logisticsCompany" label="物流公司"/>
            <el-table-column prop="logisticsCode" label="物流单号"/>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="total"
            :current-page="page + 1"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="pageChange"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission'
  import { del } from '@/api/invoice'
  import initData from '@/mixins/initData'
  import eForm from './form'
  export default {
    mixins: [initData],
    components: { eForm },
    data() {
      return {
        isAdd:false,
        delLoading: false,
        id:'',
        query:{}
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      checkPermission,
      beforeInit() {
        this.showButton = false
        this.url = 'api/queryInvoicePage'
        this.params = Object.assign({ page: this.page, size: this.size },this.query)
        return true
      },
      add() {
        this.$router.push({ path: '/deliveryOrders/list' })
      },
      edit(data) {
        this.$router.push({ path: `/deliveryOrders/list/${data.id}` })
      },
      handleCurrentChange(val) {
      },
      subDelete(id) {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.dleChangePage()
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          this.$refs[id].doClose()
          console.log(err.response.data.message)
        })
      },
    }
  }
</script>

<style scoped>

</style>
