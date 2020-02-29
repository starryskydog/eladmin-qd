<template>
  <div class="app-container">
    <eForm ref="form" :is-add="isAdd" />
    <!--工具栏-->
    <div class="head-container">
      <div v-permission="['ADMIN','QUALITY_CHECK_SHEET_ALL','QUALITY_CHECK_SHEET_CREATE']" style="display: inline-block;margin: 0px 2px;">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
    </div>
    <el-row :gutter="5">
      <!--质量检验单管理-->
      <el-col >
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="data" border highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column v-if="checkPermission(['ADMIN','QUALITY_CHECK_SHEET_ALL'])" label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button v-permission="['ADMIN','QUALITY_CHECK_SHEET_ALL','QUALITY_CHECK_SHEET_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
                <el-popover
                  v-permission="['ADMIN','QUALITY_CHECK_SHEET_ALL','QUALITY_CHECK_SHEET_DELETE']"
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
            <el-table-column prop="qualityCheekSheetCode" label="单据编号">
              <template slot-scope="scope">
                <router-link :to="{name:'委外验收单详情', params: { id: scope.row.id }}">{{scope.row.qualityCheekSheetCode}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="makePeopleName" label="制单人"/>
            <el-table-column prop="createTime" label="制单日期">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.updateTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTimeStr" label="创建时间"/>
            <el-table-column prop="updateTimeStr" label="更新时间"/>
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
  import { del } from '@/api/productCheckSheet'
  import initData from '@/mixins/initData'
  import eForm from './form'
  import { parseTime } from '@/utils/index'
  export default {
    mixins: [initData],
    components: { eForm },
    data() {
      return {
        isAdd:false,
        delLoading: false,
        id:''
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      checkPermission,
      parseTime,
      beforeInit() {
        this.showButton = false
        this.url = 'api/queryQualityCheckSheetPage'
        const query = this.query
        const value = query.value
        this.params = { page: this.page, size: this.size }
        if (value) { this.params['name'] = value }
        return true
      },
      add() {
        this.$router.push({ path: '/qualityCheckSheet/list' })
      },
      edit(data) {
        this.$router.push({ path: `/qualityCheckSheet/list/${data.id}`});
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
