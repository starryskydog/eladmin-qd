<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增供应商资料' : '编辑供应商资料'" append-to-body width="1000px"
             :show-close=false>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="large" label-width="100px">
      <el-form-item label="供应商编号" prop="supplierCode">
        <el-input v-model="form.supplierCode" size="small"/>
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="form.supplierName" size="small"/>
      </el-form-item>
      <el-form-item label="类型" prop="supplierCategoryId">
        <el-select v-model="form.supplierCategoryId" style="width: 150px;" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in categoryList"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <Address @setAddress="updateAddress" :propList="form.supplierAddress"></Address>
      <el-form-item label="期初应付款(元)" prop="initialPreMoney" style="display:block;margin-top: 20px">
        <el-input v-model="form.initialPreMoney" size="small" placeholder="请输入"/>
      </el-form-item>
      <contact @setContacts="updateContact" :contactList="form.supplierContact"></contact>
      <el-form-item prop="remark">
        <el-input
          type="textarea"
          :rows="4"
          style="width: 500px;margin-top: 20px"
          placeholder="备注信息"
          v-model="form.remark">
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
  import {del, initCode, add, edit, getSupplierInfoById} from '@/api/supplier'
  import {queryAllCategoryList} from '@/api/supplierCategory'
  import contact from './module/contact'
  import Address from './module/address'

  export default {
    components: {contact, Address},
    props: {
      isAdd: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        dialog: false,
        categoryList: [],
        form: {
          supplierContact: [
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
          supplierName: '',
          initialPreMoney: null,
          supplierCode: null,
          supplierAddress: [
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
          supplierName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          supplierCategoryId: [
            {required: true, message: '请选择供应商类型', trigger: 'change', type: 'number'}
          ],

          supplierCode: [
            {required: true, message: '供应商编号不能为空', trigger: 'change'}
          ]
        }
      }
    },
    watch: {
      dialog: function (val) {
        if (val && this.isAdd) {
          this.initCode()
        }
      }
    },
    created() {
      this.queryAllCategoryList()
    },
    methods: {
      cancel() {
        this.dialog = false
      },
      doSubmit() {
        this.$refs['form'].validate((valid) => {
          console.log(valid)
          if (valid) {
            if (this.form.supplierContact) {
              const length1 = this.form.supplierContact.length
              if (length1 > 0 && !this.form.supplierContact[length1 - 1].name) {
                this.form.supplierContact.pop()
              }
            }
            if (this.form.supplierAddress) {
              const length2 = this.form.supplierAddress.length
              if (length2 > 0 && !this.form.supplierAddress[length2 - 1].province) {
                this.form.supplierAddress.pop()
              }
            }
            if (this.isAdd) {
              add(this.form).then(res => {
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration: 2500
                })
              })
            } else {
              edit(this.form).then(res => {
                this.$notify({
                  title: '修改成功',
                  type: 'success',
                  duration: 2500
                })
              })
            }
            this.loading = false
            this.resetForm()
            this.dialog = false
            this.$parent.init()
          }
        })
      },
      initCode() {
        initCode().then(res => {
          this.resetForm()
          this.form.supplierCode = res
        })
      },
      queryAllCategoryList() {
        queryAllCategoryList().then(res => {
          this.categoryList = res
        })
      },
      resetForm() {
        this.form = {
          supplierContact: [
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
          supplierName: '',
          initialPreMoney: null,
          supplierAddress: [
            {
              province: '',
              city: '',
              area: '',
              addressDetail: ''
            }]
        }
      },
      initCode() {
        initCode().then(res => {
          this.resetForm()
          this.form.supplierCode = res
        })
      },
      queryAllCategoryList() {
        queryAllCategoryList().then(res => {
          this.categoryList = res
        })
      },
      resetForm() {
        this.form = {
          supplierContact: [
            {
              name: "",
              phone: "",
              mobile: "",
              email: "",
              weixin: "",
              qq: "",
              firstTag: "",
            }
          ],
          supplierName: '',
          initialPreMoney: null,
          supplierAddress: [
            {
              province: '',
              city: '',
              area: '',
              addressDetail: ''
            }
          ],
          supplierCategoryId: null,
          remark: ''
        }
      },
      updateContact(data) {
        this.form.supplierContact = data
      },
      updateAddress(data) {
        this.form.supplierAddress = data
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
