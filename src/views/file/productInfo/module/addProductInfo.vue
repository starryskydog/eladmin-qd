<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 取消 -->
      <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="text"
          icon="el-icon-plus"
          @click="cancelAndGoList"
        >取消</el-button>
      </div>
      <!-- 保存 -->
      <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
        >保存</el-button>
      </div>
    </div>

    <el-row :gutter="5">
      <el-col >
        <el-form ref="form" :inline="true" :model="form" size="large" label-width="100px">
          <el-form-item label="产品类别" prop="productCategoryId">
            <el-select v-model="form.productCategoryId" style="width: 150px;" placeholder="请选择" size="small">
              <el-option
                v-for="(item, index) in productCategoryList"
                :key="item.name + index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="产品编号" prop="productCode">
            <el-input v-model="form.productCode" disabled size="small"/>
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
          <el-form-item label="单价" prop="unitPrice">
            <el-input v-model="form.unitPrice" size="small"/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { initProductCode } from '@/api/productInfo'
import { queryMeasureUnitList } from '@/api/measureUnit'
import { queryProductCategoryList } from '@/api/productCategory'

export default {
  props: {
  },
  data() {
    return {
      measureUnitList: [],
      productCategoryList: [],
      form: {
        productCode: null,
        name: '',
        specifications: '',
        unitPrice: null,
        productCategoryId : null,
        measureUnitId: null
      }
    }
  },
  created() {
    initProductCode().then(res => {
      this.form.productCode = res
    })
    this.queryMeasureUnitList()
    this.queryProductCategoryList()
  },
  methods: {
    cancelAndGoList() {
      this.$router.push({ path: '/file/productInfo' })
    },
    queryMeasureUnitList() {
      queryMeasureUnitList().then(res => {
        console.log(res)
        this.measureUnitList = res
      })
    },
    queryProductCategoryList() {
      queryProductCategoryList().then(res => {
        console.log(res)
        this.productCategoryList = res
      })
    }
  }
}
</script>

<style scoped>

</style>
