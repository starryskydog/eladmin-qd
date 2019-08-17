<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增联系人' : '编辑联系人'" append-to-body width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="form.name" style="width: 270px;"/>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" style="width: 270px;"/>
      </el-form-item>
      <el-form-item label="座机" prop="telephone">
        <el-input v-model="form.telephone" style="width: 270px;"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" style="width: 270px;"/>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="form.qq" style="width: 270px;"/>
      </el-form-item>
      <el-form-item label="微信" prop="weChat">
        <el-input v-model="form.weChat" style="width: 270px;"/>
      </el-form-item>
      <el-form-item label="首要联系人" prop="primaryContact">
        <el-select v-model="form.primaryContact" style="width: 150px;">
          <el-option
            v-for="(item, index) in contactStatus"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepts } from '@/api/dept'
import { add, edit } from '@/api/measureUnit'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      contactStatus:[
        {
          id:true,
          name:'是'
        },
        {
          id:false,
          name:'否'
        }],
      loading: false, dialog: false,
      form: { name: '',primaryContact:false,phone:'',telephone:'',email:'',qq:'',weChat:'' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      this.$emit('getContactList',this.form);
      this.$notify({
        title: '添加成功',
        type: 'success',
        duration: 2500
      })
      this.loading = false
      this.dialog = false
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '',primaryContact:false,phone:'',telephone:'',email:'',qq:'',weChat:'' }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content
      })
    },
    changeScope() {
      if (this.form.dataScope === '自定义') {
        this.getDepts()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
