<template>
  <div class="app-container">
    <eForm ref="form" :is-add="isAdd" :checkData="checkData" :dataList="data"/>
    <!--工具栏-->
    <div class="head-container">
      <div v-permission="['ADMIN','CONSUMABLESPURCHASEORDER_ALL','CONSUMABLESPURCHASEORDER_CREATE']" style="display: inline-block;margin: 0px 2px;">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
    </div>
    <el-input v-model="query.consumablesPurchaseOrderCode" clearable placeholder="输入单据编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" size="mini"/>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-row :gutter="5">
      <!--耗材管理-->
      <el-col >
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="data" border highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column v-if="checkPermission(['ADMIN','CONSUMABLESPURCHASEORDER_ALL'])" label="操作" width="220px" align="center">
              <template slot-scope="scope">
                <el-button v-permission="['ADMIN','CONSUMABLESPURCHASEORDER_ALL','CONSUMABLESPURCHASEORDER_EDIT']" size="mini" type="primary" icon="el-icon-check" @click="handleCheck(scope.row)"/>
                <el-button v-permission="['ADMIN','CONSUMABLESPURCHASEORDER_ALL','CONSUMABLESPURCHASEORDER_DELETE']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
                <el-popover
                  v-permission="['ADMIN','CONSUMABLESPURCHASEORDER_AUDIT']"
                  :ref="scope.row.id"
                  placement="top"
                  width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" style="margin-left: 10px" icon="el-icon-delete" size="mini"/>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="consumablesPurchaseOrderCode" label="单据编号"/>
            <el-table-column prop="purchaseUserName" label="采购申请人"/>
            <el-table-column prop="createTimeStr" label="采购申请日期"/>
            <el-table-column prop="auditStatusName" label="审核状态" />
            <el-table-column prop="auditTimeStr" label="审核时间">
              <template slot-scope="scope">
                {{parseTime(scope.row.auditTime)}}
              </template>
            </el-table-column>
            <el-table-column prop="auditUserName" label="审核人" />
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
  import { getSupplierInfoById } from '@/api/invoice'
  import { del,auditConsumablesPurchaseOrder } from '@/api/purchaseConsumables'
  import initData from '@/mixins/initData'
  import { parseTime } from '@/utils/index'
  import store from '@/store'
  import eForm from './form'
  export default {
    mixins: [initData],
    components: { eForm },
    data() {
      return {
        isAdd:false,
        delLoading: false,
        id:'',
        checkData:{}
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      parseTime,
      checkPermission,
      beforeInit() {
        this.showButton = false
        this.url = 'api/queryConsumablesPurchaseOrderPageList'
        const query = this.query
        const value = query.value
        this.params = Object.assign({ page: this.page, size: this.size },this.query)
        if (value) { this.params['name'] = value }
        return true
      },
      add() {
        this.$router.push({ path: '/purchaseConsumables/list' })
      },
      edit(data) {
        this.$router.push({ path: `/purchaseConsumables/list/${data.id}`});
      },
      handleCheck(data){
        this.checkData.id=data.id
        this.checkData.auditUserName=store.getters.user.username
        this.checkData.auditUserId=store.getters.user.id
        this.$refs.form.dialog = true
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
        })
      },
    }
  }
</script>

<style scoped>

</style>
