<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增客户资料' : '编辑客户资料'" append-to-body width="1000px" :show-close=false>
    <el-form ref="form" :inline="true" :model="form" size="large" label-width="100px">
      <el-form-item label="客户编号" prop="customerCode">
        <el-input v-model="form.customerCode" disabled size="small"/>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="form.customerName" size="small"/>
      </el-form-item>
      <el-form-item label="期初应付款" prop="initialPreMoney" style="display:block;margin-top: 20px">
        <el-input v-model="form.initialPreMoney" size="small" placeholder="请输入"/>
      </el-form-item>
      <Address @setAddress="updateAddress" :propList="form.customerAddress"/>
      <contact @setContacts="updateContact" :contactList="form.customerContact"/>
      <el-form-item prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入备注"
          style="margin: 20px auto;width: 500px"
          :autosize="{ minRows: 4, maxRows: 8}"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { initCustomerCode, add, edit } from '@/api/customerInfo'
import contact from './module/contact'
import Address from './module/address'

export default {
  components: { contact, Address },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    uid: {
      type: Number
    }
  },
  data() {
    return {
      dialog: false,
      categoryList: [],
      form: {
        customerContact: [
          {
            name: '',
            phone: '',
            mobile: '',
            email: '',
            weixin: '',
            qq: '',
            firstTag: ''
          }
        ],
        customerName: '',
        initialPreMoney: null,
        customerCode: null,
        customerAddress: [
          {
            province: '',
            city: '',
            area: '',
            addressDetail: ''
          }
        ],
        supplierCategoryId: null,
        remark: ''
      },
      rules: {
        customerName: [
          { required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    dialog: function(val) {
      if (val && this.isAdd) {
        this.initCode()
      }
    }
  },
  created() {
  },
  methods: {
    cancel() {
      this.dialog = false
    },
    doSubmit() {
      if (this.form.customerContact) {
        const length1 = this.form.customerContact.length
        if (length1 > 0 && !this.form.customerContact[length1 - 1].name) {
          this.form.customerContact.pop()
        }
      }
      if (this.form.customerAddress) {
        const length2 = this.form.customerAddress.length
        if (length2 > 0 && !this.form.customerAddress[length2 - 1].province) {
          this.form.customerAddress.pop()
        }
      }
      if (this.isAdd) {
        add(this.form).then(res => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.resetForm()
          this.dialog = false
          this.$parent.init()
        })
      } else {
        edit(this.form).then(res => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.resetForm()
          this.dialog = false
          this.$parent.init()
        })
      }
    },
    initCode() {
      initCustomerCode().then(res => {
        this.resetForm()
        this.form.customerCode = res
      })
    },
    resetForm() {
      this.form = {
        customerContact: [
          {
            name: '',
            phone: '',
            mobile: '',
            email: '',
            weixin: '',
            qq: '',
            firstTag: '',
          }
        ],
        customerName: '',
        initialPreMoney: null,
        customerAddress: [
          {
            province: '',
            city: '',
            area: '',
            addressDetail: ''
          }
        ],
        customerCategoryId: null,
        remark: ''
      }
    },
    updateContact(data) {
      this.form.customerContact = data
    },
    updateAddress(data) {
      this.form.customerAddress = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
