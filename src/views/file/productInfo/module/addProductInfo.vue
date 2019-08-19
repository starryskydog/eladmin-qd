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
          @click="cancleAddProductInfo"
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
  </div>
</template>

<script>

export default {
  methods: {
    cancleAddProductInfo() {
      console.log('取消')
    }
  }
}
</script>

<style scoped>

</style>
