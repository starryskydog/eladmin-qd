  <template>
  <div class="app-container">
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd"/>
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <!--<el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />-->
      <!--<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>-->
      <!-- 新增 -->
      <span>仓库</span>
      <div v-permission="['ADMIN','WARE_HOUSEE_ALL','WARE_HOUSEE_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
    </div>
    <el-row :gutter="5">
      <!--仓库设置管理-->
      <el-col :xs="8" :sm="8" :md="4" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="data" border highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column v-if="checkPermission(['ADMIN','WARE_HOUSEE_ALL','WARE_HOUSEE_DELETE'])" label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <!--<el-button v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>-->
                <el-popover
                  v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']"
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
            <el-table-column prop="wareHouseCode" label="编号"/>
            <el-table-column prop="name" label="名称"/>
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
  import initData from '@/mixins/initData'
  import eForm from './form'
  import { del, initWareHouseCode } from '@/api/wareHouse'
  import ElSlPanel from 'element-ui/packages/color-picker/src/components/sv-panel'
  export default {
    name:'wareHouse',
    components: { ElSlPanel, eForm },
    mixins: [initData],
    data() {
      return {
        isAdd:false,
        delLoading: false,
        wareHouseCode: ''
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
        this.url = 'api/queryWareHousePage'
        const query = this.query
        const value = query.value
        this.params = { page: this.page, size: this.size }
        if (value) { this.params['name'] = value }
        return true
      },
      add() {
        this.isAdd = true
        initWareHouseCode().then(res => {
            const _this = this.$refs.form
            _this.form = { wareHouseCode: res }
          }
        )
        this.$refs.form.dialog = true
      },
      edit(data) {
        this.isAdd = false
        const _this = this.$refs.form
        _this.form = { id: data.id, name: data.name }
        if (_this.form.dataScope === '自定义') {
          _this.getDepts()
        }
        _this.dialog = true
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
