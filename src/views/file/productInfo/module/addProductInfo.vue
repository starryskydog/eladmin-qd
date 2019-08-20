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
          @click="$router.back(-1)"
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

    <div>
      <el-form ref="form" :inline="true" :model="form" size="large" label-width="100px">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="form.productCode" disabled size="small"/>
        </el-form-item>

        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" size="small"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { initProductCode } from '@/api/productInfo'
export default {
  props: {
  },
  data() {
    return {
      form: {
        productCode: null,
        name: ''
      }
    }
  },
  created() {
    initProductCode().then(res => {
      this.form.productCode = res
    })
  },
  methods: {
    cancelAndGoList() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
