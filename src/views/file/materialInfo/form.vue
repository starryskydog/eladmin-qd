<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增物料资料' : '编辑物料资料'" :show-close="false" append-to-body width="1000px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="large" label-width="100px">
      <span class="sub-title">基础资料</span>
      <el-form-item label="物料类别" prop="materialCategoryId">
        <el-select v-model="form.materialCategoryId" style="width: 150px;" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in materialCategoryList"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="物料编号" prop="materialCode">
        <el-input v-model="form.materialCode" size="small"/>
      </el-form-item>
      <el-form-item label="物料名称" prop="name">
        <el-input v-model="form.name" size="small"/>
      </el-form-item>

      <el-form-item label="规格" prop="specifications">
        <el-input v-model="form.specifications" size="small"/>
      </el-form-item>
      <el-form-item label="计量单位" prop="measureUnitId">
        <el-select v-model="form.measureUnitId" style="width: 150px;" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in measureUnitList"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <span class="sub-title">库存预警</span>
      <MaterialInventoryWarning @setMaterialInventoryWarning="updateMaterialInventoryWarning" :materialInventoryWarningList="form.materialInventoryWarning"/>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancelAndGoList">取消</el-button>
      <el-button type="primary" @click="doSubmit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { initMaterialInfoCode, add, edit } from '@/api/materialInfo'
import { queryMeasureUnitList } from '@/api/measureUnit'
import { queryMaterialCategoryList } from '@/api/materialCategory'
import MaterialInventoryWarning from './module/materialInventoryWarning'

export default {
  components: { MaterialInventoryWarning },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      measureUnitList: [],
      materialCategoryList: [],
      form: {
        materialCode: null,
        name: '',
        specifications: '',
        materialCategoryId: null,
        measureUnitId: null,
        materialInventoryWarning: [
          {
            wareHouseCode: '',
            wareHouseName: '',
            minimumInventory: '',
            highestInventory: ''
          }
        ]
      },
      rules: {
        specifications: [
          { required: true, message: '规格不能为空!', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符!', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '物料不能为空!', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符!', trigger: 'blur' }
        ],
        materialCategoryId: [
          { required: true, message: '物料类别不能为空!', trigger: 'blur' }
        ],
        measureUnitId: [
          { required: true, message: '计量单位不能为空!', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '物料编号不能为空!', trigger: 'blur' }
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
    initMaterialInfoCode().then(res => {
      this.form.materialCode = res
    })
    this.queryMeasureUnitList()
    this.queryMaterialCategoryList()
  },
  methods: {
    cancelAndGoList() {
      this.dialog = false
    },
    // 查询所有计量单位列表
    queryMeasureUnitList() {
      queryMeasureUnitList().then(res => {
        this.measureUnitList = res
      })
    },
    // 查询物料类别列表
    queryMaterialCategoryList() {
      queryMaterialCategoryList().then(res => {
        this.materialCategoryList = res
      })
    },
    // 触发子组件城市选择-选择城市的事件
    updateMaterialInventoryWarning(data) {
      // 改变了父组件的值
      this.form.materialInventoryWarning = data
    },
    initCode() {
      initMaterialInfoCode().then(res => {
        this.resetForm()
        this.form.materialCode = res
      })
    },
    resetForm() {
      this.form = {
        materialCode: null,
        name: '',
        specifications: '',
        materialCategoryId: null,
        measureUnitId: null,
        materialInventoryWarning: [
          {
            wareHouseCode: '',
            wareHouseName: '',
            minimumInventory: '',
            highestInventory: ''
          }
        ]
      }
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            add(this.form).then(res => {
              this.$notify({
                title: '添加成功',
                type: 'success',
                duration: 2500
              })
              this.loading = false
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
        } else {
          return false
        }
      })
    },
    addMaterialInfo() {
      if (this.form.materialContact) {
        const materialInventoryWarningLength = this.form.materialInventoryWarning.length
        if (materialInventoryWarningLength > 0 && !this.form.materialContact[materialInventoryWarningLength - 1].name) {
          this.form.materialInventoryWarning.pop()
        }
      }
      if (this.isAdd) {
        add(this.form).then(res => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
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
          this.loading = false
          this.resetForm()
          this.dialog = false
          this.$parent.init()
        })
      }
    }
  }
}
</script>

<style scoped>
  .sub-title{
    display: block;
    line-height: 30px;
    background-color: #efefef;
    margin: 20px auto;
    padding-left: 10px;
    font-size: 14px;
  }
</style>
