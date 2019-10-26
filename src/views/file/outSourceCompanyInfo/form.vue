<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增委外公司资料' : '编辑委外公司资料'" append-to-body width="1000px" :show-close=false>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="large" label-width="100px">
      <el-form-item label="委外公司编号" prop="outSourceCompanyCode">
        <el-input v-model="form.outSourceCompanyCode" size="small"/>
      </el-form-item>
      <el-form-item label="委外公司名称" prop="outSourceCompanyName">
        <el-input v-model="form.outSourceCompanyName" size="small"/>
      </el-form-item>
      <Address @setAddress="updateAddress" :propList="form.outSourceCompanyAddress"/>
      <contact @setContacts="updateContact" :contactList="form.outSourceCompanyContact"/>
      <el-form-item prop="remark">
        <el-input
          :rows="4"
          v-model="form.remark">
          type="textarea"
          style="width: 500px;margin-top: 20px"
          placeholder="备注信息"
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
import { initOutSourceCompanyCode, add, edit } from '@/api/outSourceCompanyInfo'
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
      form: {
        outSourceCompanyContact: [
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
        outSourceCompanyName: '',
        initialPreMoney: null,
        outSourceCompanyCode: null,
        outSourceCompanyAddress: [
          {
            province: '',
            city: '',
            area: '',
            addressDetail: ''
          }
        ],
        remark: ''
      },
      rules: {
        outSourceCompanyName: [
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
      if (this.form.outSourceCompanyContact) {
        const length1 = this.form.outSourceCompanyContact.length
        if (length1 > 0 && !this.form.outSourceCompanyContact[length1 - 1].name) {
          this.form.outSourceCompanyContact.pop()
        }
      }
      if (this.form.outSourceCompanyAddress) {
        const length2 = this.form.outSourceCompanyAddress.length
        if (length2 > 0 && !this.form.outSourceCompanyAddress[length2 - 1].province) {
          this.form.outSourceCompanyAddress.pop()
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
      this.loading = false
      this.resetForm()
      this.dialog = false
      this.$parent.init()
    },
    initCode() {
      initOutSourceCompanyCode().then(res => {
        this.resetForm()
        this.form.outSourceCompanyCode = res
      })
    },
    resetForm() {
      this.form = {
        outSourceCompanyContact: [
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
        outSourceCompanyrName: '',
        initialPreMoney: null,
        outSourceCompanyAddress: [
          {
            province: '',
            city: '',
            area: '',
            addressDetail: ''
          }
        ],
        remark: ''
      }
    },
    updateContact(data) {
      this.form.outSourceCompanyContact = data
    },
    updateAddress(data) {
      this.form.outSourceCompanyAddress = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
