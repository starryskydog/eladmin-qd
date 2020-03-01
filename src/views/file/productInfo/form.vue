<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增产品资料' : '编辑产品资料'" :show-close="false" append-to-body width="1000px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="large" label-width="100px">
      <span class="sub-title">基础资料</span>
      <el-form-item label="产品类别" prop="productCategoryId">
        <el-select v-model="form.productCategoryId" style="width: 150px;" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in productCategoryList"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="产品系列" prop="productSeriesId">
        <el-select v-model="form.productSeriesId" style="width: 150px;" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in productSeriesList"
            :key="item.productSeriesName + index"
            :label="item.productSeriesName"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="产品编号" prop="productCode">
        <el-input v-model="form.productCode" size="small"/>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
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
      <el-form-item label="单价(元)" prop="unitPrice">
        <el-input v-model="form.unitPrice" size="small"/>
      </el-form-item>

      <span class="sub-title">库存预警</span>
      <ProductInventoryWarning @setProductInventoryWarning="updateProductInventoryWarning" :productInventoryWarningList="form.productInventoryWarning"/>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancelAndGoList">取消</el-button>
      <el-button type="primary" @click="doSubmit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { initProductCode, add, edit } from '@/api/productInfo'
import { queryMeasureUnitList } from '@/api/measureUnit'
import { queryProductCategoryList } from '@/api/productCategory'
import { queryProductSeriesList } from '@/api/productSeries'
import ProductInventoryWarning from './module/productInventoryWarning'

export default {
  components: { ProductInventoryWarning },
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
      productCategoryList: [],
      productSeriesList: [],
      form: {
        productCode: null,
        name: '',
        specifications: '',
        unitPrice: null,
        productCategoryId: null,
        productSeriesId: null,
        measureUnitId: null,
        productInventoryWarning: [
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
        productCategoryId: [
          { required: true, message: '产品类别不能为空!', trigger: 'blur' }
        ],
        productSeriesId: [
          { required: true, message: '产品系列不能为空!', trigger: 'blur' }
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
    initProductCode().then(res => {
      this.form.productCode = res
    })
    this.queryMeasureUnitList()
    this.queryProductCategoryList()
    this.queryProductSeriesList()
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
    // 查询产品类别列表
    queryProductCategoryList() {
      queryProductCategoryList().then(res => {
        this.productCategoryList = res
      })
    },
    // 查询产品系列列表
    queryProductSeriesList() {
      queryProductSeriesList().then(res => {
        this.productSeriesList = res.content
      })
    },
    // 触发子组件城市选择-选择城市的事件
    updateProductInventoryWarning(data) {
      // 改变了父组件的值
      this.form.productInventoryWarning = data
    },
    initCode() {
      initProductCode().then(res => {
        this.resetForm()
        this.form.productCode = res
      })
    },
    resetForm() {
      this.form = {
        productCode: null,
        name: '',
        specifications: '',
        unitPrice: null,
        productCategoryId: null,
        productSeriesId: null,
        measureUnitId: null,
        productInventoryWarning: [
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
      // if (this.form.supplierContact) {
      //   const productInventoryWarningLength = this.form.productInventoryWarning.length
      //   if (productInventoryWarningLength > 0 && !this.form.supplierContact[productInventoryWarningLength - 1].name) {
      //     this.form.productInventoryWarning.pop()
      //   }
      // } else {
      //   this.$notify({
      //     title: '修改成功',
      //     type: 'success',
      //     duration: 2500
      //   })
      //   return false
      // }

      this.$refs['form'].validate((valid) => {
        if (valid) {
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
        }
      })
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
