<template>
  <div class="app-container">
    <eForm ref="form" :is-add="isAdd" />
    <!--工具栏-->
    <div class="head-container">
      <!-- 新增 -->
      <div v-permission="['ADMIN','MATERIAL_INFO_ALL','MATERIAL_INFO_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >新增</el-button>
      </div>
    </div>

    <el-row :gutter="5">
      <!--物料资料管理-->
      <el-col >
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="data" border highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column v-if="checkPermission(['ADMIN','MATERIAL_INFO_ALL'])" label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button v-permission="['ADMIN','MATERIAL_INFO_ALL','MATERIAL_INFO_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
                <el-popover
                  v-permission="['ADMIN','MATERIAL_INFO_ALL','MATERIAL_INFO_DELETE']"
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
            <el-table-column prop="materialCategoryName" label="物料类别"/>
            <el-table-column prop="materialCode" label="物料编号"/>
            <el-table-column prop="name" label="物料名称"/>
            <el-table-column prop="specifications" label="规格"/>
            <el-table-column prop="measureUnitName" label="计量单位"/>
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
import { queryMaterialInfoPage, deleteMaterialInfoById, getMaterialInfoById } from '@/api/materialInfo'
import initData from '@/mixins/initData'
import eForm from './form'

export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      isAdd: false,
      id: '',
      delLoading: false,
      dialog: false
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
      this.url = 'api/queryMaterialInfoPage'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size }
      if (value) { this.params['name'] = value }
      return true
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      getMaterialInfoById(data.id).then(res => {
        this.isAdd = false
        this.id = data.id
        const _this = this.$refs.form
        _this.dialog = true
        _this.form = res
      })
    },
    handleCurrentChange(val) {
    },
    subDelete(id) {
      this.delLoading = true
      deleteMaterialInfoById(id).then(res => {
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
    }
  }
}
</script>
import eForm from './form'
<style scoped>

</style>
