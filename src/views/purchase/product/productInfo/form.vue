<template>
  <el-dialog :visible.sync="dialog" title="审核耗材采购单" append-to-body width="600px" :show-close=false>
    <el-form ref="form" :model="form" size="large" label-width="100px">
      <el-form-item label="审核状态" prop="auditStatus">
        <el-select v-model="form.auditStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核意见" prop="auditOpinion">
        <el-input v-model="form.auditOpinion" placeholder="审核意见" type="textarea" size="small"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {auditProductPurchaseOrder} from '@/api/purchaseProduct'

  export default {
    props: {
      isAdd: {
        type: Boolean,
        required: true
      },
      uid: {
        type: Number,
      },
      checkData:{
        type: Object,
      }
    },
    data() {
      return {
        dialog: false,
        categoryList: [],
        form: {
          auditOpinion:'',
          auditStatus:''
        },
        options:[
          {
            value:'pass',
            label:'同意'
          },
          {
            value:'reject',
            label:'驳回'
          }
        ]
      }
    },
    created() {

    },
    methods: {
      cancel() {
        this.dialog = false
      },
      doSubmit() {
        const arr=Object.assign(this.form,this.checkData)
        auditProductPurchaseOrder(arr).then(res => {
            this.$notify({
              title: '审核成功',
              type: 'success',
              duration: 2500
            })
          })
        this.loading = false
        this.resetForm()
        this.dialog = false
        this.$parent.init()
      },
      resetForm() {
        this.form = {

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
